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
import Watchlist from './components/Watchlist';
import History from './components/History';
import NavTemp from './components/NavTemp';

// <Route path="/" element={<InputFieldsMovie setMovies={setMovies} />} />

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showNavbar, setShowNavbar] = useState(true);
  // TODO @Fiona füge die Zeile mit deiner Navbar über dem div page-container ein : {showNavbar && <Navbar />} 
  return (
    <>
      <div className="page-container">
        <Router>
          <Routes>
            <Route
              path="/"
              element={<Register setShowNavbar={setShowNavbar} />}
            />
            <Route
              path="/login"
              element={<Login setShowNavbar={setShowNavbar} />}
            />
            <Route
              path="/reset-password"
              element={<ResetPassword setShowNavbar={setShowNavbar} />}
            />

            <Route element={<ProtectedRoutes />}>
              <Route
                path="/home"
                element={<LandingPage setShowNavbar={setShowNavbar} />}
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
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/history" element={<History />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
