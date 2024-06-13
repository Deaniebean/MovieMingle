import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MovieTemplate.css';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface MovieProps {
  movie: {
    _id: string;
    original_title: string;
    poster_path: string;
    release_date: string;
    trailer?: string; // Optional trailer URL
  };
}

const MovieTemplate: React.FC<MovieProps> = ({ movie }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openTrailer = () => {
    if (movie.trailer) {
      setModalOpen(true);
    } else {
      console.error('No trailer URL available');
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1];
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      return `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`;
    }
    return `https://www.youtube.com/embed/${videoId}`;
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
      <button className="buttonTrailer" onClick={openTrailer}>
        <PlayArrowRoundedIcon />
        Trailer
      </button>
      <Link to={`/movie/${movie._id}`} className="buttonDetails">
        More details
      </Link>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              <CloseRoundedIcon />
            </button>
            <iframe
              width="560"
              height="315"
              src={getYouTubeEmbedUrl(movie.trailer || '')}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieTemplate;



