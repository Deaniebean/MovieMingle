
import React from 'react';
import { render, screen, fireEvent, waitFor, findByText } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from '../src/components/Register'; 
import { vi, describe, beforeEach, test, expect } from 'vitest';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

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
  let usernameInput;
  let passwordInput;
  let verifyPasswordInput;
  let registerButton;
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Register setShowNavbar={mockSetShowNavbar} />
      </MemoryRouter>
    );

    usernameInput = screen.getByPlaceholderText('E-Mail or Username');
    passwordInput = screen.getByPlaceholderText('Password');
    verifyPasswordInput = screen.getByPlaceholderText('Verify Password');
    registerButton = screen.getByRole('button', { name: 'Register' });
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

  test('should display error message on network error', async () => {
    mockedAxios.post.mockRejectedValueOnce({ response: { data: 'Network Error' } });
  
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.change(verifyPasswordInput, { target: { value: 'testpassword' } });
  
    fireEvent.click(registerButton);
  
    await waitFor(() => {
      expect(screen.getByText('You Are Not Registered')).toBeInTheDocument();
    });
  });

  test('should handle long username and password', async () => {
    const longUsername = 'a'.repeat(256);
    const longPassword = 'b'.repeat(256);
  
    fireEvent.change(screen.getByPlaceholderText('E-Mail or Username'), { target: { value: longUsername } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: longPassword } });
    fireEvent.change(screen.getByPlaceholderText('Verify Password'), { target: { value: longPassword } });
  
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));
  
    await waitFor(() => {
      expect(screen.getByPlaceholderText('E-Mail or Username')).toHaveValue(longUsername);
      expect(screen.getByPlaceholderText('Password')).toHaveValue(longPassword);
      expect(screen.getByPlaceholderText('Verify Password')).toHaveValue(longPassword);
    });
  });
  
 /* test('should successfully register user and redirect', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { token: 'fakeToken' } });
  
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.change(verifyPasswordInput, { target: { value: 'testpassword' } });
  
    fireEvent.click(registerButton);
  
    await waitFor(() => {
      expect(mockedCookies.set).toHaveBeenCalledTimes(1);
      expect(mockedCookies.set).toHaveBeenCalledWith('TOKEN', 'fakeToken', { path: '/' });
      expect(window.location.href).toBe('/home');
    });
  });*/
  
});