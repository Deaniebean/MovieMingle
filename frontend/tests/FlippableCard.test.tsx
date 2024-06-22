import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FlippableCard from '../src/components/innerComponents/FlippableCard';
import MovieInfoCard from '../src/components/innerComponents/MovieInfoCard';

// Mock ReactCardFlip component
vi.mock('react-card-flip', () => ({
  default: ({
    isFlipped,
    children,
  }: {
    isFlipped: boolean;
    children: React.ReactNode[];
  }) => <div>{isFlipped ? children[1] : children[0]}</div>,
}));

describe('FlippableCard Component', () => {
  it('renders front content when not flipped', () => {
    render(
      <FlippableCard
        isFlipped={false}
        onClick={() => {}}
        className="test-class"
      >
        <div>Front Content</div>
        <div>Back Content</div>
      </FlippableCard>
    );

    expect(screen.getByText('Front Content')).toBeInTheDocument();
    expect(screen.queryByText('Back Content')).not.toBeInTheDocument();
  });

  it('renders back content when flipped', () => {
    render(
      <FlippableCard isFlipped={true} onClick={() => {}} className="test-class">
        <div>Front Content</div>
        <div>Back Content</div>
      </FlippableCard>
    );

    expect(screen.queryByText('Front Content')).not.toBeInTheDocument();
    expect(screen.getByText('Back Content')).toBeInTheDocument();
  });

  it('triggers onClick when the card is clicked', () => {
    const handleClick = vi.fn();

    render(
      <FlippableCard
        isFlipped={false}
        onClick={handleClick}
        className="test-class"
      >
        <div onClick={() => console.log('Front Content Clicked')}>Front Content</div>
        <div>Back Content</div>
      </FlippableCard>
    );

    // Add debug statement
    screen.debug();

    fireEvent.click(screen.getByText('Front Content'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('triggers onClick when the back of the card is clicked', () => {
    const handleClick = vi.fn();

    render(
      <FlippableCard
        isFlipped={true}
        onClick={handleClick}
        className="test-class"
      >
        <div>Front Content</div>
        <div>Back Content</div>
      </FlippableCard>
    );

    fireEvent.click(screen.getByText('Back Content'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
