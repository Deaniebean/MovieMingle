import React from 'react';
import { Link } from 'react-router-dom';
import './MovieTemplate.css';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

interface MovieProps {
  movie: {
    _id: string;
    original_title: string;
    poster_path: string;
    release_date: string;
  };
}

const MovieTemplate: React.FC<MovieProps> = ({ movie }) => {
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
      <button className="buttonTrailer">
        <PlayArrowRoundedIcon />
        Trailer
      </button>
      <Link to={`/movie/${movie._id}`} className="buttonDetails">
        More details
      </Link>
    </div>
  );
};

export default MovieTemplate;


