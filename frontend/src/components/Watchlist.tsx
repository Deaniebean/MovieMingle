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

  const fetchWatchlist = (query: string = '') => {
    setLoading(true);
    const endpoint = query.trim() !== '' ? `api/search/watchlist` : `api/get/watchlist/${userUUID}`;
    
    axios
      .get(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
        params: {
          query,
          userUUID
        }
      })
      .then((response) => {
        console.log("Watchlist API response:", response.data);
        const unsortedWatchlist = response.data;
        
        // Check if the response is an array before calling reverse
        if (Array.isArray(unsortedWatchlist)) {
          setWatchlist(unsortedWatchlist.reverse());
        } else {
          console.error("Expected array but got:", typeof unsortedWatchlist, unsortedWatchlist);
          setWatchlist([]); // Set empty array as fallback
        }
        
        setLoading(false);
        setSearchError(Array.isArray(unsortedWatchlist) && unsortedWatchlist.length === 0 && query.trim() !== '');
      })
      .catch((error) => {
        console.error('Error fetching watchlist:', error);
        setLoading(false);
      });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchWatchlist(query);
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
            //console.log(movie),
            <MovieTemplate key={String(movie._id)} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default Watchlist;

