import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register'; 
import Login from './components/Login';
import ProtectedRoutes from './ProtectedRoutes';
import Auth from './components/Auth';
import InputFieldsMovie from './pratice_fetches/InputFieldsMovie';


//      <Route path="/" element={<Register />} />
function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={< InputFieldsMovie/>} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
        <Route path="/home" element={<Auth/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
