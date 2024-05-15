/* eslint-disable react-hooks/exhaustive-deps */
import React, { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios, { AxiosResponse } from 'axios';
import '../styles/globals.css';
import './Register.css';
const cookies = new Cookies();

interface RegisterProps { 
  setShowNavbar: (value: boolean) => void; 

}

const Login: React.FC<RegisterProps> = ({setShowNavbar}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [login, setLogin] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);
  const [loading, setLoading] = useState(false);


    useLayoutEffect(() => {
      setShowNavbar(false);
    }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

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
        getCookie('UUID');
      })
      .catch((error: Error) => {
        console.log(error);
        setLogin(false);
        setErrorMessage('Log In failed');
      })
      .finally(() => {
        setLoginClicked(true);
        setLoading(false);
      });
  };

  return (
    <div className="wrapper">
      <div className="titlebar">
        <h1>MovieMingle</h1>
      </div>
      <div className="textContainer">
        <p className="description">Discover, decide, rate</p>
        <p className="description"> - your ultimate movie compass!</p>
      </div>
      <div className="registerForm">
        <h2 className="title">Log In</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="dataInputWrapper">
            <input
              className="dataInput"
              type="text"
              placeholder="E-Mail or Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="dataInput"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="forgotPassword">
              <Link to="/reset-password">Forgot password?</Link>
            </p>
            {loading ? <div>Loading...</div> : null}
            <div className="errorMessageContainer">
              {loginClicked && !login ? (
                <p className="error">{errorMessage}</p>
              ) : null}
            </div>
          </div>
          <button className="button" type="submit">
            Log In
          </button>
          <p className="linkText">
            Not registered yet?&nbsp;
            <Link className="link" to="/">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
