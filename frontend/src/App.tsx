import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoutes from './ProtectedRoutes';
import ResetPassword from './components/ResetPassword';
import ThisOrThat from './components/ThisOrThat';
import { Movie } from './types/MovieType';
import { useState } from 'react';
import LandingPage from './components/LandingPage';
import FilterPage from './components/FilterPage';
import Winner from './components/Winner';
import MovieDetailView from './components/MovieDetailView';
import Watchlist from './components/Watchlist';
import Navbar from './components/Navbar';
import NotFoundPage from './components/NotFoundPage';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showNavbar, setShowNavbar] = useState(true);

  return (
    <>
      <Router>
        <Navbar
          isOpen={!showNavbar}
          toggleNavbar={() => setShowNavbar(!showNavbar)}
        />
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<NotFoundPage/>} /> // Catch-all route for 404 page
            <Route element={<ProtectedRoutes />}>
            <Route
              path="/select"
              element={<FilterPage setMovies={setMovies} />}
            />
            <Route
              path="/this-or-that"
              element={<ThisOrThat movies={movies} setMovies={setMovies} />}
            />

            <Route
              path="/home"
              element={<LandingPage />}
            />
            <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/winner" element={<Winner />} />
              <Route path="/movie-detail-view" element={<MovieDetailView />} />
              <Route path="/movie/:id" element={<MovieDetailView key={location.pathname} />} />
            </Route>
          </Routes>
      </Router>
    </>
  );
}

export default App;
