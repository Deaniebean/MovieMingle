import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';

// Styles
import '../styles/globals.css';
import './Register.css';

const cookies = new Cookies();

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [register, setRegister] = React.useState(false);
  const [registerClicked, setRegisterClicked] = useState(false);

  const location = useLocation();

  useEffect(() => {
    // Function to clear the UUID cookie if user logs out or navigates to register route
    const clearAllCookies = () => {
      cookies.remove('UUID');
      cookies.remove('TOKEN');
    };

    // Check if the current page is login or sign-up
    if (location.pathname === '/') {
      clearAllCookies();
    }
  }, [location.pathname]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
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
  
    // Check verifyPassword is empty
    if (!verifyPassword) {
      setErrorMessage('Please verify your password');
      return;
    }
  
    // Check whether passwords match
    if (password !== verifyPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
  
    // Send form data
    const configuration = {
      method: 'post',
      url: `${import.meta.env.VITE_API_URL}/authenticate/register`,
      data: {
        username,
        password,
      },
    };
    try {
      console.log('📡 Sending request...');
      const result = await axios(configuration);
      console.log('✅ Registration successful:', result.data);
      
      cookies.set('TOKEN', result.data.token, {
        path: '/',
      });
      // Set another cookie with the user's MongoDB ID
      cookies.set('UUID', result.data.uuid, {
        path: '/',
      });
  
      // Verify cookies are set
      const token = cookies.get('TOKEN');
      const uuid = cookies.get('UUID');
      if (!token || !uuid) {
        throw new Error('User UUID not found in cookies');
      }
  
    // Redirect to home page
      window.location.href = '/home';
      setRegister(true);
  
    } catch (error) {
      console.error('❌ Registration failed:', error);
      
      if (axios.isAxiosError(error)) {
        console.error('📡 Axios error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers
        });
        
        setRegister(false);
        if (error.response) {
          if (
            error.response.data.code === 11000 ||
            error.response.data.code === 11001
          ) {
            setErrorMessage('This username already exists');
          } else {
            setErrorMessage('This username already exists');
          }
        } else if (error.request) {
          // The request was made but no response was received
          setErrorMessage('Registration failed');
        } else {
          // Something happened in setting up the request that triggered an Error
          setErrorMessage('Registration failed');
        }
      }
    } finally {
      setRegisterClicked(true);
    }
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
        <h2 className="title-form">Register</h2>
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
            <input
              className="data-input"
              type="password"
              placeholder="Verify Password"
              name="verifyPassword"
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
            />
            <div className="error-message-container">
              {(errorMessage && !register) || (registerClicked && !register) ? (
                <p className="error">
                  {errorMessage || 'You Are Not Registered'}
                </p>
              ) : null}
            </div>
          </div>
          <div className="form-button">
            <button className="button" type="submit">
              Register
            </button>
            <p className="link-text">
              Already have an account?&nbsp;
              <Link className="link-to" to="/login">
                Log In now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
