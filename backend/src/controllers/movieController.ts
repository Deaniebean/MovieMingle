import axios from "axios";
import { createOptionsDiscover, createOptionsTrailer } from "../services/tmdb";
import { MovieType } from "../types/Movie";

// Log the search parameters
function logSearchParams(
  genre: string[],
  years: string[],
  rounds: number,
  language: string,
  totalPages: number,
  vote_average: number
) {
  console.log("Total pages:", totalPages);
  console.log("Genre:", genre);
  console.log("Years:", years);
  console.log("Rounds:", rounds);
  console.log("Language:", language);
  console.log("Vote average:", vote_average);
}

// Fetch movies based on the search parameters and include trailers
// need to fetch movies witpage: number, genre: string[], years: string[], rounds: number, language: string, vote_average: number, vote_average: numbers to select random page
export async function discoverMovies(
  genre: string[],
  years: string[],
  rounds: number,
  language: string,
  vote_average: number
) {
  const options = createOptionsDiscover(1, genre, years, rounds, language, vote_average);
  try {
    const response = await axios.request(options);
    logSearchParams(genre, years, rounds, language, vote_average, response.data.total_pages);

    const movies = await discoverRandomMovies(
      response.data.total_pages,
      genre,
      years,
      rounds,
      language,
      vote_average
    );

    // Fetch trailers for each movie
    const movieTrailers = movies.map(async (movie: MovieType) => {
      const options = createOptionsTrailer(movie.id);
      const response = await axios.request(options);
      movie.videos = response.data.results;
      return movie;
    });

    const moviesWithVideos = await Promise.all(movieTrailers);

    console.log("Movies:", moviesWithVideos);
    return moviesWithVideos;
  } catch (error) {
    if (error.response) {
      console.error(
        `Server responded with status code ${error.response.status}`
      );
    } else if (error.request) {
      console.error("No response received from server");
    } else {
      console.error("Error setting up request:", error.message);
    }
    return [];
  }
}

// function for fetching a random page of result movies
export async function discoverRandomMovies(
  totalPages: number,
  genre: string[],
  years: string[],
  rounds: number,
  language: string,
  vote_average: number
) {
  const maxPage = Math.min(totalPages > 1000 ? 1000 : totalPages, 500);
  const randomPage = Math.floor(Math.random() * maxPage) + 1;
  const options = createOptionsDiscover(
    randomPage,
    genre,
    years,
    rounds,
    language,
    vote_average
  );

  try {
    const response = await axios.request(options);
    console.log("Random page:", randomPage);

    // Add totalRounds to each movie object
    const totalRounds = rounds - 1;
    const moviesWithRounds: MovieType[] = response.data.results
      .slice(0, rounds)
      .map((movie: MovieType, index: number) => {
        return {
          ...movie,
          totalRounds
        };
      });

    return moviesWithRounds;

    // return response.data.results.slice(0, rounds);
  } catch (error) {
    if (error.response) {
      console.error(
        `Server responded with status code ${error.response.status}`
      );
    } else if (error.request) {
      console.error("No response received from server");
    } else {
      console.error("Error setting up request:", error.message);
    }
    throw error;
  }
}

export async function addToWatchList(movie: MovieType, userUUID: string) {
  // Add movie to watchlist
}
