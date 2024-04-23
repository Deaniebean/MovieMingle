"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOptionsTrailer = exports.createOptionsDiscover = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// This is for the POST from frontend filter page to the tmdb-api discover endpoint => params are added to GET request in the createOptions() function
/*

    Genre: &with_genre => id hardcoded in src/genres.json file

    release years: &primary_release_date.gte= 2000-01-01&primary_release_date.lte=2010-12-31 = 2000-2010


*/
const API_KEY = process.env.TMDB_API_KEY;
if (!API_KEY) {
    throw new Error('Missing environment variables');
}
// function for api request with params to avoid duplication
function createOptionsDiscover(page, genre, years, rounds, language) {
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/discover/movie`,
        params: {
            include_adult: false,
            include_video: false,
            with_genres: genre ? genre.join(',') : undefined,
            with_original_language: language ? language.toLowerCase() : undefined,
            page,
            sort_by: 'popularity.desc',
            'primary_release_date.gte': years && years.length > 0 ? years[0] : undefined,
            'primary_release_date.lte': years && years.length > 1 ? years[1] : undefined,
            api_key: API_KEY,
        },
        headers: {
            accept: 'application/json',
        }
    };
    console.log('Options:', options);
    return options;
}
exports.createOptionsDiscover = createOptionsDiscover;
// trailers can only be found with movie id at different endpoint
function createOptionsTrailer(movieId) {
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        params: {
            api_key: API_KEY,
        },
        headers: {
            accept: 'application/json',
        }
    };
    console.log('Options:', options);
    return options;
}
exports.createOptionsTrailer = createOptionsTrailer;
//# sourceMappingURL=tmdb.js.map