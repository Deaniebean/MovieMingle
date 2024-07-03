import axios from "axios";
import { createOptionsDiscover, createOptionsTrailer } from "../services/tmdb";
import { MovieType } from "../types/Movie";
import express from "express";
import Movie from "../models/mongooseMovies";
import { User } from "../models/mongooseUsers";

// Fetch movies based on the search parameters and include trailers
// need to fetch movies witpage: number, genre: string[], years: string[], rounds: number, language: string, vote_average: number, vote_average: numbers to select random page
export const discoverMovies = async(
  genre: string[],
  years: string[],
  rounds: number,
  language: string,
  vote_average: number
) => {
  const options = createOptionsDiscover(1, genre, years, rounds, language, vote_average);
  try {
    const response = await axios.request(options);

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
export const discoverRandomMovies = async (
  totalPages: number,
  genre: string[],
  years: string[],
  rounds: number,
  language: string,
  vote_average: number
) => {
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

export const discoverMoviesHandler = async (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
): Promise<void> => {
    let movies: MovieType[] = [];
    const { genre, years, rounds, language, vote_average } = request.body;
    movies = await discoverMovies(genre, years, rounds, language, vote_average);
    response.json(movies);
}



export const saveWatchlistHandler = async (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction): Promise<void> => {
    try {
    let movies: MovieType[] = [];
    const { movieData, userUUID } = request.body;
    console.log("movieData:", movieData);
  
  
    // Check if the movie already exists in the database
    let movie = await Movie.findOne(movieData);
  
    // If the movie doesn't exist, create a new one
    if (!movie) {
      movie = new Movie(movieData);
      await movie.save();
    }
  
    
      const user = await User.findOne({ uuid: userUUID });
  
      if (!user) {
        response.status(404).json({ message: "User not found" });
        return;
      }
  
      // Convert the movie's _id to a string
      const movieIdString = movie._id.toString();
  
      // Check if the movie is already in the user's watchlist
      if (user.watch_list.map((id: { toString: () => any; }) => id.toString()).includes(movieIdString)) {
        response.status(400).json({ message: "Movie already in watchlist" });
        return;
      }
  
      user.watch_list.push(movie._id);
      await user.save();
  
      response.json({ movieData, userUUID });
    } catch (error) {
      next(error);
    }
  }

  export const deleteMovieHandler = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction): Promise<void> => {
      const { movieId } = request.body;

      try {
        const movie = await Movie.findOne({ id: movieId });
    
        if (!movie) {
          response.status(404).json({ message: "Movie not found" });
          return;
        }
        // remove movie from movie collection
        await Movie.deleteOne({ id: movieId });
    
        // Remove the movie's ObjectId from the watch_list
        await User.updateMany({}, { $pull: { watch_list: movie._id } });
    
        response.json({ message: "Movie deleted successfully" });
      } catch (error) {
        next(error)
      }
    }

    export const getMovieByIdHandler = async (
      request: express.Request,
      response: express.Response,
      next: express.NextFunction): Promise<void> => {

      const { id } = request.params;
    
      try {
        const movie = await Movie.findById(id);
    
        if (!movie) {
          response.status(404).json({ message: "Movie not found" });
          return;
        }
    
        response.json(movie);
      } catch (error) {
        next(error)
      }
    };

    export const updateMovieRatingHandler = async (
      request: express.Request,
      response: express.Response,
      next: express.NextFunction): Promise<void> => {
      const { movieId, rating } = request.body;
    
      try {
        const movie = await Movie.findOne({ id: movieId });
    
        if (!movie) {
          response.status(404).json({ message: "Movie not found" });
          return;
        }
    
        movie.rating = rating;
        await movie.save();
    
        response.json({ message: "Rating updated successfully" });
      } catch (error) {
        next(error)
      }
    };
    
    export const getWatchlistHandler = async (request: express.Request,
      response: express.Response,
      next: express.NextFunction): Promise<void> => {
        const { userUUID } = request.params;

        try {
          const user = await User.findOne({ uuid: userUUID });
      
          if (!user) {
            response.status(404).json({ message: "User not found" });
            return;
          }
      
          const moviePromises = user.watch_list.map(async (movieId) => {
            console.log(user.watch_list);
            return await Movie.findById(movieId);
          });
      
          const movies = await Promise.all(moviePromises);
      
          response.json(movies);
      
        } catch (error) {
          next(error)
        }
      };

      export const searchWatchlistHandler = async (request: express.Request,
        response: express.Response,
        next: express.NextFunction): Promise<void> => {
          const { query, userUUID } = request.query;
        
          if (typeof userUUID !== 'string') {
            response.status(400).json({ message: "Invalid userUUID" });
            return;
          }
          
          try {
            const user = await User.findOne({ uuid: userUUID });
        
            if (!user) {
              response.status(404).json({ message: "User not found" });
              return;
            }
        
            // Fetch the movies in the user's watchlist
            const movies = await Movie.find({
              _id: { $in: user.watch_list },
              original_title: new RegExp(String(query), 'i') // case-insensitive search
            });
        
            response.json(movies);
          } catch (error) {
            next(error)
          }
        };