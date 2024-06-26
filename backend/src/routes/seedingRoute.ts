import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Movie from "../models/mongooseMovies";
import {User} from "../models/mongooseUsers";
import connectDB from "../config/db";

const router = express.Router();


// Function to add a movie _id to a user's watchlist
async function addToWatchlist(username: string, movieId: mongoose.Types.ObjectId) {
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      console.log("User not found.");
      return;
    }
    if (!user.watch_list.includes(movieId)) {
      user.watch_list.push(movieId);
      await user.save();
      console.log(`Movie _id: ${movieId} added to ${username}'s watchlist.`);
    } else {
      console.log(`Movie _id: ${movieId} is already in ${username}'s watchlist.`);
    }
  } catch (error) {
    console.error('Error adding movie to watchlist:', error);
  }
}

async function seedDatabase() {
  try {
    await connectDB();
  } catch (error) {
    console.error("Failed to connect to the database", error);
  }
  const movies = [
    {
      "_id":"667c4594bb2a17ecfd62ae95",
      "id": 1109527,
      "original_title": "Heroes of the Golden Masks",
      "original_language": "en",
      "overview": "Charlie, a wise-cracking, homeless, American orphan is magically transported to the ancient Chinese kingdom of Sanxingdui, where a colorful team of superheroes need his help to defend the city from a brutal conqueror. Charlie joins the heroes, and secretly schemes to steal the priceless golden masks that grant them their powers.",
      "genre": ["Animation", "Comedy", "Adventure"],
      "release_date": "2023-07-13",
      "poster_path": "https://image.tmdb.org/t/p/original/cFzHd71e1d82VYrhx0m0bxE9lrL.jpg",
      "vote_average": 7.6,
      "vote_count": 6,
      "trailer": "www.youtube.com/watch?v=undefined",
      "date": "2024-06-26T00:00:00.000+00:00",
      "rating": 0,
      "__v": 0
    }
  ];

  try {
    for (const movie of movies) {
      const existingMovie = await Movie.findOne({ id: movie.id.toString() });
      if (!existingMovie) {
        const newMovie = new Movie(movie);
        await newMovie.save();
        console.log(`Movie with _id: ${movie.id} added to the database.`);
        // Assuming addToWatchlist expects an ObjectId for the movie ID
        const movieObjectId = new mongoose.Types.ObjectId(movie._id);
        await addToWatchlist("testuser", movieObjectId);
        console.log(`Movie with _id: ${movie.id} added to testuser's watchlist.`);
      } else {
        // If the movie exists, ensure you're also converting the ID to ObjectId before adding to the watchlist
        const movieObjectId = new mongoose.Types.ObjectId(movie._id);
        await addToWatchlist("testuser", movieObjectId);
        console.log(`Movie with _id: ${movie.id} already exists. Skipping.`);
      }
    }
    console.log('Database seeding completed.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Directly invoke the seedDatabase function
seedDatabase();

export default seedDatabase;