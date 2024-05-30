import express, { Request, Response, NextFunction } from "express";
import { discoverMovies } from "../controllers/movieController";
import Movie from "../models/mongooseMovies";
import { MovieType } from "../types/Movie";
import { User } from "../models/mongooseUsers";

const router = express.Router();
let movies: MovieType[] = [];
router.post("/discover/movies", async (req, res) => {
  const { genre, years, rounds, language } = req.body;
  console.log("genre:", genre);
  console.log("years:", years);
  console.log("rounds:", rounds);
  console.log("language:", language);

  movies = await discoverMovies(genre, years, rounds, language);
  res.json(movies);
});

router.post("/save/watchlist", async (req: Request, res: Response) => {
  const { movieData, userUUID } = req.body;
  console.log("movieData:", movieData);

  const movie = new Movie(movieData);

  try {
    await movie.save();

    const user = await User.findOne({ uuid: userUUID });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user.watch_list.push(movie._id);
    await user.save();

    res.json({ movieData, userUUID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

router.delete("/delete/watchlist", async (req: Request, res: Response) => {
  const { movieId, userUUID } = req.body;

  try {
    const user = await User.findOne({ uuid: userUUID });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Remove the movie from the watchlist
    const index = user.watch_list.indexOf(movieId);
    if (index > -1) {
      user.watch_list.splice(index, 1);
    }

    await user.save();

    res.json({ movieId, userUUID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

router.get("/movie/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findOne({ movieId: id });

    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }

    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

export default router;
