import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import Login from '../src/components/Login'; // Adjust the import path based on your actual file structure

// Importing from vitest
import { vi, describe, beforeEach, test, expect } from 'vitest';

// Importing jest-dom for custom matchers
import '@testing-library/jest-dom';

// Mock axios and cookies using Vitest's mocking capabilities
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

describe('Login Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Login setShowNavbar={mockSetShowNavbar} />
      </MemoryRouter>
    );
  });

  test('should display error message when username is empty', async () => {
    fireEvent.change(screen.getByPlaceholderText(/E-Mail or Username/i), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText(/Verify Password/i), { target: { value: 'password123' } });

    // Simulate form submission
    fireEvent.submit(screen.getByRole('button', { name: /Register/i }));

    // Use waitFor to wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText('Please enter a username')).toBeInTheDocument();
    });
  });
});

  /*test('should display error message when password is empty', () => {
    fireEvent.change(screen.getByPlaceholderText(/E-Mail or Username/i), { target: { value: 'user' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: /Log In/i }));
  
    expect(screen.getByText('Please enter a password')).toBeInTheDocument();
  });
  
  test('should make a login request and set cookies on successful login', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        token: 'test-token',
        uuid: 'test-uuid',
      },
    });
  
    fireEvent.change(screen.getByPlaceholderText(/E-Mail or Username/i), { target: { value: 'user' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Log In/i }));
  
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
      expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:8082/authenticate/login', {
        username: 'user',
        password: 'password123',
      });
      expect(mockedCookies.set).toHaveBeenCalledTimes(2);
      expect(mockedCookies.set).toHaveBeenCalledWith('TOKEN', 'test-token', { path: '/' });
      expect(mockedCookies.set).toHaveBeenCalledWith('UUID', 'test-uuid', { path: '/' });
    });
  });
  
  test('should display error message on login failure', async () => {
    mockedAxios.post.mockRejectedValue(new Error('Login failed'));
  
    fireEvent.change(screen.getByPlaceholderText(/E-Mail or Username/i), { target: { value: 'user' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Log In/i }));
  
    await waitFor(() => {
      expect(screen.getByText('Log In failed')).toBeInTheDocument();
    });
  });*/
  
