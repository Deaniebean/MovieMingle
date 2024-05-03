import React, { useEffect, useState } from 'react';
import { Movie } from '../types/MovieType';
import './ThisOrThat.css'; 


interface Props {
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}


const ThisOrThat: React.FC<Props> = ({ movies }): React.ReactNode => {


  useEffect(() => {
    console.log('Movies:', movies);
}, [movies])


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
}

export default ThisOrThat;