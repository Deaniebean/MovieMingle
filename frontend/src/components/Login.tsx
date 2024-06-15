/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios, { AxiosError, AxiosResponse } from 'axios';
import '../styles/globals.css';
import './Register.css';
const cookies = new Cookies();

interface RegisterProps {}

const Login: React.FC<RegisterProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [login, setLogin] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);
  const [loading, setLoading] = useState(false);

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
        console.log(result.data);

        cookies.set('TOKEN', result.data.token, {
          path: '/',
        });
        // Set another cookie with the user's MongoDB ID
        cookies.set('UUID', result.data.uuid, {
          path: '/',
        });
        window.location.href = '/home';
        setLogin(true);
        cookies.get('UUID');
      })
      .catch((error: AxiosError) => {
        console.log(error);
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
    <div className="wrapper">
      <div className="titlebar">
        <h1>MovieMingle</h1>
      </div>
      <div className="text-container">
        <p className="description">Discover, decide, rate</p>
        <p className="description"> - your ultimate movie compass!</p>
      </div>
      <div className="register-form">
        <h2 className="title-form">Log In</h2>
        {/* temp adding class of 'formElement' on form instead of styling element directly */}
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
            <div className="error-message-container">
              {loginClicked && !login ? (
                <p className="error">{errorMessage}</p>
              ) : null}
            </div>
          </div>
          <button className="button" type="submit">
            Log In
          </button>
          <p className="link-text">
            Not registered yet?&nbsp;
            <Link className="link-to" to="/">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
