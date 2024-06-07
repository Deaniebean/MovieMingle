import React, { HtmlHTMLAttributes, useEffect, useState } from 'react';
import { Movie } from '../types/MovieType';
import { Genre } from '../types/GenreType';
import './ThisOrThat.css';
import genreData from '../genre.json';
import tempMovies from './tempMovies.json';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

// Components
import NavTemp from '../components/NavTemp';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import { Typography } from '@material-tailwind/react';

// Assets
import cardFlipIcon from '../assets/cardFlipIcon.svg';

interface Props {
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

// const ThisOrThat: React.FC<Props> = ({ setMovies }): React.ReactNode => {
const ThisOrThat: React.FC<Props> = ({
  movies,
  setMovies,
}): React.ReactNode => {
  // const movies = tempMovies;

  const navigate = useNavigate();
  const [cookies] = useCookies(['UUID']);
  const userUUID = cookies.UUID;

  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [videoKey, setVideoKey] = useState('');

  function getGenreNames(genreIds: number[]): string[] {
    return genreIds.map((id) => {
      const genre = genreData.genres.find((genre: Genre) => genre.id === id);
      console.log(genre ? genre.name : '');
      return genre ? genre.name : '';
    });
  }

  // Renders genres for indexed movie
  const renderFilmGenres = (index: number): JSX.Element => {
    if (index < 0 || index >= movies.length) {
      return <p>No genres</p>;
    }

    const film = movies[index];
    const genres = getGenreNames(film.genre_ids);

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

  const renderRating = (index: number): string => {
    let rating = movies[index].vote_average
      ? Math.round(movies[index].vote_average! * 10) / 10 + '/10'
      : '-'; // If no rating return empty string
    return rating;
  };

  function openTrailer(key: string) {
    setVideoKey(key);
    setModalOpen(true);
  }

  const chooseMovie = (chosenIndex: number) => {
    // Create a copy of the movies array
    let newMovies = [...movies];

    // Find the index of the unchosen movie in the newMovies array
    const unchosenMovie = movies[chosenIndex === index1 ? index2 : index1];
    const unchosenIndex = newMovies.findIndex(
      (movie) => movie.original_title === unchosenMovie.original_title
    );

    // Remove the unchosen movie from the array
    console.log('Unchosen index:', unchosenIndex);
    newMovies.splice(unchosenIndex, 1);

    // If there's only one movie left, we have a winner
    if (newMovies.length === 1) {
      console.log('Winner:', newMovies[0]);
      navigate('/winner', { state: { movie: newMovies[0] } });
      return;
    }

    // Choose the next two movies in the array for the next round
    //condition to keep chosen movies in the same spot as previous round
    let newIndex1, newIndex2;
    if (chosenIndex === index1) {
      newIndex1 = 0;
      newIndex2 = 1 % newMovies.length;
    } else {
      newIndex1 = 1 % newMovies.length;
      newIndex2 = (newIndex1 + 1) % newMovies.length;
    }

    // Update state
    setIndex1(newIndex1);
    setIndex2(newIndex2);
    setMovies(newMovies);
  };

  async function addToWatchList(index: number) {
    const movie = movies[index];
    const poster_path = movie.poster_path
      ? 'https://image.tmdb.org/t/p/original' + movie.poster_path
      : 'default poster';
    const trailer = movie.videos
      ? 'www.youtube.com/watch?v=' + movie.videos[0].key
      : null;
    const date = new Date(Date.now()).toISOString().slice(0, 10);
    const rating = 0;
    console.log(userUUID);

    const movieData = {
      id: movie.id,
      original_title: movie.original_title,
      original_language: movie.original_language,
      overview: movie.overview,
      genre: getGenreNames(movie.genre_ids),
      release_date: movie.release_date,
      poster_path,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
      trailer,
      date,
      rating,
    };

    const configuration = {
      method: 'post',
      url: 'http://localhost:8082/save/watchlist',
      data: {
        movieData,
        userUUID,
      },
    };

    try {
      const response = await axios(configuration);
      console.log(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log('Error response data:', error.response.data);
          console.log('Error response status:', error.response.status);
          console.log('Error response headers:', error.response.headers);
        } else if (error.request) {
          console.log('Error request:', error.request);
        } else {
          console.log('Error message:', error.message);
        }
        console.log('Error config:', error.config);
      }
    }
  }

  useEffect(() => {
    console.log('Movies:', movies);
  }, [movies]);

  console.log('Movies:', movies);

  return (
    <div className="h-screen flex flex-col">
      {/* Nest NavBar */}
      <NavTemp />
      <div className="flex-1">
        <div className="this">
          {movies[index1] && (
            <div className="grid grid-cols-2 px-4">
              <div className="h-64 w-50 md:h-96 max-h-96">
                <img
                  className="h-full w-full object-contain"
                  src={
                    movies[index1].poster_path
                      ? `https://image.tmdb.org/t/p/original${movies[index1].poster_path}`
                      : 'path/to/default/image.jpg'
                  }
                />
              </div>
              <div className="flex flex-col ps-4">
                <h2 className="text-text text-xl font-bold mb-2">
                  {movies[index1].original_title}
                </h2>
                {/* Display only release year */}
                {/* <div>
                  <p className="text-sm">Release Date</p>
                  <p className="text-2xl font-bold ">{movies[index1].release_date.slice(0, 4)}</p>
                </div> */}

                <div className="flex flex-col h-full justify-between">
                  <div className="flex flex-col gap-3">
                    <div>
                      <p className="mb-1">Genre</p>
                      {renderFilmGenres(index1)}
                    </div>
                    <div>
                      <p className="text-sm">IMDb Rating</p>
                      <p className="text-2xl font-bold ">{renderRating(0)}</p>
                    </div>
                    {/* <img className='h-10' src={cardFlipIcon}></img> */}
                  </div>
                  <div className="flex justify-end">
                    <p className="me-2">More info</p>
                    <ThreeSixtyIcon />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* <br />
        <p className="text-text">{movies[index1].overview}</p> 
        <button onClick={() => addToWatchList(index1)}>
          + Add to watch list
        </button>
        <br />
        <button
          onClick={() =>
            movies[index1].videos && movies[index1].videos[0]
              ? openTrailer(movies[index1].videos[0].key)
              : 'disabled Button style'
          }
        >
          Trailer
        </button> */}

        <div className="flex justify-center">
          {/* make button full available space */}
          <button
            className="border-2 rounded-full text-white bg-primary px-2 py-1"
            onClick={() => chooseMovie(index1)}
          >
            This
          </button>
          <p className="border-2 rounded-full text-white bg-secondary px-2 py-1">
            or
          </p>
          <button
            className="border-2 border-white rounded-full text-secondary bg-white px-2 py-1"
            onClick={() => chooseMovie(index2)}
          >
            That
          </button>
        </div>

        <div className="that">
          {movies[index2] && (
            <div className="grid grid-cols-2 px-4">
              <div className="flex flex-col ps-4 text-right text-primary">
                <h2 className="text-primary text-xl font-bold mb-2">
                  {movies[index2].original_title}
                </h2>
                {/* Display only release year */}
                {/* <div>
               <p className="text-sm">Release Date</p>
               <p className="text-2xl font-bold ">{movies[index2].release_date.slice(0, 4)}</p>
             </div> */}

                <div className="flex flex-col gap-3 ">
                  <div>
                    <p className="mb-1 text-primary">Genre</p>
                    {renderFilmGenres(index2)}
                  </div>
                  <div>
                    <p className="text-sm text-primary">IMDb Rating</p>
                    <p className="text-2xl font-bold text-primary">{renderRating(0)}</p>
                  </div>
                  {/* <img className='h-10' src={cardFlipIcon}></img> */}
                  <div className="flex justify-end">
                    <p className="me-3 text-primary">More info</p>
                    <ThreeSixtyIcon />
                  </div>
                </div>
              </div>
              <div className="h-64 w-50 md:h-96 max-h-96 ">
                <img
                  className="h-full w-full object-contain"
                  src={
                    movies[index2].poster_path
                      ? `https://image.tmdb.org/t/p/original${movies[index2].poster_path}`
                      : 'path/to/default/image.jpg'
                  }
                />
              </div>
            </div>
          )}
        </div>
        {modalOpen && (
          <div className="modal">
            <button className="" onClick={() => setModalOpen(false)}>
              Close
            </button>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${videoKey}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThisOrThat;
