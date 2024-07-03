import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Movie from "../models/mongooseMovies";
import {User} from "../models/mongooseUsers";
import connectDB from "../config/db";

const router = express.Router();


async function addToWatchlist(username: string, movieId: mongoose.Types.ObjectId) {
  try {
    let user = await User.findOne({ username: username });
    if (!user) {
      console.log("User not found. Creating user...");
      user = new User({
        _id: "667c6c85164819c51688fd04", 
        uuid: "3f170a97-2b27-4569-b3fc-0a7a275a3cfd",
        username: "testuser",
        password: "$2a$10$S/Xu42Mm/qoA.xL3w661zO/MPSdOqaJ5HvmkWcmn3Ob53k6ytPcLe" 
      });
    
      await user.save(); 
      console.log("User created successfully:", user);
    }
    // Initialize watch_list if it doesn't exist
    if (!user.watch_list) {
      user.watch_list = [];
    }
    // Add movieId to watch_list if not already present
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
    }, 
    { 
      "_id": "6684125514aed8db21ab5b3b",
      "id": 1205832, 
      "original_title": "Macbeth: the death of Duncan", 
      "original_language": "en",
      "overview": "Left alone, Macbeth imagines that he sees a gory dagger leading him to Duncan's room. Our scene begins here.", 
      "genre": ["Action", "Adventure", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "History", "Horror", "Mystery", "Romance", "Thriller"], 
      "release_date": "2018-06-02", 
      "poster_path": "https://image.tmdb.org/t/p/original/oDBxyFEgZ70fuxhpBL9mQABmomh.jpg",
      "vote_average": 8, 
      "vote_count": 2
    },
    { 
      "_id": "668411d414aed8db21ab5b28", 
      "id": 619999, 
      "original_title": "Bitter Rivals: Iran and Saudi Arabia", 
      "original_language": "en", 
      "overview": "Bitter Rivals illuminates the essential history - and profound ripple effect - of Iran and Saudi Arabia's power struggle. It draws on scores of interviews with political, religious and military leaders, militia commanders, diplomats, and policy experts, painting American television's most comprehensive picture of a feud that has reshaped the Middle East.", 
      "genre": ["DocumentaryTV", "Movie"], 
      "release_date": "2018-02-27", 
      "poster_path": "https://image.tmdb.org/t/p/original/4HgJvstUDm32xH4BJhdveSsO7xP.jpg", 
      "vote_average": 10, 
      "vote_count": 2
    },
    { 
      "_id": "667bbb5823ed207d43f71886", 
      "id": 945981, 
      "original_title": "Joey: The Movie", 
      "original_language": "en", 
      "overview": "When John Smith loses his joey in a tragic accident, he goes off to exact revenge on the people who ruined his funeral.", 
      "genre": ["Action", "Comedy", "Adventure", "Crime", "Drama", "Family", "History", "Horror", "Romance", "Thriller"],
      "release_date": "2017-08-06", 
      "poster_path": "https://image.tmdb.org/t/p/original/2z3GEAuEjpx4mzOFJTM9SCKMAH0.jpg", 
      "vote_average": 10, 
      "vote_count": 1
    },
    { 
      "_id": "667c4594bb2a17ecfd62ae95", 
      "id": 1109527, 
      "original_title": "Heroes of the Golden Masks", 
      "original_language": "en", 
      "overview": "Charlie, a wise-cracking, homeless, American orphan is magically transported to the ancient Chinese kingdom of Sanxingdui, where a colorful team of superheroes need his help to defend the city from a brutal conqueror. Charlie joins the heroes, and secretly schemes to steal the priceless golden masks that grant them their powers.", 
      "genre": ["Animation", "Comedy", "Adventure"], 
      "release_date": "2023-07-13", 
      "poster_path": "https://image.tmdb.org/t/p/original/cFzHd71e1d82VYrhx0m0bxE9lrL.jpg", 
      "vote_average": 7.6, 
      "vote_count": 6
    },
    {
      "_id": "66797c32f4dfa38e828ee2f1", 
      "id": 765772, 
      "original_title": "The Day of the Coyote", 
      "original_language": "en", 
      "overview": "In a garret overlooking the main square, a professional hitman awaits a very important target. He coldly, efficiently, snaps together the pieces of his sniper rifle.But there’s a screw missing. Time for the universe to have some fun.", 
      "genre": ["Action", "Adventure", "Comedy", "Crime", "Drama", "Family", "Thriller"], 
      "release_date": "2020-11-06", 
      "poster_path": "https://image.tmdb.org/t/p/original/AgoXb57zD1lrC2yzS0Z3iJr9bd9.jpg", 
      "vote_average": 0, 
      "vote_count": 0 
    },
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
        // If the movie exists, convert ID to ObjectId before adding to the watchlist
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

seedDatabase();

export default seedDatabase;