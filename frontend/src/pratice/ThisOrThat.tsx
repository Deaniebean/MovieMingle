import React, { useEffect, useState } from 'react';
import { Movie } from '../types/MovieType';
import { Genre } from '../types/GenreType';
import './ThisOrThat.css';
import genreData from '../genre.json';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

interface Props {
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}



const ThisOrThat: React.FC<Props> = ({ movies, setMovies }): React.ReactNode => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['UUID']);
  const userUUID = cookies.UUID;

  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [videoKey, setVideoKey] = useState("");

  
  
  function getGenreNames(genreIds: number[]): string[] {
    return genreIds.map((id) => {
      const genre = genreData.genres.find((genre: Genre) => genre.id === id);
      return genre ? genre.name : '';
    });
  }


  function openTrailer(key: string) {
    setVideoKey(key);
    setModalOpen(true);
  }


  const chooseMovie = (chosenIndex: number) => {
    // Create a copy of the movies array
    let newMovies = [...movies];
  
    // Find the index of the unchosen movie in the newMovies array
    const unchosenMovie = movies[chosenIndex === index1 ? index2 : index1];
    const unchosenIndex = newMovies.findIndex(movie => movie.original_title === unchosenMovie.original_title);

    // Remove the unchosen movie from the array
    console.log('Unchosen index:', unchosenIndex);
    newMovies.splice(unchosenIndex, 1);
  
    // If there's only one movie left, we have a winner
    if (newMovies.length === 1) {
      console.log('Winner:', newMovies[0]);
      navigate('/winner', {state: { movie: newMovies[0] }});
      return;
    }
  
  // Choose the next two movies in the array for the next round
  //condition to keep chosen movies in the same spot as previous round
  let newIndex1, newIndex2;
  if (chosenIndex === index1) {
    newIndex1 = 0;
    newIndex2 = 1 % newMovies.length;
  } else {
    newIndex1 = 1 % newMovies.length;
    newIndex2 = (newIndex1 + 1) % newMovies.length;
  }

  // Update state
  setIndex1(newIndex1);
  setIndex2(newIndex2);
  setMovies(newMovies);
};

  



  async function addToWatchList (index: number) {
    const movie = movies[index];
    const poster_path = movie.poster_path
      ? "https://image.tmdb.org/t/p/original" + movie.poster_path
      : 'default poster';
    const trailer = movie.videos
      ? 'www.youtube.com/watch?v=' + movie.videos[0].key
      : null;
    const date = new Date(Date.now()).toISOString().slice(0, 10);
    const rating = 0
     console.log(userUUID)

    const movieData = {
      id: movie.id,
      original_title: movie.original_title,
      original_language: movie.original_language,
      overview: movie.overview,
      genre: getGenreNames(movie.genre_ids),
      release_date: movie.release_date,
      poster_path,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
      trailer,
      date,
      rating,
    };

    const configuration = {
      method: 'post',
      url: 'http://localhost:8082/save/watchlist',
      data: {
        movieData,
        userUUID,
      },

    };

    try {
      const response = await axios(configuration);
      console.log(response);
    } catch (error) { 
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log('Error response data:', error.response.data);
          console.log('Error response status:', error.response.status);
          console.log('Error response headers:', error.response.headers);
        } else if (error.request) {
          console.log('Error request:', error.request);
        } else {
          console.log('Error message:', error.message);
        }
        console.log('Error config:', error.config);
      }
    }

  }

  useEffect(() => {
    console.log('Movies:', movies);
  }, [movies]);

  console.log('Movies:', movies);

  return (
    <div>
      <div className="this" >
        {movies[index1] && (
          <div >
            <h2>{movies[index1].original_title}</h2>
            <div className="img-container">
            <img src={movies[index1].poster_path ? `https://image.tmdb.org/t/p/original${movies[index1].poster_path}` : 'path/to/default/image.jpg'} />
            </div>
            <p>{movies[index1].overview}</p>
            <button onClick = {() => chooseMovie(index1)}>This</button>

            <br/>
            <button onClick={() => addToWatchList( index1)}>
              + Add to watch list
            </button>
            <br/>
            
            <button onClick={()=> 
               (movies[index1].videos && movies[index1].videos[0])?
              (openTrailer(movies[index1].videos[0].key)
            ):("disabled Button style")}>
              Trailer
            </button>
          </div>
        )}
      </div>
      <div className="that">
        {movies[index2] && (
          <div>
            <h2>{movies[index2].original_title}</h2>
            <div className="img-container">
            <img src={movies[index2].poster_path ? `https://image.tmdb.org/t/p/original${movies[index2].poster_path}` : 'path/to/default/image.jpg'} />
            </div>
            <p>{movies[index2].overview}</p>
            <button onClick = {() => chooseMovie(index2)}>That</button>
            <br/>
            <button onClick={() => addToWatchList(index2)}>
              + Add to watch list
            </button>
            <br/>
            <button onClick={()=> openTrailer(movies[index2].videos[0].key)}>Trailer</button>
          </div>
        )}
      </div>
      {modalOpen && (
  <div className="modal">
    <button onClick={() => setModalOpen(false)}>Close</button>
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${videoKey}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
)}
    </div>
  );
};

export default ThisOrThat;
