import axios, { AxiosResponse, AxiosError } from 'axios';
import dotenv from 'dotenv';
dotenv.config();


// This is the POST from frontend filter page to the tmdb-api discover endpoint => params are added to GET request in the createOptions() function

/*  filters DISCOVER ENDPOINT: !!!choose Movie or TV show -> two different endpoints

    Genre: &with_genre => id hardcoded in src/genres.json file

    release years: &primary_release_date.gte= 2000-01-01&primary_release_date.lte=2010-12-31 = 2000-2010



    actors is tricky: &with_people:
    1.first post form input to endpoint /search/person?queryactor%30name -> if no match return "no match found"
    2. get results "results": ["id": 500]
    3. post the actors/producer id in the &with_people param in the discover endpoint

*/

const API_KEY = process.env.TMDB_API_KEY;
if (!API_KEY) {
  throw new Error('Missing environment variables');
}


// function for api request with params to avoid duplication
function createOptions(page: number) {
  return {
    method: 'GET',
    url: `https://api.themoviedb.org/3/discover/movie`,
    params: {
      include_adult: false,
      include_video: true,
      language: 'en-US',
      page,
      sort_by: 'popularity.desc',
      'primary_release_date.gte': '2000-01-01',
      'primary_release_date.lte': '2010-12-31',
      api_key: API_KEY,
    },
    headers: {
      accept: 'application/json',
    }
  };
}
export { createOptions };