import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
import './Watchlist.css';
import MovieTemplate from './MovieTemplate';

interface Movie {
  _id: string;
  original_title: string;
  poster_path: string;
  release_date: string;
  rating?: number;
  date: string;
}

const cookies = new Cookies();

const Watchlist: React.FC = () => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState(false);
  const userUUID = cookies.get('UUID');

  useEffect(() => {
    if (!userUUID) {
      console.error('User UUID not found in cookies');
      return;
    }

    fetchWatchlist();
  }, [userUUID]);

  const fetchWatchlist = (query = '') => {
    setLoading(true);
    axios
      .get(`http://localhost:8082/get/watchlist/${userUUID}`)
      .then((response) => {
        console.log("Unsorted watchlist:", response.data);
        const unsortedWatchlist = response.data;
        setWatchlist(unsortedWatchlist.reverse());
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching watchlist:', error);
        setLoading(false);
      });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      fetchWatchlist();
      setSearchError(false); 
    } else {
      setLoading(true);
      axios
        .get(`http://localhost:8082/search/watchlist`, {
          params: {
            query,
            userUUID
          }
        })
        .then((response) => {
          console.log("Unsorted watchlist:", response.data);
          const unsortedWatchlist = response.data;
          setWatchlist(unsortedWatchlist.reverse());
          setLoading(false);
          setSearchError(unsortedWatchlist.length === 0);
        })
        .catch((error) => {
          console.error('Error searching watchlist:', error);
          setLoading(false);
        });
    }
  };

  return (
    <div className="landing-page">
      <div className="section">
        <div className="spacer"></div>
        <div className="watchlist-text">
          Your watchlist
        </div>
      </div>

      <div className="searchbar">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="movie-container">
        {loading ? (
          <p>Loading...</p>
        ) : watchlist.length === 0 ? (
          searchError ? (
            <p>No movies found matching your search.</p>
          ) : (
            <p>No movies in your watchlist.</p>
          )
        ) : (
          watchlist.map((movie) => (
            movie && <MovieTemplate key={movie._id} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default Watchlist;
