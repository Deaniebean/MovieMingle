// This model is created to simplify testing my functions in isiolation from the database
interface MovieModel{
    original_title: string,
    overview: string,
    genre: string[], // convert id numbers to strings before adding to model
    release_date: string;
    poster_path: string | "",
    vote: Number,
    vote_count: Number,
    trailer: string,
    date: Date,
    rating: Number

}
export default MovieModel;