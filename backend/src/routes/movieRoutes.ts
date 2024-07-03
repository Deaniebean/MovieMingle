import express from "express";
import { deleteMovieHandler, getMovieByIdHandler, saveWatchlistHandler, updateMovieRatingHandler, getWatchlistHandler, searchWatchlistHandler } from "../controllers/movieController";
import { discoverMoviesHandler } from "../controllers/movieController";

const router = express.Router();
router.post("/discover/movies", discoverMoviesHandler);
router.post("/save/watchlist", saveWatchlistHandler);
router.delete("/delete/movie", deleteMovieHandler);
router.get("/movie/:id", getMovieByIdHandler);
router.put("/update/movie-rating", updateMovieRatingHandler);
router.get("/get/watchlist/:userUUID", getWatchlistHandler);
router.get("/search/watchlist", searchWatchlistHandler);

export default router;
