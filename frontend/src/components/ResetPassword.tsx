import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios, { AxiosError } from 'axios';
import '../styles/globals.css';
import './Register.css';

//To-do: password strength meter

const cookies = new Cookies();

const ResetPassword = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [resetPassword, setResetPassword] = React.useState(false);
  const [resetPasswordClicked, setResetPasswordClicked] = useState(false);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check whether passwords match
    if (password !== verifyPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    // Send form data
    const configuration = {
      method: 'post',
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
          setErrorMessage('This username already exists');
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
    <div className='wrapper'>
      <div className='titlebar'>
        <h1>MovieMingle</h1>
      </div>
      <div className='textContainer'>
        <p className='text'>Discover, decide, rate</p>
        <p className='text'> - your ultimate movie compass!</p>
      </div>
      <div className='container'>
        <h2>Reset Password</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='dataInputWrapper'>
            <input
              className='dataInput'
              type="text"
              placeholder="E-Mail or Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className='dataInput'
              type="password"
              placeholder='New Password'
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className='dataInput'
              type="password"
              placeholder='Verify New Password'
              name="verifyPassword"
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
            />
            <div className='errorMessageContainer'>
              {(errorMessage && !resetPassword) || (resetPasswordClicked && !resetPassword) ? (
                <p className='error'>{errorMessage || 'You Are Not Registered'}</p>
              ) : null}
            </div>
          </div>
          <button className='button' type="submit">Reset Password</button>
          <p>Not registered yet?&nbsp; 
            <Link className='link' to="/">Create an account</Link>
          </p>
          <Link to="/login">
            <span className="back">&#8592; Back to Log IN</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
