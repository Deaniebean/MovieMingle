import { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios, { AxiosResponse } from 'axios';
import React from 'react';
const cookies = new Cookies();

const Login = () => {

  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        getCookie('UUID')
      })
      .catch((error: Error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
        <p>
          Don't have an Account?<Link to="/"> Sign up here</Link>
        </p>
      </form>
      {login ? <p>Login Successful</p> : <p>Login Failed</p>}
    </div>
  );
};

export default Login;
function getCookie(arg0: string) {
  throw new Error('Function not implemented.');
}

