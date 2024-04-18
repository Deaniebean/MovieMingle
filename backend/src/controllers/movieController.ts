import axios from 'axios';
import {createOptions} from '../services/tmdb';

// this functions main purpose is to get the total number of pages for the input params and then call the discoverRandomMovies() function
async function discoverMovies() {
    const options = createOptions(1);
  
    try {
      const response = await axios.request(options);
      console.log('Total pages:', response.data.total_pages);
      const movies = await discoverRandomMovies(response.data.total_pages);
      return movies;
    } catch (error) {
      console.error(error);
      return [];
    }
}
  
  
  
  // This function is necessary to randomize the page number for the discoverMovies() function, otherwise the movie results will always be the same
  async function discoverRandomMovies(totalPages: number) {
    const randomPage = Math.floor(Math.random() * Math.min(totalPages, 500)) + 1;
    const options = createOptions(randomPage);
  
    try {
      const response = await axios.request(options);
      console.log('Random page:', randomPage);
      return response.data.results;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  
  
  
  
  export { createOptions, discoverMovies, discoverRandomMovies };