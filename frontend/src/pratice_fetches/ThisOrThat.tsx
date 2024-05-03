import React, { useEffect, useState } from 'react';
import { Movie } from '../types/MovieType';
import { Genre } from '../types/GenreType';
import './ThisOrThat.css';
import genreData from '../genre.json';

interface Props {
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const ThisOrThat: React.FC<Props> = ({ movies }): React.ReactNode => {
  function getGenreNames(genreIds: number[]): string[] {
    return genreIds.map((id) => {
      const genre = genreData.genres.find((genre: Genre) => genre.id === id);
      return genre ? genre.name : '';
    });
  }

  function addToWatchList(index: number) {
    const id = movies[index].id;
    const original_title = movies[index].original_title;
    const original_language = movies[index].original_language;
    const overview = movies[index].overview;
    const genre = getGenreNames(movies[index].genre_ids);
    const release_date = movies[index].release_date;
    
  if(movies[index].poster_path){
    const poster_path = "https://image.tmdb.org/t/p/original" + movies[index].poster_path;
   console.log('poster_path:', poster_path);
  } else {
    const poster_path = 'No poster available';
    console.log('poster_path:', poster_path);
  }
    const vote_average = movies[index].vote_average;
    const vote_count = movies[index].vote_count;

    if (movies[index].videos) {
      const trailer = 'www.youtube.com/watch?v=' + movies[index].videos[0].key;
      console.log('trailer:', trailer);
    }
    const date = new Date(Date.now()).toISOString().slice(0, 10);
    const rating = 0;

    console.log('id:', id);
    console.log('original_title:', original_title);
    console.log('original_language:', original_language);
    console.log('overview:', overview);
    console.log('genre:', genre);
    console.log('release_date:', release_date);
   
    console.log('vote_average:', vote_average);
    console.log('vote_count:', vote_count);
    console.log('date:', date);
    console.log('rating:', rating);
  }

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
            <br />
            <button onClick={() => addToWatchList(0)}>
              + Add to watch list
            </button>
          </div>
        )}
      </div>
      <div className="that">
        {movies[1] && (
          <div>
            <h2>{movies[1].original_title}</h2>
            <p>{movies[1].overview}</p>
            <button>That</button>
            <br />
            <button onClick={() => addToWatchList(1)}>
              + Add to watch list
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThisOrThat;
