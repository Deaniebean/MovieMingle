import React, { useState } from 'react';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import '../styles/globals.css';

interface StarRatingProps {
  maxStars: number;
  initialRating?: number;
  onSubmitRating: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ maxStars, initialRating = 0, onSubmitRating }) => {
  const [rating, setRating] = useState<number>(initialRating);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
    onSubmitRating(selectedRating); 
  };

  return (
    <div>
      {[...Array(maxStars)].map((_, index) => {
        const isActive = hoverRating ? index < hoverRating : index < rating;
        return (
          <span
            key={index}
            className="cursor-pointer text-2xl"
            onMouseEnter={() => setHoverRating(index + 1)}
            onMouseLeave={() => setHoverRating(null)}
            onClick={() => handleStarClick(index + 1)}
          >
            {isActive ? <StarRoundedIcon /> : <StarOutlineRoundedIcon />}
          </span>
        );
      })}
    </div>
  );
}

export default StarRating;
