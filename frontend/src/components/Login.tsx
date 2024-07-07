import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios, { AxiosError, AxiosResponse } from 'axios';

// Styles
import '../styles/globals.css';
import './Register.css';

let cookies = new Cookies();

interface RegisterProps {}
const Login: React.FC<RegisterProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [login, setLogin] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
    // Function to clear the UUID cookie if user logs out or navigates to login
    const clearAllCookies = () => {
      cookies.remove('UUID');
      cookies.remove('TOKEN');
    };

    if (location.pathname === '/login') {
      clearAllCookies();
    }
  }, [location.pathname]);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(false);
    setLoginClicked(true);

    // Check username is empty
    if (!username) {
      setErrorMessage('Please enter a username');
      return;
    }

    // Check password is empty
    if (!password) {
      setErrorMessage('Please enter a password');
      return;
    }

    // Send form data
    const configuration = {
      method: 'post',
      url: 'http://localhost:8082/authenticate/login',
      data: {
        username,
        password,
      },
    };
    axios(configuration)
      .then((result: AxiosResponse) => {
        cookies.set('TOKEN', result.data.token, {
          path: '/',
          secure: true,
        });
        // Set another cookie with the user's MongoDB ID
        cookies.set('UUID', result.data.uuid, {
          path: '/',
          secure: true,
        });
        navigate('/home');
        setLogin(true);
        cookies.get('UUID');
      })
      .catch((error: AxiosError) => {
        setLogin(false);
        if (error.response && error.response.status === 400) {
          setErrorMessage('Invalid username or password');
        } else {
          setErrorMessage('Password or username is incorrect');
        }
      })
      .finally(() => {
        setLoginClicked(true);
      });
  };

  return (
    <div className="form-wrapper">
      <div className="titlebar">
        <h1>MovieMingle</h1>
      </div>
      <div className="text-container">
        <p className="description">Discover, decide, rate</p>
        <p className="description"> - your ultimate movie compass!</p>
      </div>
      <div className="register-form">
        <h2 className="title-form">Log In</h2>
        <form onSubmit={(e) => handleSubmit(e)} className="form-element">
          <div className="data-input-wrapper">
            <input
              className="data-input"
              type="text"
              placeholder="E-Mail or Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="data-input"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="forgot-password">
              <Link to="/reset-password">Forgot password?</Link>
            </p>
            {loading ? <div>Loading...</div> : null}
            <div
              className="error-message-container"
              data-testid="error-message"
            >
              {loginClicked && !login ? (
                <p data-testid="loginClicked" className="error">
                  {errorMessage}
                </p>
              ) : null}
            </div>
          </div>
          <div className="form-button">
            <button className="button" type="submit">
              Log In
            </button>
            <p className="link-text">
              Not registered yet?&nbsp;
              <Link className="link-to" to="/">
                Create an account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
