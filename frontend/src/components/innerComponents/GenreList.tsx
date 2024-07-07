import React from 'react';
import { useMediaQuery } from 'react-responsive';
import genreData from '../../genre.json';
import { Genre } from '../../types/GenreType';

interface GenreListProps {
  genreIds: number[];
  isPrimary: boolean;
}

const GenreList: React.FC<GenreListProps> = ({ genreIds, isPrimary }) => {
  const getGenreNames = (genreIds: number[]): string[] => {
    return genreIds.map((id) => {
      const genre = genreData.genres.find((genre: Genre) => genre.id === id);
      return genre ? genre.name : '';
    });
  };

  const renderFilmGenres = (genreIds: number[]): JSX.Element => {
    const genres = getGenreNames(genreIds);
    const isMobile = useMediaQuery({ maxWidth: 768 });

    return (
      <div className={`flex flex-wrap gap-1 ${isPrimary ? 'text-white' : 'justify-end md:justify-start'}`}>
        {genres
          .map((genre, i) => (
            <span
              className={`border rounded-md px-3 py-1 text-xs ${isPrimary ? 'border-white' : 'border-primary'}`}
              key={i}
            >
              {genre}
            </span>
          ))
          .slice(0, isMobile ? 2 : 4)}
      </div>
    );
  };

  return (
    <div>
      <p className={`${isPrimary ? 'mb-1' : 'mb-1 text-primary'} md:hidden`}>Genre</p>
      {renderFilmGenres(genreIds)}
    </div>
  );
};

export default GenreList;
