import React, { useEffect, useState } from 'react';
import StarRating from './StarRating';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { Link, useParams } from 'react-router-dom';

// Assets
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import HourglassTopRoundedIcon from '@mui/icons-material/HourglassTopRounded';
import HourglassBottomRoundedIcon from '@mui/icons-material/HourglassBottomRounded';

// Styles
import '../styles/globals.css';
import './MovieDetailView.css';


interface MovieDetailViewProps {
}

const MovieDetailView: React.FC<MovieDetailViewProps> = ({ }) => {
  const { id } = useParams<{ id: string }>(); // Extracting movieID from route params
  const [movie, setMovie] = useState<any>(null);
  const [loadingIcon, setLoadingIcon] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {


    // Fetching movie data based on the ID
    const fetchMovie = async () => {
      try {
        const response: AxiosResponse = await axios.get(`http://localhost:8082/movie/${id}?_=${Date.now()}`);
        setMovie(response.data);
        console.log('Gesendete Anfrage:', `http://localhost:8082/movie/${id}`);
        console.log('Empfangene Antwort:', response.data);
      } catch (error: any) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    // Toggle loading icon every 500ms
    const interval = setInterval(() => {
      setLoadingIcon((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  if (!movie) {
    return (
      <div className="loading-animation">
        {loadingIcon ? (
          <HourglassTopRoundedIcon />
        ) : (
          <HourglassBottomRoundedIcon />
        )}{' '}
        ... Loading
      </div>
    );
  }

  const renderAverageRating = () => {
    if (!movie.vote_average) {
      return '-';
    }

    const averageRating = Math.round(movie.vote_average * 10) / 10;
    const voteCount = movie.vote_count;

    return (
      <span>
        {averageRating}/10 <StarRoundedIcon /> ({voteCount} votes)
      </span>
    );
  };

  // Renders genres for selected movie
  const renderFilmGenres = (index: number): JSX.Element => {
    if (!movie || !movie.genre) {
      return (
        <span>
          <br />-
        </span>
      );
    }

    const genres = movie.genre;

    return (
      <div
        className={`flex flex-wrap gap-1 ${index === 0 ? '' : 'justify-end '}`}
      >
        {genres.map((genre: string, i: number) => (
          <span
            className={`border rounded-md px-3 py-1 text-xs ${index === 0 ? 'border-white' : 'border-primary'}`}
            key={i}
          >
            {genre}
          </span>
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const openTrailer = () => {
    if (movie.trailer) {
      setModalOpen(true);
    } else {
      console.error('No trailer URL available');
    }
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1];
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      return `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`;
    }
    return `https://www.youtube.com/embed/${videoId}`;
  };

  // Send the rating to the backend
  const submitRating = (rating: number) => {
    const requestData = {
      movieId: movie.id,
      rating: rating,
    };

    const configuration = {
      method: 'put',
      url: 'http://localhost:8082/update/movie-rating',
      data: requestData,
    };

    axios(configuration)
      .then((result: AxiosResponse) => {
        console.log('Bewertung erfolgreich gesendet:', result.data);
      })
      .catch((error: AxiosError) => {
        console.error('Fehler beim Senden der Bewertung:', error);
      });
  };

  // Remove movie from watchlist
  const removeFromWatchlist = () => {
    const requestData = {
      movieId: movie.id,
    };

    const configuration = {
      method: 'delete',
      url: 'http://localhost:8082/delete/movie',
      data: requestData,
    };

    axios(configuration)
      .then((result: AxiosResponse) => {
        console.log('Film erfolgreich von der Watchlist entfernt:', result.data);
      })
      .catch((error: AxiosError) => {
        console.error('Fehler beim Entfernen des Films von der Watchlist:', error);
      });
  };

  return (
    <div className="mx-auto px-4 pb-8 movie-detail-wrapper">
      <div className="grid grid-cols-1 md:grid-cols-2 pt-20">
        <div className="flex justify-center items-start">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                : 'path/to/default/image.jpg'
            }
            alt={movie.original_title}
            className="h-auto rounded-lg  movie-detail-img"
          />
        </div>
        <div>
          <h2 className="movie-detail-title">{movie.original_title}</h2>
          <p className="movie-detail-descriptions">
            {' '}
            Genre
            <span className="movie-detail">{renderFilmGenres(0)}</span>
          </p>
          <p className="movie-detail-descriptions">
            Release Date <br />
            <span className="movie-detail">
              {formatDate(movie.release_date)}
            </span>
          </p>
          <p className="movie-detail-descriptions">
            Rating <br />
            <span className="movie-detail">{renderAverageRating()}</span>
          </p>
          <p className="movie-detail-descriptions">
            Original Language <br />
            <span className="movie-detail">{movie.original_language}</span>
          </p>
          <p className="movie-detail-title mt-8 ml-4">
            Overview <br />
            <span className="movie-detail-overview">{movie.overview}</span>
          </p>
          <button
            className="movie-detail-trailer-button"
            type="submit"
            onClick={openTrailer}
          >
            <PlayArrowRoundedIcon />
            Trailer
          </button>
          {modalOpen && (
            <div className="modal">
              <div className="modal-content">
                <button
                  className="close-button"
                  onClick={() => setModalOpen(false)}
                >
                  <CloseRoundedIcon />
                </button>
                <iframe
                  width="560"
                  height="315"
                  src={getYouTubeEmbedUrl(movie.trailer)}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
          <div className="movie-detail-title mt-8 ml-4">
            {' '}
            Your Rating
            <div>
              <StarRating maxStars={5} onSubmitRating={submitRating} />
            </div>
          </div>
          <button
            className="movie-detail-remove-button"
            type="submit"
            onClick={removeFromWatchlist}
          >
            <CloseRoundedIcon />
            Remove from watchlist
          </button>
          <br />
          <br />
          <Link to="/watchlist" className="movie-detail-back-button">
            <span>
              <ArrowBackRoundedIcon /> Back to Watchlist
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailView;
