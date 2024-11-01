import retreiveUserQueryMap from '../helpers/retreiveUserQueryMap';
import { useEffect, useState, useRef } from 'react';
import OAuth from './OAuth';
import { motion } from 'framer-motion';
import '../css/App.css';
import AccountCreatedModal from './AccountCreatedPopup';
import { handleLoginClick } from '../helpers/handleLoginClick';
import { handleSignupClick } from '../helpers/handleSignupClick';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useGettingContext, loginTypes } from './AuthContext';
const github_clientID = import.meta.env.VITE_GITHUB_CLIENTID;
const google_clientID = import.meta.env.VITE_GOOGLE_CLIENTID;
const API_URL = import.meta.env.VITE_API_URL;
const google_redirect_uri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
const backend_url = import.meta.env.VITE_BACKEND_URL;
export const LogOutGithub = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('githubJwtToken');
  localStorage.removeItem('githubRefreshJwtToken');
};

interface FormProps {
  setQueries: React.Dispatch<React.SetStateAction<{ [key: string]: string[] }>>;
}

function Form({ setQueries }: FormProps): JSX.Element {
  const [signInEmail, setSignInEmail] = useState<string>('');
  const [signInPassword, setSignInPassword] = useState<string>('');
  const [signUpEmail, setSignUpEmail] = useState<string>('');
  const [signUpPassword, setSignUpPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isSignupPage, setIsSignupPage] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [pwdSignInNotConfirmed, setSignInNotPwdConfirmed] =
    useState<boolean>(false);
  const [pwdSignUpNotConfirmed, setSignUpNotPwdConfirmed] =
    useState<boolean>(false);
  const [emailSignInIsNotValid, setSignInEmailIsNotValid] =
    useState<boolean>(false);
  const [emailSignUpIsNotValid, setSignUpEmailIsNotValid] =
    useState<boolean>(false);
  const [isSigupEmailPwdNotValid, setIsSigupEmailPwdNotValid] =
    useState<boolean>(false);
  const [isPwdShown, setIsPwdShown] = useState<boolean>(false);
  const [isSignInEmailNotValid, setIsSignInEmailNotValid] =
    useState<boolean>(false);
  const gitOAuthCalledRef = useRef<boolean>(false);
  const {
    setLoginGateway,
    isGoogleLoginFailed,
    setGithubLoginFailed,
    isGithubLoginFailed,
  } = useGettingContext();
  // const [isLoading, setIsloading] = useState<boolean>(true);
  const navigate = useNavigate();
  const loginWithGithub = (): void => {
    //assign() will add URL to history in browser
    setLoginGateway('github');
    //react state will be reset by window.location.assign, store value in localStorage to keep track of it
    localStorage.setItem('loginGateway', 'github');
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${github_clientID}`
    );
  };
  const generateRandomState = () => Math.random().toString(36).substring(2, 15);
  const handleGoogleLogin = (): void => {
    setLoginGateway('google');
    //generating random state
    const state = generateRandomState();
    //store state in sessionStorage
    sessionStorage.setItem('googleOAuthState', state);
    const googleAuthUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${google_clientID}&` +
      `access_type=offline&` +
      `response_type=code&` +
      `state=${encodeURIComponent(state)}&` +
      `redirect_uri=${encodeURIComponent(google_redirect_uri)}&` +
      `scope=${encodeURIComponent('email profile')}`;
    // +`&prompt=consent`;
    //redirect to google login page
    window.location.assign(googleAuthUrl);
  };

  //since we used <OAuth> twice in root page, this useEffect can only be implemented in root page instead of OAuth component to avoid duplicate API calls
  useEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const githubCode = params.get('code');
    const accessToken = localStorage.getItem('accessToken');
    //check if we can find accessToken in localStorage, if so call getUserData directly, if not we call API to get accessToken from backend;
    if (accessToken && githubCode) {
      getUserData();
    } else if (githubCode && !gitOAuthCalledRef.current && !accessToken) {
      gitOAuthCalledRef.current = true;
      fetch(`${API_URL}/getAccessToken?code=${githubCode}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data, 'data in getting accessToken');
          if (data.access_token) {
            localStorage.setItem('accessToken', data.access_token);
            getUserData();
          }
        })
        .catch((error) => {
          console.log(error, 'error in getting accessToken from frontend');
        });
    }
  }, []);

  const getUserData = (): void => {
    setGithubLoginFailed(false);
    fetch(`${API_URL}/getUserData`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch user data');
        }
      })
      .then((data) => {
        console.log(data, 'getUserData');
        if (data.success && data.jwtToken) {
          localStorage.setItem('githubJwtToken', data.jwtToken);
          localStorage.setItem('githubRefreshJwtToken', data.refreshToken);
          navigate('/config', { replace: true });
        } else {
          //fail to get userData back means your accessToken is no longer valid, remove everything in localStorage and login again
          LogOutGithub();
          setGithubLoginFailed(true);
          setLoginGateway('standard');
          console.log('fail to get user data or getting jwt');
        }
      })
      .catch((error) => {
        LogOutGithub();
        setGithubLoginFailed(true);
        setLoginGateway('standard');
        console.log(error, 'error in getting user data front end');
      });
  };
  const handleOAuthClick = (type: loginTypes): void => {
    if (type === 'github') {
      loginWithGithub();
      return;
    }
    if (type === 'facebook') {
      console.log('Facebook');
      return;
    }
    if (type === 'google') {
      handleGoogleLogin();
      return;
    }
  };

  const handleSignUpSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<void> => {
    e.preventDefault();
    setShowPopup(false);
    setSignUpNotPwdConfirmed(false);
    setSignUpEmailIsNotValid(false);
    setIsSigupEmailPwdNotValid(false);
    if (validateEmail(email)) {
      try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            password: password,
            confirmPassword: confirmPassword,
          }),
        });
        console.log(response);
        if (response.ok) {
          console.log('successful signup');
          setShowPopup(true);
        } else {
          const errorData = await response.json();
          if (errorData === 'Passwords given do not match') {
            setSignUpNotPwdConfirmed(true);
          }
          if (errorData.err === 'Could not create account') {
            setIsSigupEmailPwdNotValid(true);
          }
        }
      } catch (error) {
        console.log('signup failed', error);
      }
    } else {
      setSignUpEmailIsNotValid(true);
    }
  };

  const validateEmail: (email: string) => boolean = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSigninSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ): void => {
    e.preventDefault();
    setSignInNotPwdConfirmed(false);
    setSignInEmailIsNotValid(false);
    setIsSignInEmailNotValid(false);
    if (validateEmail(email)) {
      fetch(`/api/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password }),
        credentials: 'include',
      })
        .then((result) => result.json())
        .then((result) => {
          if (result.success === true) {
            navigate('/config');
          } else {
            if (result.message === 'user authentication failed') {
              setSignInNotPwdConfirmed(true);
            }
          }
          if (result.err === 'Error in verifying user') {
            setIsSignInEmailNotValid(true);
          }
        })
        .then(() => {
          return retreiveUserQueryMap();
        })
        .then((updatedQueries) => {
          setQueries(updatedQueries);
        })
        .catch((error) => console.log(error, 'ERROR in SIGNIN'));
    } else {
      setSignInEmailIsNotValid(true);
    }
  };

  return (
    <>
      <div
        className={`containerbox ${isSignupPage ? 'active' : ''}`}
        id='container'
      >
        {/* sign-up */}
        <div className='form-container sign-up'>
          <form
            onSubmit={async (e) =>
              handleSignUpSubmit(
                e,
                signUpEmail,
                signUpPassword,
                confirmPassword
              )
            }
          >
            <p className='greetings'>Join us today!</p>
            <br></br>
            <br></br>
            <input
              required
              type='text'
              placeholder='Email'
              value={signUpEmail}
              onChange={(e) => setSignUpEmail(e.target.value)}
            />
            <div style={{ width: '40%', position: 'relative' }}>
              <input
                required
                type={`${isPwdShown ? 'text' : 'password'}`}
                placeholder='Password'
                value={signUpPassword}
                className='password-input'
                onChange={(e) => setSignUpPassword(e.target.value)}
              />
              <button
                type='button'
                className='toggle-password-btn'
                onClick={() => setIsPwdShown(!isPwdShown)}
              >
                <i
                  className={`bi bi-eye${isPwdShown ? '-slash' : ''} eyeicon`}
                ></i>
              </button>
            </div>
            <div style={{ width: '40%', position: 'relative' }}>
              <input
                required
                type={`${isPwdShown ? 'text' : 'password'}`}
                placeholder='Confirm Password'
                value={confirmPassword}
                className='password-input'
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                //specify button type to be "type" or it will cause the form submit
                type='button'
                className='toggle-password-btn'
                onClick={() => setIsPwdShown(!isPwdShown)}
              >
                <i
                  className={`bi bi-eye${isPwdShown ? '-slash' : ''} eyeicon`}
                ></i>
              </button>
            </div>
            {pwdSignUpNotConfirmed && (
              <p style={{ color: 'red', margin: 0 }}>
                Please confirm your password again.
              </p>
            )}
            {emailSignUpIsNotValid && (
              <p style={{ color: 'red', margin: 0 }}>
                Please enter a valid email.
              </p>
            )}
            {isSigupEmailPwdNotValid && (
              <p style={{ color: 'red', margin: 0 }}>
                Invalid email or password.
              </p>
            )}
            {isGithubLoginFailed && (
              <p style={{ color: 'red', margin: 0 }}>
                Github login failed. Please try again.
              </p>
            )}
            {isGoogleLoginFailed && (
              <p style={{ color: 'red', margin: 0 }}>
                Google login failed. Please try again.
              </p>
            )}
            <button type='submit'>Create Account</button>
            <OAuth handleOAuthClick={handleOAuthClick} />
          </form>
          <AccountCreatedModal
            modalShow={showPopup}
            handleModalClose={() => setShowPopup(false)}
          />
        </div>

        {/* sign-in */}
        <div className='form-container sign-in'>
          <form
            onSubmit={(e) => handleSigninSubmit(e, signInEmail, signInPassword)}
          >
            <p className='greetings'>Welcome back!</p>
            <input
              required
              type='text'
              placeholder='Email'
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
            />
            <input
              required
              type='password'
              placeholder='Password'
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
            />
            {pwdSignInNotConfirmed && (
              <p style={{ color: 'red', margin: 0 }}>
                There is something wrong with your sign in.
              </p>
            )}
            {emailSignInIsNotValid && (
              <p style={{ color: 'red', margin: 0 }}>
                Please enter a valid email.
              </p>
            )}
            {isSignInEmailNotValid && (
              <p style={{ color: 'red', margin: 0 }}>
                Your email or password is not valid
              </p>
            )}
            {isGithubLoginFailed && (
              <p style={{ color: 'red', margin: 0 }}>
                Github login failed. Please try again.
              </p>
            )}
            {isGoogleLoginFailed && (
              <p style={{ color: 'red', margin: 0 }}>
                Google login failed. Please try again.
              </p>
            )}
            <button type='submit'>Sign In</button>
            <p>
              Forgot password?
              <span>
                <a href='#'>Reset password 🔓</a>
              </span>
            </p>
            <OAuth handleOAuthClick={handleOAuthClick} />
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
              <img
                className='logo'
                src='src/assets/steamForge-logo.png'
                style={{ height: '250px' }}
              />
              <p>Get started with</p> <span id='name'> StreamForge</span>
              <motion.button
                className='hidden'
                onClick={() => handleLoginClick(setIsSignupPage)}
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
              {
                <img
                  className='logo'
                  src='src/assets/steamForge-logo.png'
                  style={{ height: '250px' }}
                />
              }
              <p id='name'>StreamForge</p>
              <motion.button
                className='hidden'
                onClick={() => handleSignupClick(setIsSignupPage)}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Sign Up
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
