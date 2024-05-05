import express, { Request, Response, NextFunction } from "express";
import {
  discoverMovies,
} from "../controllers/movieController";
import { Movie } from "../types/Movie";

const router = express.Router();
let movies: Movie[] = [];
router.post("/discover/movies", async (req, res) => {
  const { genre, years, rounds, language } = req.body;
  console.log("genre:", genre);
  console.log("years:", years);
  console.log("rounds:", rounds);
  console.log("language:", language);

  movies = await discoverMovies(genre, years, rounds, language);
  res.json(movies);
});



router.post("/save/watchlist", (req: Request, res: Response) => {
  const { movieData, userUUID } = req.body;
  console.log("movieData:", movieData);
  res.json({ movieData, userUUID});
}
)

export default router;
