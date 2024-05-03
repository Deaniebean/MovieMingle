import { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios, { AxiosResponse } from 'axios';
import '../styles/globals.css';
import '../styles/tailwind.css';
import './Register.css';



const cookies = new Cookies();

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [login, setLogin] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        });
        window.location.href = '/home';
        setLogin(true);
      })
      .catch((error: Error) => {
        console.log(error);
        setLogin(false);
        setErrorMessage('Log In failed');
      })
      .finally(() => {
        setLoginClicked(true);
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
        <h2>Log In</h2>
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
              placeholder='Password'
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className='forgotPassword'><Link to="/reset-password">Forgot password?</Link></p>
            <div className='errorMessageContainer'>
              {(loginClicked && !login) ? (
                <p className='error'>{errorMessage}</p>
              ) : null}
            </div>
          </div>
          <button className='button' type="submit">Log In</button>
          <p>
            Not registered yet?&nbsp; 
            <Link className='link' to="/">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
