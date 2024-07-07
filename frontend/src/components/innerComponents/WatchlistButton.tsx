// AddRemoveButton.tsx
import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import Cookies from 'universal-cookie';
import { Movie } from '../../types/MovieType';

// Assets
import AddIcon from '@mui/icons-material/Add';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import ClearIcon from '@mui/icons-material/Clear';

interface WatchlistButtonProps {
  initialMode?: 'add' | 'remove';
  movie: Movie;
  getGenreNames: (genreIds: number[]) => string[];
  isPrimary?: boolean;
  fixedWidth?: boolean;
  className?: string;
}

const cookies = new Cookies();

const WatchlistButton: React.FC<WatchlistButtonProps> = ({
  initialMode = 'add',
  movie,
  getGenreNames,
  isPrimary = true,
  fixedWidth = true,
  className,
}) => {
  const [isAddMode, setIsAddMode] = useState<boolean>(initialMode === 'add');
  const userUUID = cookies.get('UUID');

  useEffect(() => {
    // Reset the button state when the movie changes
    setIsAddMode(initialMode === 'add');
  }, [movie, initialMode]); // Ensure initialMode is also considered in the dependency array

  const handleButtonClick = (): void => {
    if (isAddMode) {
      addToWatchList();
    } else {
      removeFromWatchlist();
    }
    setIsAddMode(!isAddMode);
  };

  async function addToWatchList() {
    const poster_path = movie.poster_path
      ? 'https://image.tmdb.org/t/p/original' + movie.poster_path
      : 'default poster';
    const trailer = movie.videos
      ? 'www.youtube.com/watch?v=' + movie.videos[0]?.key
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

  // Switch to async function
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
        console.log(
          'Film erfolgreich von der Watchlist entfernt:',
          result.data
        );
      })
      .catch((error: AxiosError) => {
        console.error(
          'Fehler beim Entfernen des Films von der Watchlist:',
          error
        );
      });
  };

  return (
    <div className={`${fixedWidth ? '' : 'w-full'}`}>
      <button
        onClick={handleButtonClick}
        className={`group relative ${fixedWidth ? 'flex' : 'w-full'} items-center px-4 py-2 border rounded-md transition-all duration-300 ${isPrimary ? 'hover:bg-white hover:text-primary' : 'border-primary hover:bg-primary hover:text-white'} ${className} `}
      >
        {isAddMode ? (
          <div className="flex justify-center">
            <AddIcon className="me-2" />
            <span className="">Watchlist</span>
          </div>
        ) : (
          <>
            <div className="">
              <div className={`${fixedWidth ? 'flex' : 'w-full'} items-center justify-center w-24 md:group-hover:hidden`} >
                <DownloadDoneIcon className="me-2" />
                <span className="">Added</span>
              </div>
              <div className={`${fixedWidth ? 'flex' : 'w-full'} items-center justify-center w-24 hidden md:group-hover:inline-block`}>
                <ClearIcon className="me-2" fontSize="small" />
                <span className="">Remove</span>
              </div>
            </div>
          </>
        )}
      </button>
    </div>
  );
};

export default WatchlistButton;
