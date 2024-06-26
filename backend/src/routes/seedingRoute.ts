import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Movie from "../models/mongooseMovies";
import {User} from "../models/mongooseUsers";

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
  const movies = [
    {
      "_id": Object("66712deb867ab00c41aa5ef6"),
      "id": 394122,
      "original_title": "Nature Morte",
      "original_language": "fr",
      "overview": "AUGUSTINE and MARTIN. No need of more protagonists; like Adam and Eve …",
      "genre": "Romance",
      "release_date": "2014-11-24",
      "poster_path": "default poster",
      "vote_average": 0,
      "vote_count": 0,
      "trailer": "www.youtube.com/watch?v=undefined",
      "date": "2024-06-18T00:00:00.000+00:00",
      "rating": 0,
      "__v": 0
    }
  ];

  try {
    for (const movie of movies) {
      const existingMovie = await Movie.findOne({ id: movie.id });
      if (!existingMovie) {
        const newMovie = new Movie(movie);
        await newMovie.save();
        console.log(`Movie with _id: ${movie._id} added to the database.`);
        // Add the movie _id to a specific user's watchlist after adding it to the database
        await addToWatchlist("testuser", movie._id); // Replace "testuser" with the actual username
      } else {
        console.log(`Movie with _id: ${movie._id} already exists. Skipping.`);
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