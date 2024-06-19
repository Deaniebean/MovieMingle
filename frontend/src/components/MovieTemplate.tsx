import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MovieTemplate.css';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import IconActive from "../assets/DocumentaryActive.png";
import IconNotActive from "../assets/DocumentaryNotActive.png";
import NoImage from '../assets/No-Image-Placeholder.svg';


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
  if (!movie) { 
    return null; 
  }

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const defaultSrc = NoImage;
  const imageSrc = `https://image.tmdb.org/t/p/original${movie.poster_path}`;


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
        src={imageSrc || defaultSrc}
        className="moviePoster"
        alt="Movie Poster"
      />
      <div className="rating-section">
        <p className="rating-label">Your rating:</p>
        {renderRating()}
      </div>
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
