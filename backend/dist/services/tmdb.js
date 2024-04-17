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
exports.getMovies = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function getMovies() {
    return __awaiter(this, void 0, void 0, function* () {
        const API_KEY = process.env.TMDB_API_KEY;
        return axios_1.default.get(`https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${API_KEY}`)
            .then((response) => {
            console.log(response.data.results);
            return response.data.results;
        })
            .catch((error) => {
            console.error('Error:', error);
            throw error;
        });
    });
}
exports.getMovies = getMovies;
//# sourceMappingURL=tmdb.js.map