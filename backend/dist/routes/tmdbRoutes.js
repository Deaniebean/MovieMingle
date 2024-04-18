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
const express_1 = __importDefault(require("express"));
const tmdb_1 = require("../services/tmdb");
const axios_1 = __importDefault(require("axios"));
const router = express_1.default.Router();
router.get('/discover/movies', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield (0, tmdb_1.discoverMovies)();
        res.json(movies);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
}));
router.get('/discover/movies/random', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // discoverRandomMovies requires totalPages as an argument, so we need to get it first.
        // Here, we're assuming that the first page of results always exists and has the total_pages property.
        const firstPageOptions = (0, tmdb_1.createOptions)(1);
        const firstPageResponse = yield axios_1.default.request(firstPageOptions);
        const totalPages = firstPageResponse.data.total_pages;
        const movies = yield (0, tmdb_1.discoverRandomMovies)(totalPages);
        res.json(movies);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
}));
exports.default = router;
//# sourceMappingURL=tmdbRoutes.js.map