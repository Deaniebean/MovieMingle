import express, { Request, Response, NextFunction } from "express";
import { discoverMovies } from "../controllers/movieController";
import Movie from "../models/mongooseMovies";
import { MovieType } from "../types/Movie";
import { User } from "../models/mongooseUsers";
import { ObjectId } from "mongodb";

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

router.delete("/delete/movie", async (req: Request, res: Response) => {
  const { movieId } = req.body;

  try {
    const movie = await Movie.findOne({ id: movieId });

    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }
    // remove movie from movie collection
    await Movie.deleteOne({ id: movieId });

    // Remove the movie's ObjectId from the watch_list
    await User.updateMany({}, { $pull: { watch_list: movie._id } });

    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

router.get("/movie/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findById(id);

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

router.put("/update/movie-rating", async (req: Request, res: Response) => {
  const { movieId, rating } = req.body;

  try {
    const movie = await Movie.findOne({ id: movieId });

    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }

    movie.rating = rating;
    await movie.save();

    res.json({ message: "Rating updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

router.get("/get/watchlist/:userUUID", async (req: Request, res: Response) => {
  const { userUUID } = req.params;

  try {
    const user = await User.findOne({ uuid: userUUID });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const moviePromises = user.watch_list.map(async (movieId) => {
      console.log(user.watch_list);
      return await Movie.findById(movieId);
    });

    const movies = await Promise.all(moviePromises);

    res.json(movies);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Can't get watchlist" });
  }
});

export default router;
