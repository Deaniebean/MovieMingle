import express, { Request, Response, NextFunction } from "express";
import {
  discoverMovies,
} from "../controllers/movieController";
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
    await movie.save()

    const user = await User.findOne({ uuid: userUUID})

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  user.watch_list.push(movie._id);
  await user.save();


  res.json({ movieData, userUUID});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
})

export default router;
