import './HistoryTemplate.css';
import IconActive from "../assets/DocumentaryActive.png";
import IconNotActive from "../assets/DocumentaryNotActive.png"

const handleDetailsClick = () => {
    //const navigateToDetails = () => {
      //window.location.href = "/details";
    //};
  };


const HistoryTemplate = () => {
  return (
    <div className="movie">
      <h1 className="TitleOfMovie">The Hangover The Hangover</h1>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/0e782bf0639fe32d1df0b8ed2c6a3c63dde681d5fe8de10db503b916487e2f5d?apiKey=7cf5fe238a5d469bbe141104f97b5fe0&"
        className="moviePoster"
        alt="Movie Poster"
      />
      <p className="rating">Your rating:</p>
      <div className="rating-icon-container">
      <div className="rating-icons">
        <img src={IconActive} alt="Star 1" className="rating-icon" />
        <img src={IconActive} alt="Star 2" className="rating-icon" />
        <img src={IconActive} alt="Star 3" className="rating-icon" />
        <img src={IconActive} alt="Star 4" className="rating-icon" />
        <img src={IconNotActive} alt="Star 5" className="rating-icon" />
      </div>
      </div>
      <button className="buttonDetails" onClick={handleDetailsClick}>More details</button>
    </div>
  );
};

export default HistoryTemplate;
