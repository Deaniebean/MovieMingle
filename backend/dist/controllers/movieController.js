"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchWatchlistHandler = exports.getWatchlistHandler = exports.updateMovieRatingHandler = exports.getMovieByIdHandler = exports.deleteMovieHandler = exports.saveWatchlistHandler = exports.discoverMoviesHandler = exports.discoverRandomMovies = exports.discoverMovies = void 0;
const axios_1 = __importDefault(require("axios"));
const tmdb_1 = require("../services/tmdb");
const mongooseMovies_1 = __importDefault(require("../models/mongooseMovies"));
const mongooseUsers_1 = require("../models/mongooseUsers");
const logger_1 = __importDefault(require("../config/logger"));
// Fetch movies based on the search parameters and include trailers
// need to fetch movies witpage: number, genre: string[], years: string[], rounds: number, language: string, vote_average: number, vote_average: numbers to select random page
const discoverMovies = async (genre, years, rounds, language, vote_average) => {
    const options = (0, tmdb_1.createOptionsDiscover)(1, genre, years, rounds, language, vote_average);
    try {
        const response = await axios_1.default.request(options);
        const movies = await (0, exports.discoverRandomMovies)(response.data.total_pages, genre, years, rounds, language, vote_average);
        // Fetch trailers for each movie
        const movieTrailers = movies.map(async (movie) => {
            const options = (0, tmdb_1.createOptionsTrailer)(movie.id);
            const response = await axios_1.default.request(options);
            movie.videos = response.data.results;
            return movie;
        });
        const moviesWithVideos = await Promise.all(movieTrailers);
        logger_1.default.info("Movies:", moviesWithVideos);
        return moviesWithVideos;
    }
    catch (error) {
        if (error.response) {
            /*console.error(
              `Server responded with status code ${error.response.status}`
            );*/
        }
        else if (error.request) {
            //console.error("No response received from server");
        }
        else {
            //console.error("Error setting up request:", error.message);
        }
        return [];
    }
};
exports.discoverMovies = discoverMovies;
// function for fetching a random page of result movies
const discoverRandomMovies = async (totalPages, genre, years, rounds, language, vote_average) => {
    const maxPage = Math.min(totalPages > 1000 ? 1000 : totalPages, 500);
    const randomPage = Math.floor(Math.random() * maxPage) + 1;
    const options = (0, tmdb_1.createOptionsDiscover)(randomPage, genre, years, rounds, language, vote_average);
    try {
        const response = await axios_1.default.request(options);
        logger_1.default.debug("Random page:", randomPage);
        // Add totalRounds to each movie object
        const totalRounds = rounds - 1;
        const moviesWithRounds = response.data.results
            .slice(0, rounds)
            .map((movie, index) => {
            return Object.assign(Object.assign({}, movie), { totalRounds });
        });
        return moviesWithRounds;
        // return response.data.results.slice(0, rounds);
    }
    catch (error) {
        if (error.response) {
            console.error(`Server responded with status code ${error.response.status}`);
        }
        else if (error.request) {
            console.error("No response received from server");
        }
        else {
            console.error("Error setting up request:", error.message);
        }
        throw error;
    }
};
exports.discoverRandomMovies = discoverRandomMovies;
const discoverMoviesHandler = async (request, response, next) => {
    let movies = [];
    const { genre, years, rounds, language, vote_average } = request.body;
    movies = await (0, exports.discoverMovies)(genre, years, rounds, language, vote_average);
    response.json(movies);
};
exports.discoverMoviesHandler = discoverMoviesHandler;
const saveWatchlistHandler = async (request, response, next) => {
    try {
        let movies = [];
        const { movieData, userUUID } = request.body;
        logger_1.default.debug("movieData:", movieData);
        // Check if the movie already exists in the database
        let movie = await mongooseMovies_1.default.findOne(movieData);
        // If the movie doesn't exist, create a new one
        if (!movie) {
            movie = new mongooseMovies_1.default(movieData);
            await movie.save();
        }
        const user = await mongooseUsers_1.User.findOne({ uuid: userUUID });
        if (!user) {
            response.status(404).json({ message: "User not found" });
            return;
        }
        // Convert the movie's _id to a string
        const movieIdString = movie._id.toString();
        // Check if the movie is already in the user's watchlist
        if (user.watch_list.map((id) => id.toString()).includes(movieIdString)) {
            response.status(400).json({ message: "Movie already in watchlist" });
            return;
        }
        user.watch_list.push(movie._id);
        await user.save();
        response.json({ movieData, userUUID });
    }
    catch (error) {
        next(error);
    }
};
exports.saveWatchlistHandler = saveWatchlistHandler;
const deleteMovieHandler = async (request, response, next) => {
    const { movieId } = request.body;
    try {
        const movie = await mongooseMovies_1.default.findOne({ id: movieId });
        if (!movie) {
            response.status(404).json({ message: "Movie not found" });
            return;
        }
        // remove movie from movie collection
        await mongooseMovies_1.default.deleteOne({ id: movieId });
        // Remove the movie's ObjectId from the watch_list
        await mongooseUsers_1.User.updateMany({}, { $pull: { watch_list: movie._id } });
        response.json({ message: "Movie deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteMovieHandler = deleteMovieHandler;
const getMovieByIdHandler = async (request, response, next) => {
    const { id } = request.params;
    try {
        const movie = await mongooseMovies_1.default.findById(id);
        if (!movie) {
            response.status(404).json({ message: "Movie not found" });
            return;
        }
        response.json(movie);
    }
    catch (error) {
        next(error);
    }
};
exports.getMovieByIdHandler = getMovieByIdHandler;
const updateMovieRatingHandler = async (request, response, next) => {
    const { movieId, rating } = request.body;
    try {
        const movie = await mongooseMovies_1.default.findOne({ id: movieId });
        if (!movie) {
            response.status(404).json({ message: "Movie not found" });
            return;
        }
        movie.rating = rating;
        await movie.save();
        response.json({ message: "Rating updated successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.updateMovieRatingHandler = updateMovieRatingHandler;
const getWatchlistHandler = async (request, response, next) => {
    const { userUUID } = request.params;
    try {
        const user = await mongooseUsers_1.User.findOne({ uuid: userUUID });
        if (!user) {
            response.status(404).json({ message: "User not found" });
            return;
        }
        const moviePromises = user.watch_list.map(async (movieId) => {
            logger_1.default.debug(user.watch_list);
            return await mongooseMovies_1.default.findById(movieId);
        });
        const movies = await Promise.all(moviePromises);
        response.json(movies);
    }
    catch (error) {
        next(error);
    }
};
exports.getWatchlistHandler = getWatchlistHandler;
const searchWatchlistHandler = async (request, response, next) => {
    const { query, userUUID } = request.query;
    if (typeof userUUID !== 'string') {
        response.status(400).json({ message: "Invalid userUUID" });
        return;
    }
    try {
        const user = await mongooseUsers_1.User.findOne({ uuid: userUUID });
        if (!user) {
            response.status(404).json({ message: "User not found" });
            return;
        }
        // Fetch the movies in the user's watchlist
        const movies = await mongooseMovies_1.default.find({
            _id: { $in: user.watch_list },
            original_title: new RegExp(String(query), 'i') // case-insensitive search
        });
        response.json(movies);
    }
    catch (error) {
        next(error);
    }
};
exports.searchWatchlistHandler = searchWatchlistHandler;
//# sourceMappingURL=movieController.js.map