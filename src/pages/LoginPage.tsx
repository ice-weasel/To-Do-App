import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/styles.css";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Retrieve the array of users from local storage
    const usersJSON = localStorage.getItem("users");
    
    if (usersJSON) {
      const users = JSON.parse(usersJSON);

      // Find a user with matching email and password
      const matchingUser = users.find((user: { email: string; password: string; }) => user.email === email && user.password === password);

      if (matchingUser) {
        // Login successful, you can redirect or perform any other action here
        localStorage.setItem("loggedInUser", JSON.stringify(usersJSON));
       
        navigate("/to-do-final");
      } else {
        // Login failed
        alert("Login failed. Please check your email and password.");
      }
    } else {
      // No users found in local storage
      alert("No users found. Please sign up first.");
    }
  };
  return (
    <div className="bg-image">
      <div className="text-div">
        <h1 className="center-text">L O G&nbsp;I N</h1>
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
            <button className="bn3" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;