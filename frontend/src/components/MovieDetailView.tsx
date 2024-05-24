import React from 'react';
//import { Movie } from '../types/MovieType';
import StarRating from './StarRating';
import axios, { AxiosResponse, AxiosError } from 'axios';
import genreData from '../genre.json';
import { Genre } from '../types/GenreType';
import { Link } from 'react-router-dom';


// Assets
import hamburgerMenuIcon from '../assets/solar_hamburger-menu-linear.png';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

// Styles
import '../styles/globals.css';
import './MovieDetailView.css';

const data = [
  {
    "adult": false,
    "backdrop_path": null,
    "genre_ids": [16],
    "id": 424168,
    "original_language": "en",
    "original_title": "INNERVIEWS",
    "overview": "An animated insight into the world views of Allen Ginsberg, Charles Bukowski, Nina Simone, Leonard Cohen and David Lynch.",
    "popularity": 0.6,
    "poster_path": "/zyIAWhLpMgTUFjIe1LRjFjPMDbl.jpg",
    "release_date": "2015-07-06",
    "title": "INNERVIEWS",
    "video": false,
    "vote_average": 0,
    "vote_count": 0,
    "videos": []
  },
];

interface LogoProps {
  src: string;
  alt: string;
}

const Logo: React.FC<LogoProps> = ({ src, alt }) => (
  <img loading="lazy" src={src} alt={alt} />
);

interface MovieDetailViewProps {
  //movie: Movie;
  setShowNavbar: (value: boolean) => void;
}

const MovieDetailView: React.FC<MovieDetailViewProps> = ({ setShowNavbar }) => {
  React.useEffect(() => {
    setShowNavbar(true);
  }, []);

  const renderAverageRating = () => {
    const ratingData = data[0];
    if (!ratingData || !ratingData.vote_average) {
      return '-';
    }

    const averageRating = Math.round(ratingData.vote_average * 10) / 10;
    const voteCount = ratingData.vote_count;

    return (
      <span>
        {averageRating}/10 <StarRoundedIcon /> ({voteCount} votes)
      </span>
    );
  };

  function getGenreNames(genreIds: number[]): string[] {
    return genreIds.map((id) => {
      const genre = genreData.genres.find((genre: Genre) => genre.id === id);
      return genre ? genre.name : '';
    });
  }

  // Renders genres for selected movie
  const renderFilmGenres = (index: number): JSX.Element => {
    const genres = getGenreNames(data[0].genre_ids);

    // max no. of genres displayed? 2-3?
    return (
      <div
        className={`flex flex-wrap gap-1 ${index === 0 ? '' : 'justify-end '}`}
      >
        {genres.map((genre, i) => (
          <span
            className={`border rounded-md px-3 py-1 text-xs ${
              index === 0 ? 'border-white' : 'border-primary'
            }`}
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

  // Send the rating to the backend
  const submitRating = (rating: number) => {
    const requestData = {
      movieId: data[0].id,
      rating: rating,
    };

    const configuration = {
      method: 'post',
      url: 'http://localhost:8082/rateMovie', // TO-DO: URL anpassen, an die die Bewertung gesendet werden soll
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

  return (
    <div className="mx-auto px-4 pb-8 movie-detail-wrapper">
      <header className="movie-detail-header">
        <div className="movie-detail-burger-menu">
          <img src={hamburgerMenuIcon} alt="Hamburger Menu" />
        </div>
        <h1 className="movie-detail-title">MovieMingle</h1>
        <div className="app-logo">
          <Logo src="your-app-logo-src" alt="App Logo" />
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 pt-20">
        <div className="flex justify-center items-start">
          <img
            // src={data[0].poster_path}
            src={
              data[0].poster_path
                ? `https://image.tmdb.org/t/p/original${data[0].poster_path}`
                : 'path/to/default/image.jpg'
            }
            alt={data[0].original_title}
            className="w-4/5 h-auto rounded-lg  movie-img"
          />
        </div>
        <div>
          <h2 className="movie-title">{data[0].original_title}</h2>
          <p className="descriptions">
            {' '}
            Genre
            <span className="movie-detail">{renderFilmGenres(0)}</span>
          </p>
          <p className="descriptions">
            Release Date <br />
            <span className="movie-detail">
              {formatDate(data[0].release_date)}
            </span>
          </p>
          <p className="descriptions">
            Rating <br />
            <span className="movie-detail">{renderAverageRating()}</span>
          </p>
          <p className="descriptions">
            Original Language <br />
            <span className="movie-detail">{data[0].original_language}</span>
          </p>
          <p className="movie-title mt-8 ml-4">
            Overview <br />
            <span className="overview">{data[0].overview}</span>
          </p>
          <button className="trailer-button" type="submit">
            <PlayArrowRoundedIcon />
            Trailer
          </button>

          <div className="movie-title mt-8 ml-4">
            {' '}
            Your Rating
            <div>
              <StarRating maxStars={5} onSubmitRating={submitRating} />
            </div>
          </div>
          <button className="rating-button" type="submit">
            <CloseRoundedIcon />
            Remove from watchlist
          </button>
          <br /><br />
          <Link to="/home" className="back-button">
            <span><ArrowBackRoundedIcon /> Back to Watchlist</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailView;
