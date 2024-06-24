import React from 'react';
import NoImage from '../../assets/No-Image-Placeholder.svg'

interface MovieImageProps {
  src?: string | null;
  alt?: string;
  className?: string;
}

const MovieImage: React.FC<MovieImageProps> = ({ src, alt = '', className }) => {
  const defaultSrc = NoImage;
  return (
    <img
      className={`${className} h-64 w-44 md:h-70 md:w-64 object-cover object-center`}
      src={src || defaultSrc}
      alt={alt}
    />
  );
};

export default MovieImage;


// src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}