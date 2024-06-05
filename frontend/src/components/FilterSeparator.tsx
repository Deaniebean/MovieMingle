import React from 'react';

// Define the props interface
interface FilterSeparatorProps {
  text: string;
}

// Define default props
const defaultProps: Partial<FilterSeparatorProps> = {
  text: 'default value for prop1',
};

// Define the component
const FilterSeparator: React.FC<FilterSeparatorProps> = (props) => {
  // You can use props.prop1 and props.prop2 here
  return (
    <div className="flex items-center gap-3 py-3.5">
      <h2 className="text-light text-nowrap text-xl">{props.text}</h2>
      <hr className="my-2 border-light w-full" />
    </div>
  );
};

// Assign default props to the component
FilterSeparator.defaultProps = defaultProps;

export default FilterSeparator;
