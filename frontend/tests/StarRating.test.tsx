import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import StarRating from '../src/components/innerComponents/StarRating'; 
import { vi, describe, beforeEach, test, expect } from 'vitest';
import { waitForElementToBeRemoved } from '@testing-library/react';

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
    const stars = screen.getAllByRole('img', { name: 'star icon' });
    expect(stars.length).toBe(maxStars);
  });


  test('should display the correct initial rating', () => {
    const initialRating = 3;
    render(<StarRating maxStars={maxStars} initialRating={initialRating} onSubmitRating={onSubmitRating} />);
    const filledStars = screen.getAllByRole('img', { name: 'star icon' }).filter((img) => img.getAttribute('src')?.includes('DocumentaryActive'));
    expect(filledStars.length).toBe(initialRating);
  });

  test('should set rating on star click and call onSubmitRating', () => {
    render(<StarRating maxStars={maxStars} onSubmitRating={onSubmitRating} />);
    const stars = screen.getAllByRole('img', { name: 'star icon' }).filter((img) => img.getAttribute('src')?.includes('DocumentaryNotActive'));
    fireEvent.click(stars[3]);
    const filledStars = screen.getAllByRole('img', { name: 'star icon' }).filter((img) => img.getAttribute('src')?.includes('DocumentaryActive'));
    expect(filledStars.length).toBe(4);
    expect(onSubmitRating).toHaveBeenCalledWith(4);
  });

  test('should highlight stars on hover', () => {
    render(<StarRating maxStars={maxStars} onSubmitRating={onSubmitRating} />);
    const stars = screen.getAllByRole('img');
    const starOutlineImages = stars.filter((img) => img.getAttribute('src')?.includes('DocumentaryNotActive'));
    fireEvent.mouseEnter(starOutlineImages[2]);
    const highlightedStars = stars.filter((img) => img.getAttribute('src')?.includes('DocumentaryActive'));
    expect(highlightedStars.length).toBe(3);
    fireEvent.mouseLeave(starOutlineImages[2]);
    const resetStars = stars.filter((img) => img.getAttribute('src')?.includes('DocumentaryActive'));
    expect(resetStars.length).toBe(0);
  });

  test('should not render any stars if maxStars is zero', () => {
    render(<StarRating maxStars={0} onSubmitRating={onSubmitRating} />);
    const stars = screen.queryAllByTestId('star-outline');
    expect(stars.length).toBe(0);
  });

  test('should handle initial rating greater than maxStars', () => {
    render(<StarRating maxStars={5} initialRating={10} onSubmitRating={onSubmitRating} />);
    const stars = screen.getAllByRole('img');
    const filledStars = stars.filter((img) => img.getAttribute('src')?.includes('DocumentaryActive'));
    expect(filledStars.length).toBe(5);
  });

  test('should handle initial rating less than zero', () => {
    render(<StarRating maxStars={5} initialRating={-1} onSubmitRating={onSubmitRating} />);
    const filledStars = screen.queryAllByTestId('star-rounded');
    expect(filledStars.length).toBe(0);
  });  
  
  test('should handle rating changes after initial render', async () => {
    const { rerender } = render(<StarRating maxStars={5} initialRating={2} onSubmitRating={onSubmitRating} />);
    await waitFor(() => screen.getAllByRole('img'));
    const stars = screen.getAllByRole('img');
    const starOutlineImages = stars.filter((img) => img.getAttribute('src')?.includes('DocumentaryNotActive'));
    if (starOutlineImages.length > 4) {
      const starElement = starOutlineImages[4].parentElement;
      if (starElement) {
        fireEvent.click(starElement);
        await waitFor(() => expect(onSubmitRating).toHaveBeenCalledTimes(1));
        expect(onSubmitRating).toHaveBeenCalledWith(5);
        await waitFor(() => expect(filledStars.length).toBe(5));
      }
    }
    const filledStars = stars.filter((img) => img.getAttribute('src')?.includes('DocumentaryActive'));
    rerender(<StarRating maxStars={5} initialRating={3} onSubmitRating={onSubmitRating} />);
    const newFilledStars = stars.filter((img) => img.getAttribute('src')?.includes('DocumentaryActive'));
    expect(newFilledStars.length).toBe(3);
  });

  test('should ignore clicks when initialRating is not updated', async () => {
    const initialRating = 3;
    const { rerender } = render(<StarRating maxStars={5} initialRating={initialRating} onSubmitRating={onSubmitRating} />);
    const loadingElement = screen.queryByTestId('loading');
    if (loadingElement) {
      await waitForElementToBeRemoved(() => loadingElement);
    }
    const stars = screen.getAllByAltText('star icon');  
    fireEvent.click(stars[4]);
    expect(onSubmitRating).toHaveBeenCalledWith(5);
    const filledStars = screen.getAllByAltText('star icon').filter((img) => img.getAttribute('src')?.includes('DocumentaryActive'));
    expect(filledStars.length).toBe(5);
    
    rerender(<StarRating maxStars={5} initialRating={initialRating} onSubmitRating={onSubmitRating} />);
    const resetStars = screen.getAllByAltText('star icon').filter((img) => img.getAttribute('src')?.includes('DocumentaryActive'));
    expect(resetStars.length).toBe(5);
  });
});
