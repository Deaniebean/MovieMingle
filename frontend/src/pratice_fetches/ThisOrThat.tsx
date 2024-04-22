import React, { useEffect, useState } from 'react';
import { MovieType } from './MovieType';


interface Props {
  movies: MovieType[];
  setMovies: React.Dispatch<React.SetStateAction<MovieType[]>>;
}


const ThisOrThat: React.FC<Props> = ({ movies }): React.ReactNode => {


  useEffect(() => {
    console.log('Movies:', movies);
}, [movies])


  console.log('Movies:', movies);



  return (
    <div>
      <h1>Movies</h1>
      {Array.isArray(movies) &&
        movies.map((movie, index) => (
          <div key={index}>
            <h2>{movie.original_title}</h2>
            <p>{movie.overview}</p>
          </div>
        ))}
    </div>
  );
}

export default ThisOrThat;