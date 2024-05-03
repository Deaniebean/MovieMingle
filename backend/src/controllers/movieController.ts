import axios from "axios";
import { createOptionsDiscover, createOptionsTrailer } from "../services/tmdb";
import { Movie } from "../types/Movie";

// Log the search parameters
function logSearchParams(genre: string[], years: string[], rounds: number, language: string, totalPages: number) {
  console.log("Total pages:", totalPages);
  console.log("Genre:", genre);
  console.log("Years:", years);
  console.log("Rounds:", rounds);
  console.log("Language:", language);
}

// Fetch movies based on the search parameters and include trailers
// need to fetch movies with parameter page 1 to get total_pages which are then used in discoverRandomMovies to select random page
async function discoverMovies(genre: string[], years: string[], rounds: number, language: string) {
  const options = createOptionsDiscover(1, genre, years, rounds, language);
  try {
    const response = await axios.request(options);
    logSearchParams(genre, years, rounds, language, response.data.total_pages);

    const movies = await discoverRandomMovies(response.data.total_pages, genre, years, rounds, language);

    // Fetch trailers for each movie
    const movieTrailers = movies.map(async (movie: Movie) => {
      const options = createOptionsTrailer(movie.id);
      const response = await axios.request(options);
      movie.videos = response.data.results;
      return movie;
    });

    const moviesWithVideos = await Promise.all(movieTrailers);

    console.log("Movies:", moviesWithVideos);
    return moviesWithVideos;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// function for fetching a random page of result movies
async function discoverRandomMovies(totalPages: number, genre: string[], years: string[], rounds: number, language: string) {
  const maxPage = Math.min(totalPages > 1000 ? 1000 : totalPages, 500);
  const randomPage = Math.floor(Math.random() * maxPage) + 1;
  const options = createOptionsDiscover(randomPage, genre, years, rounds, language);

  try {
    const response = await axios.request(options);
    console.log("Random page:", randomPage);
    return response.data.results.slice(0, rounds);
  } catch (error) {
    console.error(error);
    return [];
  }
}



async function addToWatchList() {
  // Add movie to watchlist
}

export { createOptionsDiscover, discoverMovies, discoverRandomMovies, addToWatchList };