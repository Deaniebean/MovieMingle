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
import Navbar from './components/Navbar';
// <Route path="/" element={<InputFieldsMovie setMovies={setMovies} />} />

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showNavbar, setShowNavbar] = useState(true);

  return (
    <>
   
    
        <Router>
        <Navbar isOpen={!showNavbar} toggleNavbar={() => setShowNavbar(!showNavbar)} />   
        <div className='page-content'>
          <Routes>
            <Route
              path="/"
              element={<Register />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/reset-password"
              element={<ResetPassword  />}
            />

            <Route element={<ProtectedRoutes />}>
              <Route
                path="/home"
                element={<LandingPage  />}
              />
              <Route
                path="/select"
                element={<FilterPage setMovies={setMovies} />}
              />
              <Route
                path="/this-or-that"
                element={<ThisOrThat movies={movies} setMovies={setMovies} />}
              />
              <Route path="/winner" element={<Winner />} />
              <Route
                path="/movie-detail-view"
                element={<MovieDetailView />}
              />
            </Route>
          </Routes>
          </div>
        </Router>
    </>
  );
}

export default App;
