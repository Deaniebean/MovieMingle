import React, { useEffect, useState } from 'react';
import { Movie } from '../types/MovieType';
import { Genre } from '../types/GenreType';
import './ThisOrThat.css';
import genreData from '../genre.json';

interface Props {
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const ThisOrThat: React.FC<Props> = ({ movies, setMovies }): React.ReactNode => {

  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(1);

  
  
  function getGenreNames(genreIds: number[]): string[] {
    return genreIds.map((id) => {
      const genre = genreData.genres.find((genre: Genre) => genre.id === id);
      return genre ? genre.name : '';
    });
  }


  const chooseMovie = (chosenIndex: number) => {
    // Create a copy of the movies array
    let newMovies = [...movies];
  
    // Find the index of the unchosen movie in the newMovies array
    const unchosenMovie = movies[chosenIndex === index1 ? index2 : index1];
    const unchosenIndex = newMovies.findIndex(movie => movie.original_title === unchosenMovie.original_title);
  
   // Find the index of the chosen movie in the newMovies array
   const newIndex = newMovies.findIndex(movie => movie.original_title === movies[chosenIndex].original_title);


    // Remove the unchosen movie from the array
    console.log('Unchosen index:', unchosenIndex);
    newMovies.splice(unchosenIndex, 1);
  
    // If there's only one movie left, we have a winner
    if (newMovies.length === 1) {
      console.log('Winner:', newMovies[0]);
      return;
    }
  
  // Choose the next two movies in the array for the next round
  let newIndex1 = newIndex;
  let newIndex2 = (newIndex1 + 1) % newMovies.length;

    // Update state
    setIndex1(newIndex1);
    setIndex2(newIndex2);
    setMovies(newMovies);
  };

  useEffect(() => {
    console.log('New movies array:', movies);
    console.log('New index1:', index1);
    console.log('New index2:', index2);
  }, [movies, index1, index2]);




  function addToWatchList(e: React.MouseEvent, index: number) {
    e.stopPropagation();
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
      <div className="this" >
        {movies[index1] && (
          <div onClick = {() => chooseMovie(index1)}>
            <h2>{movies[index1].original_title}</h2>
            <p>{movies[index1].overview}</p>
            <button>This</button>
            <br/>
            <button onClick={(e) => addToWatchList(e, index1)}>
              + Add to watch list
            </button>
          </div>
        )}
      </div>
      <div className="that">
        {movies[index2] && (
          <div onClick = {() => chooseMovie(index2)}>
            <h2>{movies[index2].original_title}</h2>
            <p>{movies[index2].overview}</p>
            <button>That</button>
            <br/>
            <button onClick={(e) => addToWatchList(e, index2)}>
              + Add to watch list
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThisOrThat;
