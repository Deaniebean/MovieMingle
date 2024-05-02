import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-range-slider-input/dist/style.css';
import '../styles/filterSlider.css';
import '../styles/globals.css';



import { Movie } from '../pratice_fetches/MovieType'; // Replace './path/to/MovieType' with the actual path to the MovieType interface

// Components
import {
  Checkbox,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
  Select,
  Option,
  Radio,
} from '@material-tailwind/react';

import Slider from '@mui/material/Slider';

interface Props {
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const InputFieldsMovie: React.FC<Props> = ({ setMovies }) => {
  const [genre, setGenre] = useState<number[]>([]);
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [yearSlider, setYearSlider] = useState<number[]>([1990, 2024]);
  const [rounds, setRounds] = useState('6');
  const [language, setLanguage] = useState('en');
  const navigate = useNavigate();

  const onChangeYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Setting decade range e.g 1970's = 1970-1979
    const startYear = `${e.target.value}-01-01`;
    const endYear = `${parseInt(e.target.value) + 9}-12-31`; // Possible use for a slider, manually select date range instead
    setStartYear(startYear);
    setEndYear(endYear.toString());
  };

  const queryParams = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const genreParams = genre; //Array with genres
    // const yearsParams = [startYear, endYear]; // Array[start_year, end_year]
    const yearsParams = [`${yearSlider[0]}-01-01`, `${yearSlider[1]}-12-31`]; // Array[start_year, end_year]
    const roundsParams = parseInt(rounds); //Number of rounds
    const languageParams = language;
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
      // setMovies(response.data);
      // navigate('/this-or-that');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onGenreChange = (e) => {
    // What type to define e as?
    // Add new genre to array, remove if unselected
    e.target.checked
      ? setGenre((genre) => [...genre, e.target.value])
      : setGenre((genre) => genre.filter((genre) => genre !== e.target.value));
  };

  const onYearChange = (event: Event, newValue: number | number[]) => {
    setYearSlider(newValue as number[]);
  };

  const onRoundChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setRounds((event.target as HTMLInputElement).value);
    setRounds(event.target.value);
    // console.log(rounds)
  };

  //  Defining genres
  const genreList = [
    { id: 28, label: 'Action' },
    { id: 12, label: 'Adventure' },
    { id: 16, label: 'Animation' },
    { id: 35, label: 'Comedy' },
    { id: 80, label: 'Crime' },
    { id: 99, label: 'Documentary' },
    { id: 18, label: 'Drama' },
    { id: 10751, label: 'Family' },
    { id: 14, label: 'Fantasy' },
    { id: 36, label: 'History' },
    { id: 27, label: 'Horror' },
    { id: 10402, label: 'Music' },
    { id: 9648, label: 'Mystery' },
    { id: 10749, label: 'Romance' },
    { id: 878, label: 'Science Fiction' },
    { id: 10770, label: 'TV Movie' },
    { id: 10752, label: 'War' },
    { id: 37, label: 'Western' },
  ].map((genre, index) => {
    return (
      <ListItem
        className="p-0 max-w-fit rounded-full border border-secondary py-2 px-3"
        key={index}
      >
        <label className="flex cursor-pointer items-center">
          <ListItemPrefix className="mr-2">
            <Checkbox
              value={genre.id}
              ripple={false}
              color="gray"
              onChange={onGenreChange}
              className="hover:before:opacity-0 rounded-full border-secondary"
              containerProps={{
                className: 'p-0',
              }}
            />
          </ListItemPrefix>
          {/* <p className="font-medium pe-1">{genre.label}</p> */}
          <Typography
            color="blue-gray"
            variant="small"
            className="font-main pe-1 text-secondary"
          >
            {genre.label}
          </Typography>
        </label>
      </ListItem>
    );
  });

  const roundList = [
    { value: '6', text: 'Minor Showdown' },
    { value: '12', text: 'Intense Duel' },
    { value: '18', text: 'Epic Battle' },
  ].map((round, i) => {
    return (
      <ListItem key={i} className="p-0">
        <label className="flex w-full cursor-pointer items-center px-3 py-2">
          {/* Hides radio button circle on mobile */}
          <ListItemPrefix className="mr-3 hidden md:inline">
            <Radio
              value={round.value}
              name="horizontal-list"
              id="horizontal-list-react"
              ripple={false}
              className="hover:before:opacity-0"
              containerProps={{
                className: 'p-0',
              }}
              onChange={onRoundChange}
            />
          </ListItemPrefix>
          <div className="items-center">
            <Typography
              color="blue-gray"
              className="font-medium text-blue-gray-400"
            >
              {round.text}
            </Typography>
            <Typography
              color="blue-gray"
              className="font-medium text-blue-gray-400"
            >
              {round.value} Movies
            </Typography>
          </div>
        </label>
      </ListItem>
    );
  });

  // Marks for year slider
  const yearMarks = [
    {
      value: 1970,
      label: '1970',
    },
    {
      value: 1980,
      label: '1980',
    },
    {
      value: 1990,
      label: '1990',
    },
    {
      value: 2000,
      label: '2000',
    },
    {
      value: 2010,
      label: '2010',
    },
    {
      value: 2020,
      label: '2020',
    },
  ];

  return (
    <div className='bg-primary text-secondary'>
      <form onSubmit={queryParams}>
        <h2>Genres</h2>
        {/* Map over all Genres */}
        <div className="flex flex-wrap gap-x-3 gap-y-2 ">{genreList}</div>

        <h2>Language</h2>
        <div className="w-72">
          <Select
            name="lanuage"
            label="Language"
            value={language}
            onChange={(val) => setLanguage(val as string)}
          >
            <Option value="en">English</Option>
            <Option value="de">German</Option>
            <Option value="es">Spanish</Option>
            <Option value="fr">French</Option>
          </Select>
        </div>

        <h2>Select Round</h2>
        <List className="flex-row">{roundList}</List>
        <h2>Release year</h2>
        <label>
          Years
          <Slider
            getAriaLabel={() => 'Release Date'}
            defaultValue={30}
            value={yearSlider}
            onChange={onYearChange}
            // getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            shiftStep={30}
            step={5}
            marks={yearMarks}
            min={1970}
            max={2024}
          />
        </label>
        <button type="submit">Start</button>
      </form>
    </div>
  );
};
export default InputFieldsMovie;
