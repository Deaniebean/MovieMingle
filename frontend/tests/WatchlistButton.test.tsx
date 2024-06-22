import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import WatchlistButton from '../src/components/innercomponents/WatchlistButton';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Movie } from '../src/types/MovieType';

// Mock dependencies
vi.mock('universal-cookie');
vi.mock('axios');

// Mock Movie object
const mockMovie: Movie = {
  id: 1,
  genre_ids: [28, 12], // Example genre IDs
  original_language: 'en',
  original_title: 'Mock Movie',
  overview: 'This is a mock movie for testing purposes.',
  release_date: '2023-01-01',
  videos: [],
  date: new Date(),
  totalRounds: 1,
  poster_path: '/mock-poster-path.jpg',
};

// Mock api response
const mockResponse = 
{
    "data": {
        "movieData": {
            "id": 1022789,
            "original_title": "Inside Out 2",
            "original_language": "en",
            "overview": "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",
            "genre": [
                "Animation",
                "Family",
                "Drama",
                "Adventure",
                "Comedy"
            ],
            "release_date": "2024-06-11",
            "poster_path": "https://image.tmdb.org/t/p/original/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
            "vote_average": 7.864,
            "vote_count": 515,
            "trailer": "www.youtube.com/watch?v=RY5aH21ohU4",
            "date": "2024-06-22",
            "rating": 0
        },
        "userUUID": "05e8c2b2-6309-40f0-95cc-31cb94760599"
    },
    "status": 200,
    "statusText": "OK",
    "headers": {
        "content-length": "760",
        "content-type": "application/json; charset=utf-8"
    },
    "config": {
        "transitional": {
            "silentJSONParsing": true,
            "forcedJSONParsing": true,
            "clarifyTimeoutError": false
        },
        "adapter": [
            "xhr",
            "http"
        ],
        "transformRequest": [
            null
        ],
        "transformResponse": [
            null
        ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1,
        "env": {},
        "headers": {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        "method": "post",
        "url": "http://localhost:8082/save/watchlist",
        "data": "{\"movieData\":{\"id\":1022789,\"original_title\":\"Inside Out 2\",\"original_language\":\"en\",\"overview\":\"Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.\",\"genre\":[\"Animation\",\"Family\",\"Drama\",\"Adventure\",\"Comedy\"],\"release_date\":\"2024-06-11\",\"poster_path\":\"https://image.tmdb.org/t/p/original/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg\",\"vote_average\":7.864,\"vote_count\":515,\"trailer\":\"www.youtube.com/watch?v=RY5aH21ohU4\",\"date\":\"2024-06-22\",\"rating\":0},\"userUUID\":\"05e8c2b2-6309-40f0-95cc-31cb94760599\"}"
    },
    "request": {}
}

describe('WatchlistButton Component', () => {
  let cookies: Cookies;

  beforeEach(() => {
    cookies = new Cookies();
    cookies.get = vi.fn().mockReturnValue('test-uuid');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders with initial add mode', () => {
    render(
      <WatchlistButton
        movie={mockMovie}
        getGenreNames={() => ['Action']}
      />
    );
    expect(screen.getByText(/Watchlist/i)).toBeInTheDocument();
  });

  it('changes button text after click', async () => {
    (axios.post as typeof axios.post & { mockResolvedValue: Function }).mockResolvedValue({ data: {} });

    render(
      <WatchlistButton
        movie={mockMovie}
        getGenreNames={() => ['Action']}
      />
    );

    const button = screen.getByText(/Watchlist/i);
    fireEvent.click(button);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'post',
          url: 'http://localhost:8082/save/watchlist',
        }),
        expect.objectContaining({
          movieData: expect.any(Object),
          userUUID: 'test-uuid',
        })
      );
      expect(screen.getByText(/Added/i)).toBeInTheDocument();
    });
  });

//   it('handles errors gracefully', async () => {
//     (axios.post as typeof axios.post & { mockRejectedValue: Function }).mockRejectedValue(
//       new Error('Failed to add to watchlist')
//     );

//     render(
//       <WatchlistButton
//         movie={mockMovie}
//         getGenreNames={() => ['Action']}
//       />
//     );

//     const button = screen.getByText(/Watchlist/i);
//     fireEvent.click(button);

//     await waitFor(() => {
//       expect(screen.getByText(/Watchlist/i)).toBeInTheDocument();
//       // Check console logs for error message (Note: You might need to mock console methods for a more thorough check)
//     });
//   });

  it('removes movie from watchlist', async () => {
    (axios.delete as typeof axios.delete & { mockResolvedValue: Function }).mockResolvedValue({ data: {} });

    render(
      <WatchlistButton
        initialMode="remove"
        movie={mockMovie}
        getGenreNames={() => ['Action']}
      />
    );

    const button = screen.getByText(/Added/i);
    fireEvent.click(button);

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'delete',
          url: 'http://localhost:8082/delete/movie',
        }),
        expect.objectContaining({
          movieId: 1,
        })
      );
      expect(screen.getByText(/Watchlist/i)).toBeInTheDocument();
    });
  });
});
