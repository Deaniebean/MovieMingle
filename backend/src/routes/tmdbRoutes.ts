import express, { Request, Response, NextFunction } from "express";
import {
  discoverMovies,
  discoverRandomMovies,
  getMovies,
} from "../controllers/movieController";

const router = express.Router();

router.post("/discover/movies", async (req, res) => {
  const { genre, years, rounds, language } = req.body;
  console.log("genre:", genre);
  console.log("years:", years);
  console.log("rounds:", rounds);
  console.log("language:", language);

  const movies = await discoverMovies(genre, years, rounds, language);
  res.json(movies);
});

export default router;
