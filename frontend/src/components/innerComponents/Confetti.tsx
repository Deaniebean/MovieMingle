import React, { useEffect } from 'react';

// Styles
import './Confetti.css';

const Confetti: React.FC = () => {
  useEffect(() => {
    const confettiContainer = document.getElementById('confetti-container');

    if (confettiContainer) {
      const colors = ['#FFC700', '#FF0000', '#2E3192', '#00A651', '#00FFFF', '#FF00FF'];

      const createConfettiPiece = () => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${Math.random() * window.innerWidth}px`;

        confettiContainer.appendChild(confetti);

        setTimeout(() => {
          confetti.remove();
        }, 5000);
      };

      const generateConfetti = () => {
        setInterval(createConfettiPiece, 100);
      };

      generateConfetti();
    }
  }, []);

  return <div id="confetti-container" className="confetti-container"></div>;
};

export default Confetti;
