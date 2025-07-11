import React, { useState, useEffect } from 'react';

// Components
import FlippableCard from './FlippableCard';
import MovieImage from './MovieImage';
import WatchlistButton from './WatchlistButton';
import Genres from './GenreList';
import Rating from './Rating';

// Assets
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import genreData from '../../genre.json';
import { Genre } from '../../types/GenreType';
import { Movie } from '../../types/MovieType';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface MovieInfoCardProps {
  index: number;
  movies: Movie[];
  hasTrailer: boolean;
  isPrimary: boolean;
  className?: string;
}

const MovieInfoCard: React.FC<MovieInfoCardProps> = ({
  index,
  movies,
  hasTrailer,
  isPrimary,
  className = '',
}) => {
  if (!movies[index]) {
    return null;
  }

  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [videoKey, setVideoKey] = useState('');
  

  useEffect(() => {
    setIsCardFlipped(false);
  }, [movies.length]); 

  // Function to handle card flip directly in the parent component
  const handleCardFlip = () => {
    setIsCardFlipped(!isCardFlipped);
  };

  function getGenreNames(genreIds: number[]): string[] {
    return genreIds.map((id) => {
      const genre = genreData.genres.find((genre: Genre) => genre.id === id);
      return genre ? genre.name : '';
    });
  }

  const movie = movies[index];

  function openTrailer(key: string) {
    setVideoKey(key);
    setModalOpen(true);
  }

  return (
    <div
      className={`${isPrimary ? 'bg-primary text-white' : 'bg-white'} thisOrthat ${className}  ps-3`}
    >
      <div>
        {movie && (
          <FlippableCard
            isFlipped={isCardFlipped}
            onClick={handleCardFlip}
            className="px-3"
          >
            {/* Front card */}
            <div className="grid grid-cols-2 md:flex md:w-128">
              <MovieImage
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                    : undefined
                }
                className={`${isPrimary ? 'ms-auto md:ms-0' : 'order-last '} `}
              />
              <div
                className={`${isPrimary ? 'flex flex-col ps-6' : 'flex flex-col text-right md:text-left text-primary pe-6'} text-left`}
              >
                <h2
                  className={`${isPrimary ? 'text-text' : 'text-primary'} text-xl md:text-3xl pb-3 font-bold mb-2 line-clamp-2 md:line-clamp-none`}
                >
                  {movie.original_title}
                </h2>
                <div className="flex flex-col h-full justify-between">
                  <div className="flex flex-col gap-3">
                    <div className="md:flex md:gap-5">
                      <Genres
                        genreIds={movie.genre_ids}
                        isPrimary={isPrimary}
                      />
                      <Rating movie={movie} isPrimary={isPrimary} />
                    </div>
                    <p
                      className={`${isPrimary ? 'text-white ' : 'text-primary'} text-sm max-h-40 overflow-auto hidden md:inline`}
                    >
                      {movie.overview}
                    </p>
                  </div>

                  <div className="flex justify-between hidden md:inline">
                    <div className="flex gap-3">
                      <button
                        className={`${hasTrailer ? '' : 'hidden'} ${isPrimary ? 'bg-white text-primary hover:bg-primary hover:text-white' : 'bg-primary text-white hover:bg-white hover:text-primary hover:border hover:border-primary'} flex items-center px-4 py-2 border rounded-md transition-all duration-300`}
                        onClick={() =>
                          hasTrailer
                            ? openTrailer(movie.videos[0].key)
                            : console.log('no trailer')
                        }
                      >
                        <PlayArrowIcon className="me-2" />
                        Trailer
                      </button>
                      <WatchlistButton
                        initialMode="add"
                        movie={movie}
                        getGenreNames={getGenreNames}
                        isPrimary={isPrimary}
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleCardFlip}
                    className={`${isPrimary ? 'me-2 justify-end' : 'ms-3 justify-start'} flex  md:hidden`}
                  >
                    <p
                      className={`${isPrimary ? 'text-white' : 'text-primary'} `}
                    >
                      Description <ThreeSixtyIcon />
                    </p>
                  </button>
                </div>
              </div>
            </div>

            {/* Back card */}
            <div className="h-64 grid content-between">
              <p
                className={`${isPrimary ? 'text-white ' : 'text-primary'} overflow-scroll md:overflow-visible`}
              >
                {movie.overview}
              </p>
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <button
                    className={`${hasTrailer ? '' : 'hidden'} ${isPrimary ? 'bg-white text-primary' : 'bg-primary text-white'} flex items-center px-4 py-2 border rounded-md `}
                    onClick={() =>
                      hasTrailer
                        ? openTrailer(movie.videos[0].key)
                        : console.log('no trailer')
                    }
                  >
                    <PlayArrowIcon className="me-2" />
                    Trailer
                  </button>
                  <WatchlistButton
                    initialMode="add"
                    movie={movie}
                    getGenreNames={getGenreNames}
                    isPrimary={isPrimary}
                    className=""
                  />
                </div>

                <button
                  onClick={handleCardFlip}
                  className={`${isPrimary ? 'justify-end' : 'order-first'} flex`}
                >
                  <p
                    className={`${isPrimary ? 'me-2 text-white ' : 'me-3 text-primary'} mt-3`}
                  >
                    Back <ThreeSixtyIcon />
                  </p>
                </button>
              </div>
            </div>
          </FlippableCard>
        )}
      </div>

      {modalOpen && (
        <div className="modal ">
          <div className="modal-content">
            <button
              className="close-button"
              onClick={() => setModalOpen(false)}
            >
              <HighlightOffIcon fontSize="large" className="md:text-white" />
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
        </div>
      )}
    </div>
  );
};

export default MovieInfoCard;
