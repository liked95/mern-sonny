import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSetUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Sanitize input by trimming spaces
    setUsername(event.target.value.trim());
  };

  const handleSetPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Sanitize input by trimming spaces
    setPassword(event.target.value.trim());
  };

  const validateInputs = () => {
    // Reset error state
    setError("");

    // Check if username and password meet length requirements
    if (username.length < 4) {
      setError("Username must be at least 4 characters long.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }

    // Additional validations (e.g., regex for allowed characters)
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      setError("Username can only contain letters, numbers, and underscores.");
      return false;
    }

    return true;
  };

  const handleSubmitSignupAccount = async (
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!validateInputs()) {
      return; // Stop submission if validation fails
    }

    console.log({
      username,
      password,
    });

    try {
      const response = await fetch("http://localhost:8000/api/auth/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error during signing up account: ", error)
    }

    // Clear input fields after successful submission
    setUsername("");
    setPassword("");
    setError("");
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="signup-logo">
          <img src="./src/assets/images/login-icon.gif" alt="Flower Icon" />
        </div>
        <h1>
          Join <span className="brand">Spectre</span>
        </h1>
        <p>Create an account to get started!</p>

        {/* Display error message if validation fails */}
        {error && <p className="error-message">{error}</p>}

        <form>
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={handleSetUsername}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={handleSetPassword}
          />
          <button type="submit" onClick={handleSubmitSignupAccount}>
            Sign Up
          </button>
        </form>
        <div className="login-link">
          <p>Already have an account?</p>
          <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
