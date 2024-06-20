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
}

const cookies = new Cookies();

const Watchlist: React.FC = () => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const userUUID = cookies.get('UUID');

  useEffect(() => {
    if (!userUUID) {
      console.error('User UUID not found in cookies');
      return;
    }

    axios
      .get(`http://localhost:8082/get/watchlist/${userUUID}`)
      .then((response) => {
        setWatchlist(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching watchlist:', error);
        setLoading(false);
      });
  }, [userUUID]);

  return (
    <div className="landing-page">

      <div className="section">
        <div className="spacer"></div>
        <div className="watchlist-text">
          Your watchlist
        </div>
      </div>

      <div className="searchbar">
        <input type="text" className="search-input" placeholder="Search" />
      </div>

      <div className="movie-container">
        {loading ? (
          <p>Loading...</p>
        ) : watchlist.length === 0 ? (
          <p>No movies in your watchlist.</p>
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
