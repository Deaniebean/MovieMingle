import React from 'react';
import { Link } from 'react-router-dom';
import './MovieTemplate.css';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import IconActive from "../assets/DocumentaryActive.png";
import IconNotActive from "../assets/DocumentaryNotActive.png";

interface MovieProps {
  movie: {
    _id: string;
    original_title: string;
    poster_path: string;
    release_date: string;
    trailer?: string;
    rating?: number; // Optional rating
  };
}

const MovieTemplate: React.FC<MovieProps> = ({ movie }) => {
  const renderRating = () => {
    if (movie.rating === undefined || movie.rating === null || movie.rating === 0) {
      return <p className="no-rating">You did not rate the film yet.</p>;
    }

    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <img
          key={i}
          src={i <= movie.rating ? IconActive : IconNotActive}
          alt={`Star ${i}`}
          className="rating-icon"
        />
      );
    }
    return <div className="rating-icons">{stars}</div>;
  };

  return (
    <div className="movie">
      <h1 className="TitleOfMovie">{movie.original_title}</h1>
      <img
        loading="lazy"
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        className="moviePoster"
        alt="Movie Poster"
      />
      <div className="rating-section">
        <p className="rating-label">Your rating:</p>
        {renderRating()}
      </div>
      {movie.trailer && (
        <button className="buttonTrailer" onClick={() => window.open(movie.trailer, '_blank')}>
          <PlayArrowRoundedIcon />
          Trailer
        </button>
      )}
      <Link to={`/movie/${movie._id}`} className="buttonDetails">
        More details
      </Link>
    </div>
  );
};

export default MovieTemplate;
