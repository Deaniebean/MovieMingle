import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Movie } from '../types/MovieType';
import { Genre } from '../types/GenreType';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import genreData from '../genre.json';
import axios from 'axios';

<<<<<<< HEAD
import './Winner.css';

=======
import './MovieDetailView.css';
>>>>>>> 08db324b06a9b57d8f1db37a03643c96fa78fec1

const Winner: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movie: Movie = location.state?.movie;
  const [cookies] = useCookies(['UUID']);
  const [modalOpen, setModalOpen] = useState(false);
  const userUUID = cookies.UUID;

  function getGenreNames(genreIds: number[]): string[] {
    return genreIds.map((id) => {
      const genre = genreData.genres.find((genre: Genre) => genre.id === id);
      console.log(genre ? genre.name : '');
      return genre ? genre.name : '';
    });
  }

<<<<<<< HEAD

  const getYouTubeEmbedUrl = (key: string) => {
    return `https://www.youtube.com/embed/${key}`;
  };

  const openTrailer = () => {
    if (movie.videos && movie.videos[0]) {
      setModalOpen(true);
    } 
    else {
      console.error('No trailer available');
    }
  };


=======
  // Only working with url from our API
  // Need to rewrite to use movie.videos[0].key
  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1];
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      return `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`;
    }
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const openTrailer = () => {
    if (movie.videos[0]) {
      setModalOpen(true);
    } else {
      console.error('No trailer URL available');
    }
  };

>>>>>>> 08db324b06a9b57d8f1db37a03643c96fa78fec1
  async function addToWatchList() {
    // const movie = movies[index];
    const poster_path = movie.poster_path
      ? 'https://image.tmdb.org/t/p/original' + movie.poster_path
      : 'default poster';
<<<<<<< HEAD
    const trailer = movie.videos && movie.videos[0]
=======
    const trailer = movie.videos
>>>>>>> 08db324b06a9b57d8f1db37a03643c96fa78fec1
      ? 'www.youtube.com/watch?v=' + movie.videos[0]?.key
      : null;
    const date = new Date(Date.now()).toISOString().slice(0, 10);
    const rating = 0;
<<<<<<< HEAD

=======
    console.log(userUUID);
>>>>>>> 08db324b06a9b57d8f1db37a03643c96fa78fec1

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

  return (
    <div>
      <h1 className="p-6 border">nav</h1>
      <div className="px-14 mt-14 grid justify-items-center md:container mx-auto">
        <p className="mb-1 md:text-xl">The winner is...</p>
<<<<<<< HEAD
        <p className="text-3xl md:text-6xl font-bold mb-4 text-center">{movie.original_title}</p>
=======
        <p className="text-3xl md:text-6xl font-bold mb-4">{movie.original_title}</p>
>>>>>>> 08db324b06a9b57d8f1db37a03643c96fa78fec1

        <div className="md:flex md:mt-10">
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              className="object-cover w-80"
            />
          ) : (
            <img src="path/to/default/image.jpg" />
          )}
          <div className='ps-10'>
              <p className="hidden md:block md:text-lg">{movie.overview}</p>
<<<<<<< HEAD
              {movie.videos && movie.videos[0] && (
                <>
                   <button
                className="movie-detail-trailer-button"
                type="submit"
                onClick={openTrailer}
              > Open Trailer
              </button>

             {modalOpen && (
                <div className="modal">
                  <div className="modal-content">
                    <button
                      className="close-button " 
                      onClick={() => setModalOpen(false)}
                    >
                      Close Trailer
=======
              <button
                className="movie-detail-trailer-button"
                type="submit"
                onClick={openTrailer}
              >
                open trailer Trailer
              </button>
              {modalOpen && (
                <div className="modal">
                  <div className="modal-content">
                    <button
                      className="close-button"
                      onClick={() => setModalOpen(false)}
                    >
                      open trailer
>>>>>>> 08db324b06a9b57d8f1db37a03643c96fa78fec1
                    </button>
                    <iframe
                      width="560"
                      height="315"
                      src={getYouTubeEmbedUrl(movie.videos[0]?.key)}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
<<<<<<< HEAD
              </>
            )}

              <button
                className="movie-detail-addtolist"
                type="submit"
                onClick={addToWatchList}
              >
                Add to watchlist
              </button>
              <p
                className="movie-detail-select"
                onClick={() => navigate('/select')}
              >
                Go to select filter
=======
              <button
                className="movie-detail-remove-button"
                type="submit"
                onClick={addToWatchList}
              >
                add to watchlist
              </button>
              <p
                className="movie-detail-remove-button"
                onClick={() => navigate('/select')}
              >
                go to select filter
>>>>>>> 08db324b06a9b57d8f1db37a03643c96fa78fec1
              </p>
          </div>
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}; 

export default Winner;
              
=======
};

export default Winner;
>>>>>>> 08db324b06a9b57d8f1db37a03643c96fa78fec1
