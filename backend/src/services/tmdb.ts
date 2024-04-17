import axios, { AxiosResponse, AxiosError } from 'axios';
import dotenv from 'dotenv';
dotenv.config();

async function getMovies() {
  const API_KEY = process.env.TMDB_API_KEY;
  return axios.get(`https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${API_KEY}`)
  .then((response: AxiosResponse) => {
    console.log(response.data.results);
    return response.data.results;
  })
  .catch((error: AxiosError) => {
    console.error('Error:', error);
    throw error;
  });
}

export {  getMovies};