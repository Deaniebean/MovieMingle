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
exports.discoverRandomMovies = exports.discoverMovies = exports.createOptions = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// This is the POST from frontend filter page to the tmdb-api discover endpoint => params are added to GET request in the createOptions() function
/*  filters DISCOVER ENDPOINT: !!!choose Movie or TV show -> two different endpoints

    Genre: &with_genre => id hardcoded in src/genres.json file

    release years: &primary_release_date.gte= 2000-01-01&primary_release_date.lte=2010-12-31 = 2000-2010



    actors is tricky: &with_people:
    1.first post form input to endpoint /search/person?queryactor%30name -> if no match return "no match found"
    2. get results "results": ["id": 500]
    3. post the actors/producer id in the &with_people param in the discover endpoint

*/
const API_KEY = process.env.TMDB_API_KEY;
if (!API_KEY) {
    throw new Error('Missing environment variables');
}
// extra function for params to avoid duplication
function createOptions(page) {
    return {
        method: 'GET',
        url: `https://api.themoviedb.org/3/discover/movie`,
        params: {
            include_adult: false,
            include_video: true,
            language: 'en-US',
            page,
            sort_by: 'popularity.desc',
            'primary_release_date.gte': '2000-01-01',
            'primary_release_date.lte': '2010-12-31',
            api_key: API_KEY,
        },
        headers: {
            accept: 'application/json',
        }
    };
}
exports.createOptions = createOptions;
// this functions main purpose is to get the total number of pages for the input params and then call the discoverRandomMovies() function
function discoverMovies() {
    return __awaiter(this, void 0, void 0, function* () {
        const options = createOptions(1);
        try {
            const response = yield axios_1.default.request(options);
            console.log('Total pages:', response.data.total_pages);
            yield discoverRandomMovies(response.data.total_pages);
            return response.data.results;
        }
        catch (error) {
            console.error(error);
            return [];
        }
    });
}
exports.discoverMovies = discoverMovies;
// This function is necessary to randomize the page number for the discoverMovies() function, otherwise the movie results will always be the same
function discoverRandomMovies(totalPages) {
    return __awaiter(this, void 0, void 0, function* () {
        const randomPage = Math.floor(Math.random() * Math.min(totalPages, 500)) + 1;
        const options = createOptions(randomPage);
        try {
            const response = yield axios_1.default.request(options);
            console.log('Random page:', randomPage);
            return response.data.results;
        }
        catch (error) {
            console.error(error);
            return [];
        }
    });
}
exports.discoverRandomMovies = discoverRandomMovies;
//# sourceMappingURL=tmdb.js.map