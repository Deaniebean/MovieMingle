import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoutes from './ProtectedRoutes';
import Auth from './components/Auth';
import InputFieldsMovie from './pratice_fetches/InputFieldsMovie';
import ThisOrThat from './pratice_fetches/ThisOrThat';
import { Movie } from './types/MovieType';
import { useState } from 'react';
import React from 'react';


//        <Route path="/" element={<InputFieldsMovie setMovies={setMovies} />} />
//        <Route path="/login" element={<Login />} />

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route
          path="/this-or-that"
          element={<ThisOrThat movies={movies} setMovies={setMovies} />}
        />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Auth />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
