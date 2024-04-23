"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.discoverRandomMovies = exports.discoverMovies = exports.createOptionsDiscover = void 0;
const axios_1 = __importDefault(require("axios"));
const tmdb_1 = require("../services/tmdb");
Object.defineProperty(exports, "createOptionsDiscover", { enumerable: true, get: function () { return tmdb_1.createOptionsDiscover; } });
// Log the search parameters
function logSearchParams(genre, years, rounds, language, totalPages) {
    console.log("Total pages:", totalPages);
    console.log("Genre:", genre);
    console.log("Years:", years);
    console.log("Rounds:", rounds);
    console.log("Language:", language);
}
// Fetch movies based on the search parameters and include trailers
// need to fetch movies with parameter page 1 to get total_pages which are then used in discoverRandomMovies to select random page
function discoverMovies(genre, years, rounds, language) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = (0, tmdb_1.createOptionsDiscover)(1, genre, years, rounds, language);
        try {
            const response = yield axios_1.default.request(options);
            logSearchParams(genre, years, rounds, language, response.data.total_pages);
            const movies = yield discoverRandomMovies(response.data.total_pages, genre, years, rounds, language);
            // Fetch trailers for each movie
            const movieTrailers = movies.map((movie) => __awaiter(this, void 0, void 0, function* () {
                const options = (0, tmdb_1.createOptionsTrailer)(movie.id);
                const response = yield axios_1.default.request(options);
                movie.videos = response.data.results;
                return movie;
            }));
            const moviesWithVideos = yield Promise.all(movieTrailers);
            console.log("Movies:", moviesWithVideos);
            return moviesWithVideos;
        }
        catch (error) {
            console.error(error);
            return [];
        }
    });
}
exports.discoverMovies = discoverMovies;
// function for fetching a random page of result movies
function discoverRandomMovies(totalPages, genre, years, rounds, language) {
    return __awaiter(this, void 0, void 0, function* () {
        const maxPage = Math.min(totalPages > 1000 ? 1000 : totalPages, 500);
        const randomPage = Math.floor(Math.random() * maxPage) + 1;
        const options = (0, tmdb_1.createOptionsDiscover)(randomPage, genre, years, rounds, language);
        try {
            const response = yield axios_1.default.request(options);
            console.log("Random page:", randomPage);
            return response.data.results.slice(0, rounds);
        }
        catch (error) {
            console.error(error);
            return [];
        }
    });
}
exports.discoverRandomMovies = discoverRandomMovies;
//# sourceMappingURL=movieController.js.map