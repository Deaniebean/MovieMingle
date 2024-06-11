// This model is created to simplify testing my functions in isiolation from the database
interface MovieModel{
    _id: string,
    id: string,
    original_title: string,
    overview: string,
    genre: string[], // convert id numbers to strings before adding to model
    release_date: string;
    poster_path: string | "",
    vote: number, // Number threw error
    vote_count: number,
    trailer: string,
    date: Date,
    rating: number

}
export default MovieModel;