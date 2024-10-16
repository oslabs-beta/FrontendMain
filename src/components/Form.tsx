// import * as React from 'react';
import { useState } from "react";
import OAuth from "./OAuth";
import { motion } from "framer-motion";
import "../css/App.css";
import AccountCreatedModal from "./AccountCreatedPopup";
import { handleLoginClick } from "../helpers/handleLoginClick";
import { handleSignupClick } from "../helpers/handleSignupClick";
import { useNavigate } from "react-router-dom";


function Form(): JSX.Element  {
  const [signInEmail, setSignInEmail] = useState<string>("");
  const [signInPassword, setSignInPassword] = useState<string>("");
  const [signUpEmail, setSignUpEmail] = useState<string>("");
  const [signUpPassword, setSignUpPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isSignupPage, setIsSignupPage] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [pwdSignInNotConfirmed, setSignInNotPwdConfirmed] = useState<boolean>(false);
  const [pwdSignUpNotConfirmed, setSignUpNotPwdConfirmed] = useState<boolean>(false);
  const [emailSignInIsNotValid, setSignInEmailIsNotValid] = useState<boolean>(false);
  const [emailSignUpIsNotValid, setSignUpEmailIsNotValid] = useState<boolean>(false);
  const navigate = useNavigate();

  

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
    if(validateEmail(email)) {
      try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, password: password, confirmPassword: confirmPassword }),
        })
        console.log(response);
        if(response.ok){
          console.log('successful signup');
          setShowPopup(true);
        } else {
          const errorData = await response.json();
          if(errorData === "Passwords given do not match") {
            setSignUpNotPwdConfirmed(true);
          }
        }
      } catch (error) {
        console.log('signup failed',error);
      }  
    } else {
      setSignUpEmailIsNotValid(true);
    }
    
  };

  const validateEmail:(email: string) => boolean = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
  
  const handleSigninSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string,
  ): void => {
    e.preventDefault();
    setSignInNotPwdConfirmed(false);
    setSignInEmailIsNotValid(false);
    if(validateEmail(email)) {
      fetch('/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password }),
      })
      .then(result => result.json())
      .then((result) => {
           if(result.success === true) {
            navigate('/dash');
            } else {
            console.log(result,"22222");
              if(result.message === "user authentication failed") {
                setSignInNotPwdConfirmed(true);
              }
            }
           })
      .catch((error) => 
        console.log(error, "ERROR in SIGNIN")
      );
    } else {
      setSignInEmailIsNotValid(true);
    }
   
  };

  return (
    <>
        <div
          className={`containerbox ${isSignupPage ? "active" : ""}`}
          id="container"
        >
          {/* sign-up */}
          <div className="form-container sign-up">
            <form onSubmit={ async (e) => handleSignUpSubmit(e, signUpEmail, signUpPassword, confirmPassword)}>
              <p className="greetings">Join us today!</p>
              <br></br>
              <br></br>
              <input
                required
                type="text"
                placeholder="Email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
              />
              <input
                required
                type="password"
                placeholder="Password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
              />
              <input
                required
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {pwdSignUpNotConfirmed && <p style={{color:'red',margin:0}}>Please confirm your password again.</p>}
              {emailSignUpIsNotValid && <p style={{color:'red',margin:0}}>Please enter a valid email.</p>}
              <button type="submit">Create Account</button>
              <OAuth />
            </form>
            <AccountCreatedModal modalShow={showPopup} handleModalClose={() => setShowPopup(false)} />
          </div>

          {/* sign-in */}
          <div className="form-container sign-in">
            <form onSubmit={(e) => handleSigninSubmit(e, signInEmail, signInPassword)}>
              <p className="greetings">Welcome back!</p>
              <input
                required
                type="text"
                placeholder="Email"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
              />
              <input
                required
                type="password"
                placeholder="Password"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
              />
              {pwdSignInNotConfirmed && <p style={{color:'red',margin:0}}>There is something wrong with your sign in.</p>}
              {emailSignInIsNotValid && <p style={{color:'red',margin:0}}>Please enter a valid email.</p>}
              <button type="submit">Sign In</button>
              <p>
                Forgot password?
                <span>
                  <a href="#">Reset password 🔓</a>
                </span>
              </p>
              <OAuth />
            </form>
          </div>

          {/* toggle */}
          <div className="toggle-container">
            <div className="toggle">
              <div
                className={`toggle-panel toggle-left ${
                  isSignupPage ? "" : "active"
                }`}
              >
                <p>Get started with</p> <span id="name"> StreamForge</span>
                <motion.button
                  className="hidden"
                  onClick={() => handleLoginClick(setIsSignupPage)}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Sign In
                </motion.button>
              </div>
              <div
                className={`toggle-panel toggle-right ${
                  isSignupPage ? "active" : ""
                }`}
              >
                <p id="name">StreamForge</p>
                <motion.button
                  className="hidden"
                  onClick={() => handleSignupClick(setIsSignupPage)}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
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
