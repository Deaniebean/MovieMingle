import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  original_title: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  genre: {
    type: [String],
  },
  release_date: {
    type: String,
    required: true,
  },
    poster_path: {
        type: String,
        required: false,
    },
    vote_average: {
        type: Number,
        required: false,
    },
    vote_count:  {
        type: Number,
        required: false,
    },
    trailer: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now
    },
    rating: {
        type: Number,
        default: null,
    }
  }
);
const Movie = mongoose.model('Movie', MovieSchema);
export default Movie;