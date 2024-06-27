/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios, { AxiosError } from 'axios';
import '../styles/globals.css';
import './Register.css';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';


const cookies = new Cookies();

interface ResetPasswordProps {
}

const ResetPassword: React.FC<ResetPasswordProps> = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [resetPassword, setResetPassword] = React.useState(false);
  const [resetPasswordClicked, setResetPasswordClicked] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check username is empty
    if (!username) {
      setErrorMessage('Please enter a username');
      return;
    }

    // Check password is empty
    if (!password) {
      setErrorMessage('Please enter a new password');
      return;
    }

    // Check verifyPassword is empty
    if (!verifyPassword) {
      setErrorMessage('Please verify your new password');
      return;
    }

    // Check whether passwords match
    if (password !== verifyPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    // Send form data
    const configuration = {
      method: 'put',
      url: 'http://localhost:8082/authenticate/reset-password',
      data: {
        username,
        password,
      },
    };
    axios(configuration)
      .then((result) => {
        console.log(result);
        cookies.set('TOKEN', result.data.token, {
          path: '/',
        });
        window.location.href = '/home';
        setResetPassword(true);
      })
      .catch((error: AxiosError) => {
        setResetPassword(false);
        if (error.response) {
          console.log('Error response data:', error.response.data);
          console.log('Error response status:', error.response.status);
          console.log('Error response headers:', error.response.headers);
          setErrorMessage('Username not found');
        } else if (error.request) {
          // The request was made but no response was received
          console.log('Error request:', error.request);
          setErrorMessage('reset password failed');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error message:', error.message);
          setErrorMessage('reset password failed');
        }
        console.log('Error config:', error.config);
      })
      .finally(() => {
        setResetPasswordClicked(true);
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
        <h2 className="title-form">Reset Password</h2>
        <form onSubmit={(e) => handleSubmit(e)} className="form-element">
          <div className="data-input-wrapper-reset-password">
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
              placeholder="New Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="data-input"
              type="password"
              placeholder="Verify New Password"
              name="verifyPassword"
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
            />
            <div className="error-message-container">
              {(errorMessage && !resetPassword) ||
              (resetPasswordClicked && !resetPassword) ? (
                <p className="error">
                  {errorMessage || 'You Are Not Registered'}
                </p>
              ) : null}
            </div>
          </div>
          <button className="button" type="submit">
            Reset Password
          </button>
          <p className="link-text">
            Not registered yet?&nbsp;
            <Link className="link-to" to="/">
              Create an account
            </Link>
          </p>
          <Link to="/login">
            <span className="go-back"><ArrowBackRoundedIcon /> Back to Log IN</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
