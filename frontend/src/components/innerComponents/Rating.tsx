import React from 'react';
import { Movie } from '../../types/MovieType';

interface RatingProps {
  movie: Movie;
  isPrimary: boolean;
}

const Rating: React.FC<RatingProps> = ({ movie, isPrimary }) => {
  const renderRating = (): string => {
    const rating = movie.vote_average;
    return rating ? `${Math.round(rating * 10) / 10}/10` : '-';
  };

  return (
    <div className="md:flex md:items-center md:gap-1">
      <p className={`${isPrimary ? 'text-sm' : 'text-sm text-primary'}`}>IMDb Rating</p>
      <div className={`${isPrimary ? 'flex items-center' : 'flex items-center justify-end md:justify-start'}`}>
        <p className={`${isPrimary ? '' : 'text-primary'} text-2xl md:text-sm font-bold`}>{renderRating()}</p>
        <p className={`${isPrimary ? '' : ' text-primary '} ms-1 text-xl md:text-sm`}>
          {'( ' + movie.vote_count + ' )'}
        </p>
      </div>
    </div>
  );
};

export default Rating;
