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

router.get(
  "/discover/movies/random",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const genre = req.query.genre as string[];
      const years = req.query.years as string[];
      const rounds = Number(req.query.rounds);
      const language = req.query.language as string;

      const movies = await discoverMovies(genre, years, rounds, language);
      res.json(movies);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.get("/movies", async (req: Request, res: Response) => {
  try {
    const movies = await discoverMovies(
      req.query.genre as string[],
      req.query.years as string[],
      req.query.rounds as unknown as number,
      req.query.language as string
    );
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching movies" });
  }
});

export default router;
