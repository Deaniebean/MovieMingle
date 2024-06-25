import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import { vi, describe, beforeEach, test, expect } from 'vitest';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual: typeof import('react-router-dom') = await importOriginal();
  return Object.assign({}, actual, {
    useNavigate: () => mockNavigate,
    useLocation: vi.fn(),
    MemoryRouter: actual.MemoryRouter,
  });
});

describe('Navbar Component', () => {
  const toggleNavbar = vi.fn();

  beforeEach(() => {
    toggleNavbar.mockClear();
    mockNavigate.mockClear();
  });

  test('should not render on /login or / routes', () => {
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/login',
      state: undefined,
      key: '',
      search: '',
      hash: ''
    });

    render(
      <MemoryRouter>
        <Navbar isOpen={false} toggleNavbar={toggleNavbar} />
      </MemoryRouter>
    );

    expect(screen.queryByText('MovieMingle')).not.toBeInTheDocument();
  });

  test('should render on other routes', () => {
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/home',
      state: undefined,
      key: '',
      search: '',
      hash: ''
    });

    render(
      <MemoryRouter>
        <Navbar isOpen={false} toggleNavbar={toggleNavbar} />
      </MemoryRouter>
    );

    expect(screen.getByText('MovieMingle')).toBeInTheDocument();
  });

/*  test('should render the burger menu on small screens', () => {
    global.innerWidth = 500;
    global.dispatchEvent(new Event('resize'));

    render(
      <MemoryRouter>
        <Navbar isOpen={false} toggleNavbar={toggleNavbar} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('burger-menu')).toBeInTheDocument();
  });*/

  test('should render the top navbar on large screens', () => {
    global.innerWidth = 1024;
    global.dispatchEvent(new Event('resize'));

    render(
      <MemoryRouter>
        <Navbar isOpen={false} toggleNavbar={toggleNavbar} />
      </MemoryRouter>
    );

    expect(screen.getByText('MovieMingle')).toBeInTheDocument();
  });

/*  test('should call toggleNavbar when burger menu is clicked', () => {
    global.innerWidth = 500;
    global.dispatchEvent(new Event('resize'));

    render(
      <MemoryRouter>
        <Navbar isOpen={false} toggleNavbar={toggleNavbar} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId('burger-menu'));
    expect(toggleNavbar).toHaveBeenCalled();
  });*/

  test('should call navigate when a sidebar link is clicked', () => {
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/home',
      state: undefined,
      key: '',
      search: '',
      hash: ''
    });

    render(
      <MemoryRouter>
        <Navbar isOpen={true} toggleNavbar={toggleNavbar} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Watch List'));
    expect(mockNavigate).toHaveBeenCalledWith('/watchlist');
  });

  test('should close the sidebar when the close button is clicked', () => {
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/home',
      state: undefined,
      key: '',
      search: '',
      hash: ''
    });

    render(
      <MemoryRouter>
        <Navbar isOpen={true} toggleNavbar={toggleNavbar} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('X'));
    expect(toggleNavbar).toHaveBeenCalled();
  });

/*  test('should update navbar height on window resize', () => {
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/home',
      state: undefined,
      key: '',
      search: '',
      hash: ''
    });

    render(
      <MemoryRouter>
        <Navbar isOpen={false} toggleNavbar={toggleNavbar} />
      </MemoryRouter>
    );

    global.innerWidth = 800;
    global.dispatchEvent(new Event('resize'));

    const topNavbar = screen.getByText('MovieMingle').parentElement;
    expect(topNavbar).toBeInTheDocument();
  });*/
});
