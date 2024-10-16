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
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isSignupPage, setIsSignupPage] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [pwdNotConfirmed, setNotPwdConfirmed] = useState<boolean>(false);
  const navigate = useNavigate();

  

  const handleSignUpSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<void> => {
     
    e.preventDefault();
    setShowPopup(false);
    setNotPwdConfirmed(false);
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password, confirmPassword: confirmPassword }),
      })
      console.log(response);
      if(response.ok){
        console.log('successful signup')
        setShowPopup(true);
      } else {
        const errorData = await response.json();
        if(errorData === "Passwords given do not match") {
          setNotPwdConfirmed(true);
        }
      }
    } catch (error) {
      console.log('signup failed',error);
    }
    
  };
  
  const handleSigninSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string,
  ): void => {
    console.log('sign in clicked')
    e.preventDefault();
    setNotPwdConfirmed(false);
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
          // if(result.message === "user authentication failed") {
          //   setNotPwdConfirmed(true);
          // }
          }
         })
    .catch((error) => 
      console.log(error, "ERRORSIGNIN")
    );
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
          className={`containerbox ${isSignupPage ? "active" : ""}`}
          id="container"
        >
          {/* sign-up */}
          <div className="form-container sign-up">
            <form onSubmit={ async (e) => handleSignUpSubmit(e, email, password, confirmPassword)}>
              <p className="greetings">Join us today!</p>
              <br></br>
              <br></br>
              <input
                required
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                required
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                required
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {pwdNotConfirmed && <p style={{color:'red',margin:0}}>Please confirm your password again.</p>}
              <button type="submit">Create Account</button>
              <OAuth />
            </form>
            <AccountCreatedModal modalShow={showPopup} handleModalClose={() => setShowPopup(false)} />
          </div>

          {/* sign-in */}
          <div className="form-container sign-in">
            <form onSubmit={(e) => handleSigninSubmit(e, email, password)}>
              <p className="greetings">Welcome back!</p>
              <input
                required
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                required
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {pwdNotConfirmed && <p style={{color:'red',margin:0}}>Please confirm your password again.</p>}
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
      </body>
    </>
  );
}

export default Form;
