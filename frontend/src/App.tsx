import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoutes from './ProtectedRoutes';
import ResetPassword from './components/ResetPassword';
import ThisOrThat from './pratice_fetches/ThisOrThat';
import { Movie } from './types/MovieType';
import { useState } from 'react';
import LandingPage from './components/LandingPage';
import MovieSelector from './pratice_fetches/function_get_match';

// <Route path="/" element={<InputFieldsMovie setMovies={setMovies} />} />

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  return (
    <Router>
      <Routes>
        <Route path="/select" element={<MovieSelector/>} />
        <Route
          path="/this-or-that"
          element={<ThisOrThat movies={movies} setMovies={setMovies} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<LandingPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
