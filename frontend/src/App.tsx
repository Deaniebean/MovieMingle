import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoutes from './ProtectedRoutes';
import Auth from './components/Auth';
import ResetPassword from './components/ResetPassword';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  return (
    <Router>
      <Routes>
        <Route
          path="/this-or-that"
          element={<ThisOrThat movies={movies} setMovies={setMovies} />}
        />
        <Route path="/" element={<InputFieldsMovie setMovies={setMovies} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Auth />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
