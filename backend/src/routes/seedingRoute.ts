import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Movie from "../models/mongooseMovies"; 

const router = express.Router();

async function seedDatabase() {
  await mongoose.connect('mongodb://localhost:27017/moviemingle');
  const movies = [
    {
       
"_id":"66712deb867ab00c41aa5ef6",
"id": 394122,
"original_title":"Nature Morte",
"original_language":"fr",
"overview":"AUGUSTINE and MARTIN. No need of more protagonists; like Adam and Eve …",
"genre":Array (1),
"release_date":"2014-11-24",
"poster_path":"default poster",
"vote_average":0,
"vote_count":0,
"trailer":"www.youtube.com/watch?v=undefined",
"date": "2024-06-18T00:00:00.000+00:00",
"rating":0,
"__v":0
}]

  try {
    for (const movie of movies) {
      const newMovie = new Movie(movie);
      await newMovie.save();
    }
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

router.post("/seed/watchlist", async (req: Request, res: Response) => {
  await seedDatabase();
  res.send("Database seeded successfully");
});

export default router;


