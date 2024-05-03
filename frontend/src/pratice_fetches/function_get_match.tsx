import React, { useEffect, useState } from 'react';

const MovieSelector = () => {
  const [movies, setMovies] = useState([
    {original_title: "Monster Inc"},
    {original_title: "The Incredibles"},
    {original_title: "the Minions"},
    {original_title: "Moana"},
    {original_title: "Pocahontas"},
    {original_title:"The Little Mermaid"}
  ]);

  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(1);

  const chooseMovie = (chosenIndex: number) => {
    // Create a copy of the movies array
    let newMovies = [...movies];
  
    // Remove the unchosen movie from the array
    const unchosenIndex = chosenIndex === index1 ? index2: index1;
    console.log('Unchosen index:', unchosenIndex);
    newMovies.splice(unchosenIndex, 1);

    // Find the index of the chosen movie in the newMovies array
    const newIndex = newMovies.findIndex(movie => movie.original_title === movies[chosenIndex].original_title);


  // If there's only one movie left, we have a winner
    if (newMovies.length === 1) {
      console.log('Winner:', newMovies[0]);
      return;
    }

  // Choose the next two movies in the array for the next round
    let newIndex1 = newIndex;
    let newIndex2 = (newIndex1 + 1) % newMovies.length;

  // Update state
  setMovies(newMovies);
  setIndex1(newIndex1);
  setIndex2(newIndex2);
  
};

  useEffect(() => {
    console.log('New movies array:', movies);
    console.log('New index1:', index1);
    console.log('New index2:', index2);
  }, [movies, index1, index2]);

  return (
    <div>
      <button onClick={() => chooseMovie(0)}>
        {movies[index1]?.original_title}
      </button>
      <button onClick={() => chooseMovie(1)}>
        {movies[index2]?.original_title}
      </button>
    </div>
  );
};

export default MovieSelector;