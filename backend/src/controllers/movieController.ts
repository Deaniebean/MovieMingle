import axios from 'axios';
import {createOptionsDiscover} from '../services/tmdb';

// this functions main purpose is to call tmdb with query params and get the total number of pages  and then call the discoverRandomMovies() function
async function discoverMovies(genre: string[], years: string[], rounds: number) {

  const options = createOptionsDiscover(1, genre, years, rounds);
  try {
    const response = await axios.request(options);
    console.log('Total pages:', response.data.total_pages);
    console.log('Genre:', genre);
    console.log('Years:', years);
    console.log('Rounds:', rounds);

    const movies = await discoverRandomMovies(response.data.total_pages, genre, years, rounds);
    console.log('Movies:', movies);
    return movies;
  } catch (error) {
    console.error(error);
    return [];
  }
}

  // This function is necessary to randomize the page number for the discoverMovies() function, otherwise the movie results will always be the same
  // since default sorting is by popularity we don't want it to be too far down the list -> max totalPages value = 1000
  async function discoverRandomMovies(totalPages: number, genre: string[], years: string[], rounds: number) {
    if (totalPages<1000) {
      totalPages = 1000
    }
    const randomPage = Math.floor(Math.random() * Math.min(totalPages, 500)) + 1;
    const options = createOptionsDiscover(randomPage, genre, years, rounds);

    try {
      const response = await axios.request(options);
      console.log('Random page:', randomPage);
      return response.data.results;
    } catch (error) {
      console.error(error);
      return [];
    }
}


  export { createOptionsDiscover, discoverMovies, discoverRandomMovies };