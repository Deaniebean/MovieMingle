"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movieController_1 = require("../controllers/movieController");
const movieController_2 = require("../controllers/movieController");
const router = express_1.default.Router();
router.post("/discover/movies", movieController_2.discoverMoviesHandler);
router.post("/save/watchlist", movieController_1.saveWatchlistHandler);
router.delete("/delete/movie", movieController_1.deleteMovieHandler);
router.get("/movie/:id", movieController_1.getMovieByIdHandler);
router.put("/update/movie-rating", movieController_1.updateMovieRatingHandler);
router.get("/get/watchlist/:userUUID", movieController_1.getWatchlistHandler);
router.get("/search/watchlist", movieController_1.searchWatchlistHandler);
exports.default = router;
//# sourceMappingURL=movieRoutes.js.map