import React from 'react';
import { useLocation } from 'react-router-dom';
import { Movie } from '../types/MovieType';

const Winner: React.FC = () => {
    const location = useLocation();
    const movie: Movie = location.state?.movie;

    return (
        <div>
            <h1>Winner</h1>
            <p>{movie.original_title}</p>
            {movie.poster_path ?(
            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}/>
            ):( 
            <img src='path/to/default/image.jpg'/>)}
            <p>{movie.overview}</p>

        </div>
    );
};

export default Winner;