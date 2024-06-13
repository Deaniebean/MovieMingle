import React, { useEffect, useState } from 'react';
import { Movie } from '../types/MovieType';
import { Genre } from '../types/GenreType';
import './ThisOrThat.css';
import genreData from '../genre.json';
// import tempMovies from './tempMovies.json';
import { useNavigate } from 'react-router-dom';

// Components
import MovieInfoCard from './innerComponents/MovieInfoCard';

// Assets
// import cardFlipIcon from '../assets/cardFlipIcon.svg';

interface Props {
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

// const ThisOrThat: React.FC<Props> = ({ setMovies }): React.ReactNode => {
const ThisOrThat: React.FC<Props> = ({
  movies,
  setMovies,
}): React.ReactNode => {
  const navigate = useNavigate();
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(1);
  const [totalChoices, setTotalChoices] = useState(0);

  const getRoundInfo = () => {
    // Access the totalRounds from the first movie object
    const totalRounds = movies[0].totalRounds;

    return `Round ${totalChoices + 1}/${totalRounds}`;
  };

  function getGenreNames(genreIds: number[]): string[] {
    return genreIds.map((id) => {
      const genre = genreData.genres.find((genre: Genre) => genre.id === id);
      console.log(genre ? genre.name : '');
      return genre ? genre.name : '';
    });
  }

  // Renders genres for indexed movie
  const renderFilmGenres = (index: number, isFirst: boolean): JSX.Element => {
    if (index < 0 || index >= movies.length) {
      return <p>No genres</p>;
    }

    const movie = movies[index];
    const genres = getGenreNames(movie.genre_ids);

    // max no. of genres displayed? 2-3?
    return (
      <div className={`flex flex-wrap gap-1 ${isFirst ? '' : 'justify-end'}`}>
        {genres.map((genre, i) => (
          <span
            className={`border rounded-md px-3 py-1 text-xs ${
              isFirst ? 'border-white' : 'border-primary'
            }`}
            key={i}
          >
            {genre}
          </span>
        ))}
      </div>
    );
  };

  const renderRating = (index: number): string => {
    let rating = movies[index].vote_average
      ? Math.round(movies[index].vote_average! * 10) / 10 + '/10'
      : '-'; // If no rating return empty string
    return rating;
  };

  const chooseMovie = (chosenIndex: number) => {
    // Create a copy of the movies array
    let newMovies = [...movies];

    // Find the index of the unchosen movie in the newMovies array
    const unchosenMovie = movies[chosenIndex === index1 ? index2 : index1];
    const unchosenIndex = newMovies.findIndex(
      (movie) => movie.original_title === unchosenMovie.original_title
    );

    // Remove the unchosen movie from the array
    console.log('Unchosen index:', unchosenIndex);
    newMovies.splice(unchosenIndex, 1);

    // If there's only one movie left, we have a winner
    if (newMovies.length === 1) {
      console.log('Winner:', newMovies[0]);
      navigate('/winner', { state: { movie: newMovies[0] } });
      return;
    }

    // Choose the next two movies in the array for the next round
    //condition to keep chosen movies in the same spot as previous round
    let newIndex1, newIndex2;

    // Indexing fix, movies stay in correct positions now
    if (chosenIndex === index1) {
      newIndex1 = newMovies.findIndex(
        (movie) => movie.original_title === movies[index1].original_title
      );
      newIndex2 = (newIndex1 + 1) % newMovies.length;
    } else {
      newIndex2 = newMovies.findIndex(
        (movie) => movie.original_title === movies[index2].original_title
      );
      newIndex1 = (newIndex2 + newMovies.length - 1) % newMovies.length;
    }
    // Update state
    setIndex1(newIndex1);
    setIndex2(newIndex2);
    setMovies(newMovies);

    // Increment totalChoices when a movie is chosen
    setTotalChoices(totalChoices + 1);
  };

  useEffect(() => {
    console.log('Movies:', movies);
  }, [movies]);

  // console.log('Movies:', movies);

  return (
    <div className="flex flex-col container mx-auto h-screen -mt-10 pt-8 md:-mt-28 md:pt-24">
      <div className="flex-1">
        <p className='text-center mt-6 md:-mb-4 -mb-10'>{getRoundInfo()}</p>

        <MovieInfoCard index={index1} movies={movies} isPrimary={true} hasTrailer={movies[index1].videos && movies[index1].videos[0] ? true : false}/>

        <div className="centerBar flex justify-center -mb-1 md:-mb-0">
          {/* make button full available space */}
          <button
            className="flex-1 rounded-full text-lg md:text-2xl text-white font-semibold bg-primary px-2 py-1 md:px-3 md:py-2.5"
            onClick={() => chooseMovie(index1)}
          >
            This
          </button>
          <p className="flex-none rounded-full text-lg md:text-2xl text-white font-semibold bg-secondary px-2 py-1 md:px-3 md:py-2.5">
            or
          </p>
          <button
            className="flex-1 border-white rounded-full text-lg md:text-2xl text-secondary font-semibold bg-white px-2 py-1 md:px-3 md:py-2.5"
            onClick={() => chooseMovie(index2)}
          >
            That
          </button>
        </div>

        <MovieInfoCard index={index2} movies={movies} isPrimary={false} hasTrailer={movies[index2].videos && movies[index2].videos[0] ? true : false}/>
        
      </div>
    </div>
  );
};

export default ThisOrThat;
