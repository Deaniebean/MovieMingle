import React, { ReactNode } from 'react';
import ReactCardFlip from 'react-card-flip';

interface FlippableCardProps {
  children: [ReactNode, ReactNode]; // Expecting exactly two children, one for the front and one for the back
  onClick: () => void; // Corrected prop name
  isFlipped: boolean; // Declare isFlipped as a prop
  className?: string;
}

const FlippableCard: React.FC<FlippableCardProps> = ({ children, isFlipped, className }) => {
  // const [isFlipped, setIsFlipped] = useState<boolean>(false);

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      {/* Front Content */}
      <div className={className}>
        {/* Trigger card flip when clicking anywhere on the front */}
        {children[0]}
      </div>

      {/* Back Content */}
      <div className={className}>
        {/* Trigger card flip when clicking anywhere on the back */}
        {children[1]}
      </div>
    </ReactCardFlip>
  );
};

export default FlippableCard;
