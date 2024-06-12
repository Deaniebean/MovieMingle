 import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/App';
import React from 'react';

// Basic truthy test
describe('A truthy statement', () => {
  it('should be equal to 2', () => {
    expect(1 + 1).toEqual(2);
  });
});

// Vitest and React Testing Library  
describe('App', () => {
  it('renders the App component', () => {
    render(<App />);
    screen.debug(); // prints out the JSX in the App component to the command line
  });
});