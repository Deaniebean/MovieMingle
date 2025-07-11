import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/filterSlider.css';
import '../styles/globals.css';
import { Movie } from '../types/MovieType'; 

// Components
import {
  Checkbox,
  ListItem,
  ListItemPrefix,
  Typography,
  // Button,
} from '@material-tailwind/react';
import FilterSeparator from './innerComponents/FilterSeparator';
import Slider from '@mui/material/Slider'; 
import Button from './innerComponents/Button';

interface Props {
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const InputFieldsMovie: React.FC<Props> = ({ setMovies }) => {
  const [genre, setGenre] = useState<string[]>([]);
  const [yearSlider, setYearSlider] = useState<number[]>([1990, 2024]);
  const [rounds, setRounds] = useState('6');
  const [language, setLanguage] = useState('en');
  const [vote_average, setVote_average] = useState<number>(7);
  const navigate = useNavigate();

  const queryParams = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const genreParams = genre; 
    const yearsParams = [`${yearSlider[0]}-01-01`, `${yearSlider[1]}-12-31`]; 
    const roundsParams = parseInt(rounds); 
    const languageParams = language;
    const vote_averageParams = vote_average;
    /*
    console.log('genre:', genreParams);
    console.log('years:', yearsParams);
    console.log('rounds:', roundsParams);
    console.log('language:', languageParams);
    console.log('vote_average:', vote_averageParams);
    */
    try {
      const response =  await axios.post(
      `${import.meta.env.VITE_API_URL}/api/discover/movies`,
        {
          genre: genreParams,
          years: yearsParams,
          rounds: roundsParams,
          language: languageParams,
          vote_average: vote_averageParams,
        }
      );

      //console.log('Success:', response.data);
      setMovies(response.data);
      navigate('/this-or-that');
    } catch (error) {
      //console.error('Error:', error);
    }
  };

  const onGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked
      ? setGenre((genre) => [...genre, e.target.value])
      : setGenre((genre) => genre.filter((genre) => genre !== e.target.value));
  };

  const onYearChange = (_: Event, newValue: number | number[]) => {
    setYearSlider(newValue as number[]);
  };

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
        className=" max-w-fit rounded-full border border-secondaryLight py-1 px-2.5 hover:bg-primary active:bg-primary md:active:bg-secondary focus:bg-blue md:focus:bg-primary md:hover:bg-violet-950"
        key={String(index)}
      >
        <label className="flex cursor-pointer items-center">
          <ListItemPrefix className=" mr-1 md:mr-2">
            <Checkbox
              value={genre.id}
              ripple={false}
              color="indigo"
              onChange={onGenreChange}
              className="border-2 rounded-full border-secondaryLight h-4 w-4 "
              containerProps={{
                className: 'p-0',
              }}
            />
          </ListItemPrefix>
          <Typography
            color="blue-gray"
            variant="small"
            className="font-main md:text-base px-1 md:pe-1 text-secondary font-semibold"
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
      <div key={String(i)}>
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

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="3rem"
              height="3rem"
              fill="none"
              viewBox="0 0 24 24"
              className="w-22 mr-4 mt-auto peer-checked:hidden text-secondary"
            >
              <path
                d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="#4E5676"
                strokeWidth="1.5"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="3em"
              height="3em"
              viewBox="0 0 24 24"
              className="w-22 mr-4 mt-auto hidden peer-checked:inline fill-current text-secondaryLight"
            >
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8" />
              <path
                fill="white"
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

  const voteMarks = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 3,
      label: '3',
    },
    {
      value: 4,
      label: '4',
    },
    {
      value: 5,
      label: '5',
    },
    {
      value: 6,
      label: '6',
    },
    {
      value: 7,
      label: '7',
    },
    {
      value: 8,
      label: '8',
    },
    {
      value: 9,
      label: '9',
    },
    {
      value: 10,
      label: '10',
    },
  ]

  const onVoteAverageChange = (_: Event, newValue: number | number[]) => {
    setVote_average(newValue as number);
  };

  return (
    <div className="text-secondary flex flex-col container mx-auto h-screen -mt-10 pt-8 md:-mt-28 md:pt-24">
      <form
        onSubmit={queryParams}
        className="flex h-screen mx-auto px-6 md:pt-16 "
      >
        <div className="flex flex-col md:grid justify-between md:grid-cols-3 mt-4">
          {/* Genre */}
          <div className="flex flex-col md:flex-none md:col-span-2 md:pe-16 min-h-20 overflow-auto md:h-56">
            <FilterSeparator text={'Genres'} />
            {/* Map over all Genres */}
            <div className="flex flex-wrap gap-x-2 gap-y-2 items-end">
              {genreList}
            </div>
          </div>
          {/* Language */}
          <div className="flex-none md:flex md:flex-col">
            <FilterSeparator text={'Language'} />
            <div className="flex gap-6 items-center md:ps-6">
              <p className="text-light text-nowrap text-sm">Select Language</p>
              <div className="">
                <select
                  name="lanuage"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)} 
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
          <div className="md:col-end-4 md:-mt-36 h-fit">
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
            <FilterSeparator text={'Min Rating'} />
            <label>
              <div className="ms-4 me-1 mx-auto">
                <Slider
                  getAriaLabel={() => 'Min Rating'}
                  value={vote_average}
                  onChange={onVoteAverageChange}
                  valueLabelDisplay="auto"
                  shiftStep={1}
                  step={1}
                  marks={voteMarks}
                  min={1}
                  max={10}
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
          {/* Round */}
          <div className="md:col-span-3">
            <FilterSeparator text={'Select Round'} justify={'justify-center'} />
            <div className="grid w-full grid-cols-3 gap-2 rounded-xl py-2 mx-auto">
              {roundList}
            </div>
          </div>
          {/* Button */}
          <div className="flex mx-auto pb-6 items-center content-end md:col-span-3">
            <Button text={'Start'}></Button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default InputFieldsMovie;
