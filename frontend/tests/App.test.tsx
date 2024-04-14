import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/App';
import React from 'react';


//only using vitest
describe('A truthy statement', () => {
  it('should be equal to 2', () => {
    expect(1 + 1).toEqual(2);
  });
});


//Vitest and ReactTestingLibrary  
describe('App', () => {
  it('renders the App component', () => {
    render(<App />);

    screen.debug(); // prints out the jsx in the App component unto the command line
  });
});