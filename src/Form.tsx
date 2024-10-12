import * as React from "react";
import { useState } from "react";
import OAuth from "./OAuth";
import "./css/App.css";

const Form: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSignupPage, setIsSignupPage] = useState<boolean>(false);

  const handleSignUpSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): void => {
    e.preventDefault();
    await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
  ): void => {
    e.preventDefault();
    await fetch("/api/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
          className={`container ${isSignupPage ? "active" : ""}`}
          id="container"
        >
          {/* sign-up */}
          <div className="form-container sign-up">
            <form onSubmit={handleSignUpSubmit}>
              <h4>
                Already have an account? <a>Sign in here</a>
              </h4>
              <OAuth />
              <input
                required
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                required
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                required
                type="text"
                placeholder="Confirm Password"
                value={password}
              />
              <button type="submit">Create Account</button>
            </form>
          </div>
          {/* sign-in */}
          <div className="form-container sign-in">
            <form onSubmit={handleSigninSubmit}>
              <p>Sign In</p>
              <div className="oauth-icons">
                <OAuth />
              </div>
              <input
                required
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                required
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p>Forgot password?</p>
              <button type="submit">Sign In</button>
            </form>
          </div>
          <div className="toggle-container">
            <div className="toggle">
              <div
                className={`toggle-panel toggle-left ${
                  isSignupPage ? "" : "active"
                }`}
              >
                <h1>Get started with StreamForge</h1>
                <button
                  className="hidden"
                  id="login"
                  onClick={handleLoginClick}
                >
                  Sign In
                </button>
              </div>
              <div
                className={`toggle-panel toggle-right ${
                  isSignupPage ? "active" : ""
                }`}
              >
                <h1>PLACEHOLDER</h1>
                <button
                  className="hidden"
                  id="register"
                  onClick={handleSignupClick}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default Form;
