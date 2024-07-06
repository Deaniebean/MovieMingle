import mongoose from "mongoose";
import Movie from "../models/mongooseMovies";
import {User} from "../models/mongooseUsers";
import connectDB from "../config/db";

const addToWatchlist = async (username: string, movieId: mongoose.Types.ObjectId) => {
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
      "_id": "667400a8d747db7840752881",
      "id": 1441,
      "original_title": "The Contract",
      "original_language": "en",
      "overview": "Attempting to recover from a recent family trauma by escaping into the woods for a peaceful hiking trip, an ex-lawman and his young son stumble across a dangerous contract killer.",
      "genre": ["Drama", "Action", "Thriller", "Crime"], 
      "release_date": "2006-04-05",
      "poster_path": "https://image.tmdb.org/t/p/original/sU2yzV3T1LetBdQPAeBRDb4YwLo.jpg",
      "vote_average": 5.7,
      "vote_count": 487,
      "trailer": "www.youtube.com/watch?v=lFELOkQbHDc",
      "date": "2024-06-20T00:00:00.000+00:00",
      "rating": 0,
      "__v": 0
    },
      {
        "_id":  "667400acd747db7840752885",
        "id": 308529,
        "original_title": "Kickboxer: Vengeance",
        "original_language": "en",
        "overview": "Eric and Kurt Sloane are the descendants of a well-known Venice, California-based family of martial artists. Kurt has always been in older brother, Eric's shadow, as he lacks the instincts needed to become a champion. Against Kurt's concerns, Eric accepts a paid offer and travels to Thailand to challenge the Muay Thai champion Tong Po and fails with dire consequences. Kurt sets out for revenge. He trains with his brother's mentor, Master Durand, for a Muay Thai fight against the merciless champion, Tong Po. Durand first thinks Kurt is impossible to train, but through a series of spiritual exercises and tests, Durand discovers that Kurt has a deeper strength that will carry him through his final showdown with Tong Po.",
        "genre": ["Drama", "Action"], 
        "release_date": "2016-07-14",
        "poster_path": "https://image.tmdb.org/t/p/original/9suFyXDE1MhZ8I8tuhmTd0fJ7G8.jpg",
        "vote_average": 5.02,
        "vote_count": 392,
        "trailer": "www.youtube.com/watch?v=kYxarObwhnA",
        "date": "2024-06-20T00:00:00.000Z",
        "rating": 0,
        "__v": 0
    },
    { 
        "_id": "667403f0d747db78407528ac",
        "id": 138544,
        "original_title": "American Horror House",
        "original_language": "en",
        "overview": "On Halloween night, a sorority house is overrun with ghosts, while a vengeful housemother goes on a killing spree.",
        "genre": ["Horror"], 
        "release_date": "2012-10-13",
        "poster_path": "https://image.tmdb.org/t/p/original/sZzJwqbrfKvGXTIhXGDwlJUEtM5.jpg",
        "vote_average": 6.2,
        "vote_count": 32,
        "trailer": "www.youtube.com/watch?v=undefined",
        "date": "2024-06-20T00:00:00.000Z",
        "rating": 0,
        "__v": 0
    },
    { 
        "_id": "667403f7d747db78407528bb",
        "id": 262841,
        "original_title": "Monster Trucks",
        "original_language": "en",
        "overview": "Tripp is a high school senior with a knack for building trucks who makes an incredible discovery - a gas-guzzling creature named Creech. To protect his mischievous new friend, Tripp hides Creech under the hood of his latest creation, turning it into a real-life super-powered Monster Truck. Together, this unlikely duo with a shared taste for speed team up on a wild and unforgettable journey to reunite Creech with his family.",
        "genre": ["Action", "Comedy", "Science Fiction" ],
        "release_date": "2016-12-21",
        "poster_path": "https://image.tmdb.org/t/p/original/aUzNybWqURfeg9BveLr4GOVCkti.jpg",
        "vote_average": 6.086,
        "vote_count": 817,
        "trailer": "www.youtube.com/watch?v=Pu_7ii0T7-Y",
        "date": "2024-06-20T00:00:00.000Z",
        "rating": 0,
        "__v": 0
    },
    {
        "_id": "66850e1332dea225c77d3911",
        "id": 815066,
        "original_title": "karen don't be sad",
        "original_language": "en",
        "overview": "Noki, a 17-year-old girl, spends her days in isolation due to Covid-19. Staying at home forces her to deal with tensions between her family members and especially between her father who rarely devotes much time to her.",
        "genre": ["Music", "Family", "Drama" ],
        "release_date": "2021-04-05",
        "poster_path": "https://image.tmdb.org/t/p/original/cemOV7lo93Xb4CLt1JNUz9iFoDn.jpg",
        "vote_average": 10,
        "vote_count": 1,
        "trailer": "www.youtube.com/watch?v=undefined",
        "date": "2024-07-03T00:00:00.000Z",
        "rating": 0,
        "__v": 0
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