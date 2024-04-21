import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Movie {
  id: number;
  original_title: string;
  overview: string;
}

function ThisOrThat() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch movies data from the server
    axios
      .get('/movies')
      .then((response) => {
        console.log('Success:', response.data);
        setMovies(response.data);
        setIsLoading(false);
      })

      .catch((error) => {
        console.error('Error fetching movies:', error);
        setIsLoading(false);
      });
  }, []);
    console.log('Movies:', movies);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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