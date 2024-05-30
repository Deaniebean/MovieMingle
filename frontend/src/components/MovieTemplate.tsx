import "./MovieTemplate.css";

const MovieTemplate = () => {
  return (
    <div className="movie">
      <h1 className="TitleOfMovie">The Hangover The Hangover</h1>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/0e782bf0639fe32d1df0b8ed2c6a3c63dde681d5fe8de10db503b916487e2f5d?apiKey=7cf5fe238a5d469bbe141104f97b5fe0&"
        className="moviePoster"
        alt="Movie Poster"
      />
      <p className="dateAdded">Added on: 18.04.24</p>
      <button className="buttonTrailer">Watch trailer now</button>
      <button className="buttonDetails">More details</button>
    </div>
  );
};

export default MovieTemplate;