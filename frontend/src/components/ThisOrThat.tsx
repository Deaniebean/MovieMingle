import React, { useEffect, useState } from 'react';
import { Movie } from '../types/MovieType';
import './ThisOrThat.css';
import genreData from '../genre.json';
// import tempMovies from './tempMovies.json';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

// Components
import NavTemp from './innerComponents/NavTemp';

interface Props {
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const ThisOrThat: React.FC<Props> = ({ movies }): React.ReactNode => {
  useEffect(() => {
    console.log('Movies:', movies);
  }, [movies]);

  console.log('Movies:', movies);

  return (
    <div>
      <div className="this">
        {movies[0] && (
          <div>
            <h2>{movies[0].original_title}</h2>
            <p>{movies[0].overview}</p>
            <button>This</button>
          </div>
        )}
      </div>
      <div className="that">
        {movies[1] && (
          <div>
            <h2>{movies[1].original_title}</h2>
            <p>{movies[1].overview}</p>
            <button>That</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThisOrThat;
