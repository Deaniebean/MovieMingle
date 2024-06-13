import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ResetPassword from '../src/components/ResetPassword'; // Adjust the import path based on your actual file structure
import { vi, describe, beforeEach, test, expect } from 'vitest';
import '@testing-library/jest-dom';

// Mock axios and cookies using Vitest's mocking capabilities
vi.mock('axios');
const mockedAxios = {
  put: vi.fn(),
};

vi.mock('universal-cookie');
const MockedCookies = vi.fn(() => ({
  set: vi.fn(),
}));
const mockedCookies = new MockedCookies();

const mockSetShowNavbar = vi.fn();

describe('ResetPassword Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <ResetPassword setShowNavbar={mockSetShowNavbar} />
      </MemoryRouter>
    );
  });

  test('should display error message when username is empty', async () => {
    fireEvent.change(screen.getByPlaceholderText('E-Mail or Username'), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText('New Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Verify New Password'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: 'Reset Password' }));

    await waitFor(() => {
      expect(screen.getByText('Please enter a username')).toBeInTheDocument();
    });
  });

  test('should display error message when password is empty', async () => {
    fireEvent.change(screen.getByPlaceholderText('E-Mail or Username'), { target: { value: 'user' } });
    fireEvent.change(screen.getByPlaceholderText('New Password'), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText('Verify New Password'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: 'Reset Password' }));

    await waitFor(() => {
      expect(screen.getByText('Please enter a new password')).toBeInTheDocument();
    });
  });

  test('should display error message when verify password is empty', async () => {
    fireEvent.change(screen.getByPlaceholderText('E-Mail or Username'), { target: { value: 'user' } });
    fireEvent.change(screen.getByPlaceholderText('New Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Verify New Password'), { target: { value: '' } });

    fireEvent.click(screen.getByRole('button', { name: 'Reset Password' }));

    await waitFor(() => {
      expect(screen.getByText('Please verify your new password')).toBeInTheDocument();
    });
  });

  test('should display error message when passwords do not match', async () => {
    fireEvent.change(screen.getByPlaceholderText('E-Mail or Username'), { target: { value: 'user' } });
    fireEvent.change(screen.getByPlaceholderText('New Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Verify New Password'), { target: { value: 'password456' } });

    fireEvent.click(screen.getByRole('button', { name: 'Reset Password' }));

    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });
  });

/*  test('should make a password reset request and set cookies on successful reset', async () => {
    mockedAxios.put.mockResolvedValue({
      data: {
        token: 'test-token',
      },
    });
  
    fireEvent.change(screen.getByPlaceholderText('E-Mail or Username'), { target: { value: 'user' } });
    fireEvent.change(screen.getByPlaceholderText('New Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Verify New Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Reset Password' }));
  
    await waitFor(() => {
      expect(mockedAxios.put).toHaveBeenCalledTimes(1);
      expect(mockedAxios.put).toHaveBeenCalledWith('http://localhost:8082/authenticate/reset-password', {
        username: 'user',
        password: 'password123',
      });
      expect(mockedCookies.set).toHaveBeenCalledTimes(1);
      expect(mockedCookies.set).toHaveBeenCalledWith('TOKEN', 'test-token', { path: '/' });
    });
  }); */
  
/*  test('should display error message on API failure', async () => {
    mockedAxios.put.mockRejectedValue(new Error('Reset password failed'));
  
    fireEvent.change(screen.getByPlaceholderText('E-Mail or Username'), { target: { value: 'user' } });
    fireEvent.change(screen.getByPlaceholderText('New Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Verify New Password'), { target: { value: 'password123' } });
  
    fireEvent.click(screen.getByRole('button', { name: 'Reset Password' }));
  
    await waitFor(() => {
      expect(screen.getByText('reset password failed')).toBeInTheDocument();
    });
  });*/

  /*test('should disable submit button when required fields are empty', () => {
    const button = screen.getByRole('button', { name: 'Reset Password' });
    expect(button).toBeDisabled();
  
    fireEvent.change(screen.getByPlaceholderText('E-Mail or Username'), { target: { value: 'user' } });
    fireEvent.change(screen.getByPlaceholderText('New Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Verify New Password'), { target: { value: 'password123' } });
  
    expect(button).not.toBeDisabled();
  });*/
  
 /* test('should display error for invalid email format', async () => {
    fireEvent.change(screen.getByPlaceholderText('E-Mail or Username'), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByPlaceholderText('New Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Verify New Password'), { target: { value: 'password123' } });
  
    fireEvent.click(screen.getByRole('button', { name: 'Reset Password' }));
  
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
    });
  });*/
  

});
