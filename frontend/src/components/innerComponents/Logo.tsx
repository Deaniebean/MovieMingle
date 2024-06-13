import React from 'react';

interface LogoProps {
  src: string;
  alt?: string;
}

const Logo: React.FC<LogoProps> = ({ src, alt }) => {
  return (
    <div className="relative inline-block">
      <div className="absolute inset-0 border-4 border-transparent rounded-full fade-border"></div>
      {/* <img loading="lazy" src={src} alt={alt} className='w-14 h-14 object-contain'/> */}
      <img src={src} alt={alt} className="w-14 h-14 object-contain rounded-full" />
    </div>
  );
};

export default Logo;
