import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StarRating from '../src/components/StarRating'; 
import { vi, describe, beforeEach, test, expect } from 'vitest';

vi.mock('@mui/icons-material/StarOutlineRounded', () => ({
  __esModule: true,
  default: () => <span data-testid="star-outline">★</span>,
}));

vi.mock('@mui/icons-material/StarRounded', () => ({
  __esModule: true,
  default: () => <span data-testid="star-rounded">★</span>,
}));

describe('StarRating Component', () => {
  const maxStars = 5;
  const onSubmitRating = vi.fn();

  beforeEach(() => {
    onSubmitRating.mockClear();
  });

  test('should render the correct number of stars', () => {
    render(<StarRating maxStars={maxStars} onSubmitRating={onSubmitRating} />);
    const stars = screen.getAllByTestId('star-outline');
    expect(stars.length).toBe(maxStars);
  });

  test('should display the correct initial rating', () => {
    const initialRating = 3;
    render(<StarRating maxStars={maxStars} initialRating={initialRating} onSubmitRating={onSubmitRating} />);
    const filledStars = screen.getAllByTestId('star-rounded');
    expect(filledStars.length).toBe(initialRating);
  });

  test('should set rating on star click and call onSubmitRating', () => {
    render(<StarRating maxStars={maxStars} onSubmitRating={onSubmitRating} />);
    const stars = screen.getAllByTestId('star-outline');
    fireEvent.click(stars[3]);
    const filledStars = screen.getAllByTestId('star-rounded');
    expect(filledStars.length).toBe(4);
    expect(onSubmitRating).toHaveBeenCalledWith(4);
  });

  test('should highlight stars on hover', () => {
    render(<StarRating maxStars={maxStars} onSubmitRating={onSubmitRating} />);
    const stars = screen.getAllByTestId('star-outline');
    fireEvent.mouseEnter(stars[2]);
    const highlightedStars = screen.getAllByTestId('star-rounded');
    expect(highlightedStars.length).toBe(3);
    fireEvent.mouseLeave(stars[2]);
    const resetStars = screen.getAllByTestId('star-rounded');
    expect(resetStars.length).toBe(3);
  });

});
