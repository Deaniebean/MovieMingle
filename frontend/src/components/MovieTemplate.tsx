import React from 'react';
import './MovieTemplate.css';

interface MovieProps {
  movie: {
    _id: string;
    original_title: string;
    poster_path: string;
    release_date: string;
    trailer?: string;
  };
}

const MovieTemplate: React.FC<MovieProps> = ({ movie }) => {
  const handleTrailerClick = () => {
    if (movie.trailer) {
      window.open(movie.trailer, '_blank');
    } else {
      console.error('Trailer URL not available');
    }
  };

  const handleDetailsClick = () => {
    window.location.href = `/movie/${movie._id}`;
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
      <p className="dateAdded">Added on: {new Date(movie.release_date).toLocaleDateString()}</p>
      <button className="buttonTrailer" onClick={handleTrailerClick}>
        Watch trailer now
      </button>
      <button className="buttonDetails" onClick={handleDetailsClick}>
        More details
      </button>
    </div>
  );
};

export default MovieTemplate;

