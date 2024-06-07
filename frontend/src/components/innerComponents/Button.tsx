import React from 'react';

// Define the props interface
interface ButtonProps {
  text: string;
}

// Define default props
const defaultProps: Partial<ButtonProps> = {
  text: 'Button'
};

// Define the component
const Button: React.FC<ButtonProps> = (props) => {
  // You can use props.prop1 and props.prop2 here
  return (
    <button className='bg-secondary px-20 md:px-40 py-2 md:py-5 text-primary rounded-large text-xl md:text-2xl font-bold'>
      {props.text}
    </button>
  );
};

// Assign default props to the component
Button.defaultProps = defaultProps;

export default Button;
