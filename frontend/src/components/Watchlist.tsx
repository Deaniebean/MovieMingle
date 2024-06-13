import React from "react";
import hamburgerMenuIcon from "../assets/solar_hamburger-menu-linear.png";
import './Watchlist.css';
import MovieTemplate from './MovieTemplate.tsx';

interface LogoProps {
  src: string;
  alt: string;
}

const Logo: React.FC<LogoProps> = ({ src, alt }) => (
  <img loading="lazy" src={src} alt={alt} />
);

const Watchlist: React.FC = () => {
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
        <MovieTemplate />
        <MovieTemplate />
        <MovieTemplate />
        <MovieTemplate />
        <MovieTemplate />
        <MovieTemplate />
      </div>
      
    </div>
  );
};

export default Watchlist;