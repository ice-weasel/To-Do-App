import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/styles.css";

interface User {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}") as User;

    if (storedUser.email === email && storedUser.password === password) {
      // Login successful, you can redirect or perform any other action here
      alert("Login successful");
      // Redirect to another page or perform further actions
      navigate("/dashboard"); // Replace '/dashboard' with the desired route
    } else {
      // Login failed
      alert("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="bg-image">
      <div className="text-div">
        <h1 className="center-text">LOGIN</h1>
      </div>
      <div className="container">
        <div className="signup-box">
          <div className="fields">
            <label htmlFor="email">Enter Email:</label>
            <input
              type="text"
              id="email"
              className="name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="name"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="signup-buttons">
            <button className="signup" onClick={handleLogin}>
              Login
              <Link to="/ToDoFinal">
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
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
