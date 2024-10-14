import * as React from 'react';
import { useState} from 'react';
import OAuth from './OAuth';
import { motion } from 'framer-motion';
import './css/App.css';

const Form: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isSignupPage, setIsSignupPage] = useState<boolean>(false);

  const handleSignUpSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => response.json())
      .then(
        (response) => console.log(response)

        //set cookie?
      )
      .catch((error) => console.log(error));
  };

  const handleSigninSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    await fetch('/api/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => response.json())
      .then(
        (response) => console.log(response)
        //set cookie?
      )
      .catch((error) => console.log(error));
  };

  const handleSignupClick = () => {
    setIsSignupPage(true);
  };

  const handleLoginClick = () => {
    setIsSignupPage(false);
  };

  return (
    <>
      <head>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');
        </style>
      </head>

      <body>
        <div
          className={`containerbox ${isSignupPage ? 'active' : ''}`}
          id='container'
        >
          {/* sign-up */}
          <div className='form-container sign-up'>
            <form onSubmit={handleSignUpSubmit}>
              <p className='greetings'>Join us today!</p>
              <br></br>
              <br></br>
              <input
                required
                type='text'
                placeholder='Email'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                required
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                required
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type='submit'>Create Account</button>
              <OAuth />
            </form>
          </div>

          {/* sign-in */}
          <div className='form-container sign-in'>
            <form onSubmit={handleSigninSubmit}>
              <p className='greetings'>Welcome back!</p>
              <input
                required
                type='text'
                placeholder='Email'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                required
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type='submit'>Sign In</button>
              <p>
                Forgot password?
                <span>
                  <a href='#'>Reset password 🔓</a>
                </span>
              </p>
              <OAuth />
            </form>
          </div>

          {/* toggle */}
          <div className='toggle-container'>
            <div className='toggle'>
              <div
                className={`toggle-panel toggle-left ${
                  isSignupPage ? '' : 'active'
                }`}
              >
                <p>
                  Get started with <span id='name'> StreamForge</span>
                </p>
                <motion.button
                  className='hidden'
                  onClick={handleLoginClick}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  Sign In
                </motion.button>
              </div>
              <div
                className={`toggle-panel toggle-right ${
                  isSignupPage ? 'active' : ''
                }`}
              >
                <p id='name'>StreamForge</p>
                <motion.button
                  className='hidden'
                  onClick={handleSignupClick}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  Sign Up
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default Form;
