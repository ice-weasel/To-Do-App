import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToDoFinal from "./ToDoFinal";
import "../components/styles.css";
import LoginPage from "./LoginPage";

interface User {
  name: string;
  email: string;
  password: string;
}

export default function HomePage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();
  const handleSignUp = () => {
    if (name && email && password && confirmPassword) {
      const user: User = {
        name,
        email,
        password,
      };

      localStorage.setItem("user", JSON.stringify(user));

      // Redirect logic here (useNavigate or other method)
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="bg-image">
      <div className="text-div">
        <h1 className="center-text">SIGN UP</h1>
      </div>
      <div className="container">
        <div className="signup-box">
          <div className="fields">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              className="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="email">Enter Email:</label>
            <input
              type="text"
              id="email"
              className="name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Password (4 to 8 characters):</label>
            <input
              type="password"
              id="password"
              className="name"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              className="name"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="signup-buttons">
            <button className="signup" onClick={handleSignUp}>
              Sign Up
              <div className="iconButton">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    fill="currentColor"
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                  ></path>
                </svg>
              </div>
            </button>
            
              <button className="signup" onClick ={() => navigate('/login-page')}>
                Login
                <div className="iconButton">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fill="currentColor"
                      d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    ></path>
                  </svg>
                </div>
              </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}
