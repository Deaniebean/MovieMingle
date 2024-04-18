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


// extra function for params to avoid duplication
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

// this functions main purpose is to get the total number of pages for the input params and then call the discoverRandomMovies() function
async function discoverMovies() {
  const options = createOptions(1);

  try {
    const response = await axios.request(options);
    console.log('Total pages:', response.data.total_pages);
    await discoverRandomMovies(response.data.total_pages);
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
}



// This function is necessary to randomize the page number for the discoverMovies() function, otherwise the movie results will always be the same
async function discoverRandomMovies(totalPages: number) {
  const randomPage = Math.floor(Math.random() * Math.min(totalPages, 500)) + 1;
  const options = createOptions(randomPage);

  try {
    const response = await axios.request(options);
    console.log('Random page:', randomPage);
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
}




export { createOptions, discoverMovies, discoverRandomMovies };
