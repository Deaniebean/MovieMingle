import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Movie } from '../types/MovieType'; // Replace './path/to/MovieType' with the actual path to the MovieType interface
import React from 'react';

import { Button } from "@material-tailwind/react";

interface Props {
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const InputFieldsMovie: React.FC<Props> = ({ setMovies }) => {
  const [genre, setGenre] = useState<number[]>([]);
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [rounds, setRounds] = useState('6');
  const [language, setLanguage] = useState('en');
  const navigate = useNavigate();

  const onChangeYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const startYear = `${e.target.value}-01-01`;
    const endYear = `${parseInt(e.target.value) + 9}-12-31`;
    setStartYear(startYear);
    setEndYear(endYear.toString());
  };

  const queryParams = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const genreParams = genre; //Array with genres
    const yearsParams = [startYear, endYear]; // Array[start_year, end_year]
    const roundsParams = parseInt(rounds);
    const languageParams = language; //Number of rounds
    console.log('genre:', genreParams);
    console.log('years:', yearsParams);
    console.log('rounds:', roundsParams);
    console.log('language:', languageParams);

    try {
      const response = await axios.post(
        'http://localhost:8082/discover/movies',
        {
          genre: genreParams,
          years: yearsParams,
          language: languageParams,
          rounds: roundsParams,
        }
      );

      console.log('Success:', response.data);
      setMovies(response.data);
      navigate('/this-or-that');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Button>Button</Button>
      <form onSubmit={queryParams}>
        <label>
          Genre
          <select
            name="genre"
            value={genre.map(String)}
            multiple
            onChange={(e) =>
              setGenre(
                Array.from(e.target.selectedOptions, (option) =>
                  parseInt(option.value)
                )
              )
            }
          >
            <option value="28">Action</option>
            <option value="12">Adventure</option>
            <option value="16">Animation</option>
            <option value="35">Comedy</option>
            <option value="80">Crime</option>
            <option value="99">Documentary</option>
            <option value="18">Drama</option>
            <option value="10751">Family</option>
            <option value="14">Fantasy</option>
            <option value="36">History</option>
            <option value="27">Horror</option>
            <option value="10402">Music</option>
            <option value="9648">Mystery</option>
            <option value="10749">Romance</option>
            <option value="878">Science Fiction</option>
            <option value="10770">TV Movie</option>
            <option value="53">Thriller</option>
            <option value="10752">War</option>
            <option value="37">Western</option>
          </select>
        </label>
        <br />
        <label>
          Years
          <select name="years" value={startYear} onChange={onChangeYear}>
            <option value="1970">1970s</option>
            <option value="1980">1980s</option>
            <option value="1990">1990s</option>
            <option value="2000">2000s</option>
            <option value="2010">2010s</option>
            <option value="2020">2020s</option>
          </select>
        </label>
        <br />
        <select
          name="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="de">German</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
        <br />
        <label>
          Round length
          <select
            name="rounds"
            value={rounds}
            onChange={(e) => setRounds(e.target.value)}
          >
            <option value="6">6 Movies</option>
            <option value="12">12 Movies</option>
            <option value="18">18 Movies</option>
          </select>
        </label>
        <br />

        <button type="submit">Start</button>
      </form>
    </div>
  );
};
export default InputFieldsMovie;
