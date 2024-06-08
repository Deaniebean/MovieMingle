import React from 'react';
// import CircleOutline from '../../assets/circle-outline.svg';
// import CircleSelected from '../../assets/circle-radio-filled.svg';

// Define the component
const RadioButton: React.FC<RadioButtonProps> = (props) => {
  // You can use props.prop1 and props.prop2 here
  return (
    <div>
       <input
              type="radio"
              name="rounds"
              value={round.value}
              id={round.value}
              className="peer hidden"
              onChange={(e) => setRounds(e.target.value)}
            />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="3rem"
        height="3rem"
        fill="none"
        viewBox="0 0 24 24"
        className="w-22 mr-4 mt-auto peer-checked:hidden"
      >
        <path
          stroke="#000"
          stroke-width="1.5"
          d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        width="3em"
        height="3em"
        viewBox="0 0 32 32"
        className="w-22 mr-4 mt-auto peer-checked:hidden"
      >
        <path
          fill="currentColor"
          d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m0 26a12 12 0 1 1 12-12a12 12 0 0 1-12 12"
        />
      </svg> */}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="3rem"
        height="3rem"
        className="w-22 mr-4 mt-auto hidden peer-checked:inline fill-current text-secondary"
        viewBox="0 0 64 64"
      >
        <path
          d="M0 0h1280v800H0z"
          transform="translate(-512 -320)"
        />
        <path
          d="M321.714 559.995c61.738-.595 122.862-26.17 166.814-69.605 52.2-51.586 79.086-127.916 69.709-200.78C542.165 164.734 439.517 80 320.172 80c-90.668 0-178.797 56.719-217.449 138.967-29.592 62.968-29.644 138.985 0 202.066 38.378 81.665 125.058 138.086 215.907 138.962 1.028.003 2.056.003 3.084 0Zm-2.827-40.001c-92.218-.889-178.254-72.2-195.36-163.628-12.06-64.461 10.707-134.216 58.131-179.991 55.378-53.452 142.405-71.361 214.766-41.061 64.75 27.114 113.208 90.054 122.138 159.404 7.654 59.44-13.677 121.736-55.596 164.649-36.766 37.637-88.33 60.114-141.509 60.627-.857.003-1.713.003-2.57 0Z"
          transform="matrix(.10009 0 0 .10009 -.058 -.007)"
        />
        <circle
          cx="543.992"
          cy="352"
          r="14.13"
          transform="translate(-620.995 -390.527) scale(1.20036)"
        />
      </svg>
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        width="3em"
        height="3em"
        viewBox="0 0 24 24"
        className="w-22 mr-4 mt-auto hidden peer-checked:inline fill-current text-secondary"
      >
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8" />
        <path
          fill="white"
          d="M12 7a5 5 0 1 0 5 5a5 5 0 0 0-5-5m0 8a3 3 0 1 1 3-3a3 3 0 0 1-3 3"
        />
      </svg> */}
    </div>
  );
};

// Assign default props to the component

export default RadioButton;
