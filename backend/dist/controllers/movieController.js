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
// this functions main purpose is to get the total number of pages for the input params and then call the discoverRandomMovies() function
function discoverMovies(genre, years, rounds) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = (0, tmdb_1.createOptionsDiscover)(1, genre, years, rounds);
        try {
            const response = yield axios_1.default.request(options);
            console.log('Total pages:', response.data.total_pages);
            console.log('Genre:', genre);
            console.log('Years:', years);
            console.log('Rounds:', rounds);
            const movies = yield discoverRandomMovies(response.data.total_pages, genre, years, rounds);
            console.log('Movies:', movies);
            return movies;
        }
        catch (error) {
            console.error(error);
            return [];
        }
    });
}
exports.discoverMovies = discoverMovies;
// This function is necessary to randomize the page number for the discoverMovies() function, otherwise the movie results will always be the same
// since default sorting is by popularity we don't want it to be too far down the list -> max totalPages value = 1000
function discoverRandomMovies(totalPages, genre, years, rounds) {
    return __awaiter(this, void 0, void 0, function* () {
        if (totalPages < 1000) {
            totalPages = 1000;
        }
        const randomPage = Math.floor(Math.random() * Math.min(totalPages, 500)) + 1;
        const options = (0, tmdb_1.createOptionsDiscover)(randomPage, genre, years, rounds);
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
//# sourceMappingURL=movieController.js.map