/* eslint-disable react-hooks/exhaustive-deps */
import React, { useLayoutEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios, { AxiosError } from 'axios';
import '../styles/globals.css';
import './Register.css';

//To-do: password strength meter

const cookies = new Cookies();

interface RegisterProps {
  setShowNavbar: (value: boolean) => void;
}

const Register: React.FC<RegisterProps> = ({ setShowNavbar }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [register, setRegister] = React.useState(false);
  const [registerClicked, setRegisterClicked] = useState(false);

  useLayoutEffect(() => {
    setShowNavbar(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check whether passwords match
    if (password !== verifyPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    // Send form data
    const configuration = {
      method: 'post',
      url: 'http://localhost:8082/authenticate/register',
      data: {
        username,
        password,
      },
    };
    try {
      const result = await axios(configuration);
      console.log(result);
      cookies.set('TOKEN', result.data.token, {
        path: '/',
      });
      window.location.href = '/home';
      setRegister(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setRegister(false);
        if (error.response) {
          console.log('Error response data:', error.response.data);
          console.log('Error response status:', error.response.status);
          console.log('Error response headers:', error.response.headers);
          setErrorMessage('This username already exists');
        } else if (error.request) {
          // The request was made but no response was received
          console.log('Error request:', error.request);
          setErrorMessage('Registration failed');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error message:', error.message);
          setErrorMessage('Registration failed');
        }
        console.log('Error config:', error.config);
      }
    } finally {
      setRegisterClicked(true);
    }
  };
  return (
    <div className="wrapper">
      <div className="titlebar">
        <h1>MovieMingle</h1>
      </div>
      <div className="textContainer">
        <p className="text">Discover, decide, rate</p>
        <p className="text"> - your ultimate movie compass!</p>
      </div>
      <div className="container">
        <h2>Register</h2>
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
            <input
              className="dataInput"
              type="password"
              placeholder="Verify Password"
              name="verifyPassword"
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
            />
            <div className="errorMessageContainer">
              {(errorMessage && !register) || (registerClicked && !register) ? (
                <p className="error">
                  {errorMessage || 'You Are Not Registered'}
                </p>
              ) : null}
            </div>
          </div>
          <button className="button" type="submit">
            Register
          </button>
          <p>
            Already have an account?&nbsp;
            <Link className="link" to="/login">
              Log In now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
