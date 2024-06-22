import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieImage from '../src/components/innerComponents/MovieImage';
import NoImage from '../src/assets/No-Image-Placeholder.svg'; // Jest doesn't recognise svg, test still runs

describe('MovieImage Component', () => {
  test('renders with provided src and alt', () => {
    render(<MovieImage src="test-image.jpg" alt="Test Image" />);

    const imgElement = screen.getByAltText('Test Image');
    expect(imgElement).toHaveAttribute('src', 'test-image.jpg');
  });

  test('renders with default src when no src is provided', () => {
    render(<MovieImage alt="Default Image" />);

    const imgElement = screen.getByAltText('Default Image');
    expect(imgElement).toHaveAttribute('src', NoImage);
  });

  test('renders with default alt when no alt is provided', () => {
    render(<MovieImage src="test-image.jpg" />);

    const imgElement = screen.getByAltText('');
    expect(imgElement).toHaveAttribute('src', 'test-image.jpg');
  });

  test('applies custom className', () => {
    render(<MovieImage src="test-image.jpg" className="custom-class" alt="Custom Class" />);

    const imgElement = screen.getByAltText('Custom Class');
    expect(imgElement).toHaveClass('custom-class');
  });
});
