import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Movie } from '../types/MovieType';
import { Genre } from '../types/GenreType';

import { useNavigate } from 'react-router-dom';
import genreData from '../genre.json';

import './Winner.css';
import Confetti from './innerComponents/Confetti';
import WatchlistButton from './innerComponents/WatchlistButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MovieImage from './innerComponents/MovieImage';
import Genres from './innerComponents/GenreList';
import Rating from './innerComponents/Rating';


const Winner: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movie: Movie = location.state?.movie;

  const [modalOpen, setModalOpen] = useState(false);

  function getGenreNames(genreIds: number[]): string[] {
    return genreIds.map((id) => {
      const genre = genreData.genres.find((genre: Genre) => genre.id === id);
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
          <div className="pt-4 md:ps-10 h-full">
            <div className='mb-3 md:min-h-60'>
              <div className="md:flex md:gap-5 mb-3 hidden md:inline">
                <Genres genreIds={movie.genre_ids} isPrimary={true} />
                <Rating movie={movie} isPrimary={true} />
              </div>
              <p className="hidden md:block md:text-lg">{movie.overview}</p>
            </div>

            {/* Buttons */}
            <div className="grid gap-3 mt-3 justify-items-center md:justify-items-start">
              <div className="flex flex-col md:flex-row gap-3 justify-items-center w-full">
                {movie.videos && movie.videos[0] && (
                  <>
                    <div className="w-full ">
                      <button
                        className="bg-white text-primary hover:bg-primary hover:text-white md:px-4 py-2 border rounded-md w-full transition-all duration-300"
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
                  className="text-white w-full"
                  fixedWidth={false}
                />
              </div>

              <div className="w-full">
                <button
                  className="bg-primary text-white hover:bg-white  items-center w-full py-2 border rounded-md transition-all duration-300"
                  onClick={() => navigate('/select')}
                >
                  <p className="hover:text-primary transition-all duration-300">Start again!</p>
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
