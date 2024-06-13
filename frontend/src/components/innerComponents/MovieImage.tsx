import React from 'react';
import NoImage from '../../assets/No-Image-Placeholder.svg'

interface MovieImageProps {
  src?: string | null;
  className?: string;
}

const MovieImage: React.FC<MovieImageProps> = ({ src, className }) => {
  const defaultSrc = NoImage;
  return (
    <img
      className={`${className} h-64 w-44 md:h-72 md:w-64 object-cover object-center`}
      src={src || defaultSrc}
      alt="nature image"
    />
  );
};

export default MovieImage;
