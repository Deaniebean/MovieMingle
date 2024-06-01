import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/filterSlider.css';
import '../styles/globals.css';

import { Movie } from '../types/MovieType'; // Replace './path/to/MovieType' with the actual path to the MovieType interface

// Components
import {
  Checkbox,
  ListItem,
  ListItemPrefix,
  Typography,
  // Button,
} from '@material-tailwind/react';
import FilterSeparator from './innerComponents/FilterSeparator';
import NavTemp from './innerComponents/NavTemp';
import Slider from '@mui/material/Slider'; // Working despite 'cannot find module' error
import Button from './innerComponents/Button';

interface Props {
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const InputFieldsMovie: React.FC<Props> = ({ setMovies }) => {
  const [genre, setGenre] = useState<string[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [yearSlider, setYearSlider] = useState<number[]>([1990, 2024]);
  const [rounds, setRounds] = useState('6');
  const [language, setLanguage] = useState('en');
  const navigate = useNavigate();

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
      setMovies(response.data);
      navigate('/this-or-that');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // What type to define e as?
    // Add new genre to array, remove if unselected
    e.target.checked
      ? setGenre((genre) => [...genre, e.target.value])
      : setGenre((genre) => genre.filter((genre) => genre !== e.target.value));
  };

  const onYearChange = (event: Event, newValue: number | number[]) => {
    setYearSlider(newValue as number[]);
  };

  // const onChangeYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   // Setting decade range e.g 1970's = 1970-1979
  //   const startYear = `${e.target.value}-01-01`;
  //   const endYear = `${parseInt(e.target.value) + 9}-12-31`; // Possible use for a slider, manually select date range instead
  //   setStartYear(startYear);
  //   setEndYear(endYear.toString());
  // };

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
      // Hover on desktop only, min -1024px
      <ListItem
        className="p-0 max-w-fit rounded-full border border-secondary py-1 px-2.5 hover:bg-primary active:bg-primary focus:bg-primary lg:hover:bg-violet-950"
        key={index}
      >
        <label className="flex cursor-pointer items-center">
          <ListItemPrefix className="mr-2">
            <Checkbox
              value={genre.id}
              ripple={false}
              color="indigo"
              onChange={onGenreChange}
              className="border-2 rounded-full border-secondary h-4 w-4 transition-all"
              containerProps={{
                className: 'p-0',
              }}
            />
          </ListItemPrefix>
          {/* <p className="font-medium pe-1">{genre.label}</p> */}
          <Typography
            color="blue-gray"
            variant="small"
            className="font-main pe-1 text-secondary font-semibold"
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
      <div key={i}>
        <label
          htmlFor={round.value}
          className="block cursor-pointer select-none rounded-xl p-2 text-center md:text-left has-[:checked]:bg-secondaryDark has-[:checked]:md:bg-primary has-[:checked]:font-bold has-[:checked]:text-white md:flex md:items-center md:justify-center"
        >
          <div className="hidden md:inline">
            <input
              type="radio"
              name="rounds"
              value={round.value}
              id={round.value}
              className="peer hidden"
              onChange={(e) => setRounds(e.target.value)}
            />
            {/* Checked or uncheck svg shown depending on status of input, peer class */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="3em"
              height="3em"
              viewBox="0 0 32 32"
              className="w-22 mr-4 mt-auto peer-checked:hidden"
            >
              <path
                fill="currentColor"
                d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m0 26a12 12 0 1 1 12-12a12 12 0 0 1-12 12"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="3em"
              height="3em"
              viewBox="0 0 24 24"
              className="w-22 mr-4 mt-auto hidden peer-checked:inline "
            >
              <path
                fill="currentColor"
                d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8"
              />
              <path
                fill="currentColor"
                d="M12 7a5 5 0 1 0 5 5a5 5 0 0 0-5-5m0 8a3 3 0 1 1 3-3a3 3 0 0 1-3 3"
              />
            </svg>
          </div>
          <div className="">
            <Typography className="text-light font-medium text-xs md:text-xl md:font-bold">
              {round.text}
            </Typography>
            <Typography className="text-light font-bold md:font-normal text-sm md:text-xl">
              {round.value} Movies
            </Typography>
          </div>
        </label>
      </div>
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
    <div className="text-secondary h-screen flex flex-col container mx-auto">
      <div className="pb-3">
        <NavTemp />
      </div>
      <form
        onSubmit={queryParams}
        className="flex flex-1 px-6 gap-10 md:pt-16 md:max-h-128"
      >
        <div className="flex flex-col md:gap-8 justify-between md:justify-between md:grid-cols-3 ">
          <div className="md:flex md:gap-12 flex flex-1 md:flex-none flex-col md:flex-row md:gap-8 justify-evenly">
            {/* Genre */}
            <div className="md:col-span-2 md:w-2/3 md:pe-16">
              {/* <div className="md:w-2/3 md:pe-16"> */}
              <FilterSeparator text={'Genres'} />
              {/* Map over all Genres */}
              <div className="md:hidden flex flex-wrap gap-x-3 gap-y-2 items-end">
                {/* Not optimal,  if list is expended then retracted, any option from expanded list is removed
                Better to always render all options but hide them*/}
                {showMore ? genreList : genreList.slice(0, 12)}
                <p
                  onClick={() => setShowMore(!showMore)}
                  className="border-secondary text-secondary font-semibold"
                >
                  {showMore ? 'Show less' : 'Show more'}
                </p>
              </div>
              <div className="hidden md:flex flex-wrap gap-x-3 gap-y-2 items-end md:pe-8">
                {/* Not optimal,  if list is expended then retracted, any option from expanded list is removed
                Better to always render all options but hide them*/}
                {genreList}
              </div>
            </div>
            <div className="md:w-1/3 flex flex-1 flex-col md:gap-8 justify-evenly md:justify-normal">
              {/* Language */}
              <div className='mb-8'>
                <FilterSeparator text={'Language'} />
                <div className="flex gap-6 items-center md:ps-6">
                  <p className="text-light text-nowrap text-sm">
                    Select Language
                  </p>
                  <div className="">
                    <select
                      name="lanuage"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)} // Unknown?
                      // onChange={(value) => setLanguage(value as unknown as string)} // Unknown?
                      className="bg-secondaryDark border-0 rounded-xl text-light px-10 py-4 border-r-8 border-transparent"
                    >
                      <option value="en">English</option>
                      <option value="de">German</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* Year */}
              <div className="md:col-end-4">
                <FilterSeparator text={'Release year'} />
                <label>
                  <div className="ms-4 me-1 mx-auto">
                    <Slider
                      getAriaLabel={() => 'Release Date'}
                      defaultValue={30}
                      value={yearSlider}
                      onChange={onYearChange}
                      valueLabelDisplay="auto"
                      shiftStep={30}
                      step={5}
                      marks={yearMarks}
                      min={1970}
                      max={2024}
                      sx={{
                        '& .MuiSlider-markLabel': {
                          color: '#F6F1FF',
                        },
                        '& .MuiSlider-thumb': {
                          color: '#8091be',
                        },
                        '& .MuiSlider-track': {
                          color: '#8091be',
                        },
                        '& .MuiSlider-rail': {
                          color: '#acc4e4',
                        },
                      }}
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
          {/* Round */}
          <div className="md:col-span-3">
            <FilterSeparator text={'Select Round'} justify={'justify-center'} />
            <div className="grid w-full grid-cols-3 gap-2 rounded-xl py-2 mx-auto">
              {roundList}
            </div>
          </div>
          {/* Button */}
          <div className="flex mx-auto py-3 items-center mb-10 md:mb-0 md:col-span-3">
            <Button text={'Start'}></Button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default InputFieldsMovie;
