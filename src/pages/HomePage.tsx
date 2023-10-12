import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/styles.css";


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
    // Retrieve the "users" data from local storage
    // Retrieve the "users" data from local storage
    const usersJSON = localStorage.getItem("users");

    if (usersJSON !== null) {
      // Parse the JSON string to get the array of users
      const users = JSON.parse(usersJSON);

      // Now, 'users' variable contains the array of user data
      console.log(users);
    } else {
      // Handle the case where the data is not found in local storage
      console.log("No user data found in local storage");
    }

    if (name && email && password && confirmPassword) {
      // Retrieve existing users or initialize an empty array
      if (password === confirmPassword) {
        const existingUsers: User[] = JSON.parse(
          localStorage.getItem("users") || "[]"
        );
        // Check if the user already exists with the same email
        const userExists = existingUsers.some((user) => user.email === email);

        if (userExists) {
          alert("User with the same email already exists.");
        } else {
          // Create a new user object
          const newUser: User = {
            name,
            email,
            password,
          };

          // Add the new user to the array
          existingUsers.push(newUser);

          // Store the updated array of users in local storage
          localStorage.setItem("users", JSON.stringify(existingUsers));

          // Redirect logic here (useNavigate or other method)
          alert("Sign up successful");
          navigate("/login-page"); // Redirect to the login page
        }
      } else {
        // Password and confirm password do not match, display an error.
        alert("Password and confirm password do not match.");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="bg-image">
      <div className="text-div">
        <h1 className="center-text">S I G N &nbsp; U P</h1>
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
            <button className="bn3" onClick={handleSignUp}>
              Sign Up
              
            </button>

            <button className="bn3" onClick={() => navigate("/login-page")}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
