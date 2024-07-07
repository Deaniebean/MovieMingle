import React, { useState, useEffect } from 'react';

// Icons
import IconActive from '../../assets/DocumentaryActive.png';
import IconNotActive from '../../assets/DocumentaryNotActive.png';

// Styles
import '../MovieDetailView.css';
import '../../styles/globals.css';

interface StarRatingProps {
  maxStars: number;
  initialRating?: number;
  onSubmitRating: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  maxStars,
  initialRating = 0,
  onSubmitRating,
}) => {
  const [rating, setRating] = useState<number>(initialRating);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
    onSubmitRating(selectedRating);
  };

  return (
    <div className="movie-detail-rating-icon">
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
            <img
              src={isActive ? IconActive : IconNotActive}
              alt="star icon"
            />
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
