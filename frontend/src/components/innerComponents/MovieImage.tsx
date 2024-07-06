import React from 'react';
import NoImage from '../../assets/No-Image-Placeholder.svg'

type Size = 'sm' | 'md' | 'lg';

interface MovieImageProps {
  src?: string | null;
  alt?: string;
  className?: string;
  size?: Size;
}

const MovieImage: React.FC<MovieImageProps> = ({ src, alt = '', className, size =  'sm' }) => {
  const defaultSrc = NoImage;

  const getClassName = (size: Size): string => {
    switch (size) {
      case 'sm':
        return ' h-64 w-44 md:h-70 md:w-64';
      case 'md':
        return ' h-80 w-60 md:h-90 md:w-80';
      case 'lg':
        return ' h-96 w-72 md:h-96';
    }
  };

  const imgSize = getClassName(size);


  return (
    <img
      className={`${className + imgSize} object-cover object-center`}
      src={src || defaultSrc}
      alt={alt}
    />
  );
};

export default MovieImage;


// src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}