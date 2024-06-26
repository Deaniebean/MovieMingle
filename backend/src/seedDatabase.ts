import mongoose from "mongoose";
import Movie from "./models/mongooseMovies";

async function seedDatabase() {
  const movies = [
    {
      "_id": "66712deb867ab00c41aa5ef6",
      "id": 394122,
      "original_title": "Nature Morte",
      "original_language": "fr",
      "overview": "AUGUSTINE and MARTIN. No need of more protagonists; like Adam and Eve …",
      "genre": ["Array (1)"], // Ensure this is correctly formatted as an array
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
      const existingMovie = await Movie.findOne({ _id: movie._id });
      if (!existingMovie) {
        const newMovie = new Movie(movie);
        await newMovie.save();
        console.log(`Movie with _id: ${movie._id} added to the database.`);
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