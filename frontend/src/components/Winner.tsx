import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Movie } from '../types/MovieType';
import { Genre } from '../types/GenreType';
import Cookies from 'universal-cookie';

import { useNavigate } from 'react-router-dom';
import genreData from '../genre.json';
import axios from 'axios';

import './Winner.css';
import NoImage from '../assets/No-Image-Placeholder.svg';
import Confetti from './innerComponents/Confetti';
import WatchlistButton from './innerComponents/WatchlistButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MovieImage from './innerComponents/MovieImage';

const cookies = new Cookies();

const Winner: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movie: Movie = location.state?.movie;
  // const [cookies] = useCookies(['UUID']);
  // const userUUID = cookies.UUID;
  const userUUID = cookies.get('UUID');

  const [modalOpen, setModalOpen] = useState(false);
  const defaultSrc = NoImage;
  const imageSrc = `https://image.tmdb.org/t/p/original${movie.poster_path}`;

  function getGenreNames(genreIds: number[]): string[] {
    return genreIds.map((id) => {
      const genre = genreData.genres.find((genre: Genre) => genre.id === id);
      console.log(genre ? genre.name : '');
      return genre ? genre.name : '';
    });
  }
  const getYouTubeEmbedUrl = (key: string) => {
    return `https://www.youtube.com/embed/${key}`;
  };

  const openTrailer = () => {
    if (movie.videos && movie.videos[0]) {
      setModalOpen(true);
    } else {
      console.error('No trailer available');
    }
  };

  async function addToWatchList() {
    // const movie = movies[index];
    const poster_path = movie.poster_path
      ? 'https://image.tmdb.org/t/p/original' + movie.poster_path
      : 'default poster';
    const trailer =
      movie.videos && movie.videos[0]
        ? 'www.youtube.com/watch?v=' + movie.videos[0]?.key
        : null;
    const date = new Date(Date.now()).toISOString().slice(0, 10);
    const rating = 0;

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

  return (
    <div>
      <Confetti />
      <div className="px-14 mt-6 grid justify-items-center md:container mx-auto">
        <p className="mb-1 md:text-xl">The winner is...</p>
        <p className="text-3xl md:text-6xl font-bold mb-4 text-center">
          {movie.original_title}
        </p>

        <div className="md:flex md:mt-10 md:w-128">
          <MovieImage
            size="lg"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                : undefined
            }
            className={'ms-auto md:ms-0'}
          />
          <div className="pt-4 md:ps-10">
            <p className="hidden md:block md:text-lg">{movie.overview}</p>
            <div className="grid gap-3 md:gap-6 mt-3 justify-items-center md:justify-items-start">
              <div className="flex gap-3 justify-items-center mb-8">
                {movie.videos && movie.videos[0] && (
                  <>
                    <div className="">
                      <button
                        className="bg-white text-primary flex items-center px-4 py-2 border rounded-md"
                        type="submit"
                        onClick={openTrailer}
                      >
                        {' '}
                        <PlayArrowIcon className="me-2" />
                        Trailer
                      </button>
                    </div>
                    {modalOpen && (
                      <div className="modal">
                        <div className="modal-content">
                          <button
                            className=""
                            onClick={() => setModalOpen(false)}
                          >
                            Close Trailer
                          </button>
                          <iframe
                            width="560"
                            height="315"
                            src={getYouTubeEmbedUrl(movie.videos[0]?.key)}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    )}
                  </>
                )}
                <WatchlistButton
                  movie={movie}
                  getGenreNames={getGenreNames}
                  isPrimary={true}
                  className="text-white"
                />
              </div>

              <div>
                <button
                  className="bg-primary text-white flex items-center px-4 py-2 border rounded-md"
                  onClick={() => navigate('/select')}
                >
                  Start again!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Winner;
