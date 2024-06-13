import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from '../src/components/Register'; 
import { vi, describe, beforeEach, test, expect } from 'vitest';
import '@testing-library/jest-dom';

vi.mock('axios');
const mockedAxios = {
  post: vi.fn(),
};

vi.mock('universal-cookie');
const MockedCookies = vi.fn(() => ({
  set: vi.fn(),
}));
const mockedCookies = new MockedCookies();

const mockSetShowNavbar = vi.fn();

describe('Register Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Register setShowNavbar={mockSetShowNavbar} />
      </MemoryRouter>
    );
  });

  test('should display error message when username is empty', async () => {
    fireEvent.change(screen.getByPlaceholderText('E-Mail or Username'), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Verify Password'), { target: { value: 'password123' } });
  
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));
  
    await waitFor(() => {
      expect(screen.getByText('Please enter a username')).toBeInTheDocument();
    });
  });

  test('should display error message when password is empty', async () => {
    fireEvent.change(screen.getByPlaceholderText('E-Mail or Username'), { target: { value: 'user' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText('Verify Password'), { target: { value: 'password123' } });
  
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));
  
    await waitFor(() => {
      expect(screen.getByText('Please enter a password')).toBeInTheDocument();
    });
  });

  test('should display error message when verify password is empty', async () => {
    fireEvent.change(screen.getByPlaceholderText('E-Mail or Username'), { target: { value: 'user' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Verify Password'), { target: { value: '' } });
  
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));
  
    await waitFor(() => {
      expect(screen.getByText('Please verify your password')).toBeInTheDocument();
    });
  });
   
  test('should display error message when passwords do not match', async () => {
    fireEvent.change(screen.getByPlaceholderText('E-Mail or Username'), { target: { value: 'user' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Verify Password'), { target: { value: 'password456' } });
  
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));
  
    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });
  });

});
