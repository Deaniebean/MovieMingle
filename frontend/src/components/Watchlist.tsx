import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
import hamburgerMenuIcon from "../assets/solar_hamburger-menu-linear.png";
import './Watchlist.css';
import MovieTemplate from './MovieTemplate.tsx';

interface LogoProps {
  src: string;
  alt: string;
}

interface Movie {
  _id: string;
  original_title: string;
  poster_path: string;
  release_date: string;
  trailer?: string;
}

const cookies = new Cookies();

const Logo: React.FC<LogoProps> = ({ src, alt }) => (
  <img loading="lazy" src={src} alt={alt} />
);

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

  const navigateToWatchlist = () => {
    // Add navigation logic to watchlist
  };

  const navigateToHistory = () => {
    window.location.href = "/history";
  };

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="header-container">
        <div className="burger-menu">
          <img src={hamburgerMenuIcon} alt="Hamburger Menu" />
        </div>
        <h1 className="logo">MovieMingle</h1>
        <div className="app-logo">
          <Logo src="your-app-logo-src" alt="App Logo" />
        </div>
      </header>

      <div className="section">
        <div className="spacer"></div>
        <div className="watchlist-text" onClick={navigateToWatchlist}>
          Your watchlist
        </div>
        <div className="separator"></div>
        <div className="history-text" onClick={navigateToHistory}>
          Your history
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
            <MovieTemplate key={movie._id} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default Watchlist;

