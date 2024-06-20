/*import React from 'eact';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from '../src/components/Register';
import { BrowserRouter as Router } from 'eact-router-dom';
import axios from 'axios';

// Mock axios post function (replace with actual function if needed)
axios.post = vi.fn();

describe('Register Component', () => {
  it('renders Register component', () => {
    render(<Router><Register /></Router>);
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('displays error messages on invalid input', async () => {
    render(<Router><Register /></Router>);

    fireEvent.submit(screen.getByRole('button', { name: /register/i }));

    expect(await screen.findByText('Please enter a username')).toBeInTheDocument();
    expect(await screen.findByText('Please enter a password')).toBeInTheDocument();
    expect(await screen.findByText('Please verify your password')).toBeInTheDocument();
  });

  it('handles successful registration', async () => {
    axios.post.mockResolvedValueOnce({ data: { token: 'ocked_token' } });

    render(<Router><Register /></Router>);

    fireEvent.change(screen.getByPlaceholderText('E-Mail or Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password' },
    });
    fireEvent.change(screen.getByPlaceholderText('Verify Password'), {
      target: { value: 'password' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(screen.queryByText('You Are Not Registered')).not.toBeInTheDocument();
    });
    expect(document.cookie).toContain('TOKEN=mocked_token');
    expect(window.location.href).toBe('http://localhost/home');
  });

  it('handles duplicate username error', async () => {
    axios.post.mockRejectedValueOnce({ response: { data: { code: 11000 } } });

    render(<Router><Register /></Router>);

    fireEvent.change(screen.getByPlaceholderText('E-Mail or Username'), {
      target: { value: 'duplicateuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password' },
    });
    fireEvent.change(screen.getByPlaceholderText('Verify Password'), {
      target: { value: 'password' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /register/i }));

    expect(await screen.findByText('This username already exists')).toBeInTheDocument();
  });

  it('handles general registration failure', async () => {
    axios.post.mockRejectedValueOnce(new Error('Network Error'));

    render(<Router><Register /></Router>);

    fireEvent.change(screen.getByPlaceholderText('E-Mail or Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password' },
    });
    fireEvent.change(screen.getByPlaceholderText('Verify Password'), {
      target: { value: 'password' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /register/i }));

    expect(await screen.findByText('An error occurred')).toBeInTheDocument();
  });

  it('navigates to login page when "Log In now" link is clicked', () => {
    render(<Router><Register /></Router>);

    fireEvent.click(screen.getByText('Log In now'));

    expect(window.location.href).toBe('http://localhost/login');
  });
});*/