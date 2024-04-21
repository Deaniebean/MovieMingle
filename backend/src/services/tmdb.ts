import axios, { AxiosResponse, AxiosError } from 'axios';
import dotenv from 'dotenv';
dotenv.config();


// This is for the POST from frontend filter page to the tmdb-api discover endpoint => params are added to GET request in the createOptions() function

/*

    Genre: &with_genre => id hardcoded in src/genres.json file

    release years: &primary_release_date.gte= 2000-01-01&primary_release_date.lte=2010-12-31 = 2000-2010

    actors is tricky: &with_people:
    1.first post form input to endpoint /search/person?query (function CreateOptionsPerson) -> if no match return "no match found"
    2. get results "results": ["id": 500]
    3. post the actors/producer id in the &with_people param in the discover endpoint

*/

const API_KEY = process.env.TMDB_API_KEY;
if (!API_KEY) {
  throw new Error('Missing environment variables');
}


// function for api request with params to avoid duplication
function createOptionsDiscover(page: number, genre: string[], years: string[], rounds: number, language: string) {
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/discover/movie`,
    params: {
      include_adult: false,
      include_video: true,
      with_genres: genre ? genre.join(','):undefined,
      with_original_language: language ? language.toLowerCase() : undefined,
      page,
      sort_by: 'popularity.desc',
      'primary_release_date.gte':  years && years.length > 0 ? years[0] : undefined,
      'primary_release_date.lte': years && years.length > 1 ? years[1] : undefined,
      api_key: API_KEY,
    },
    headers: {
      accept: 'application/json',
    }
  }
  console.log('Options:', options);
  return options;
}



export { createOptionsDiscover };

