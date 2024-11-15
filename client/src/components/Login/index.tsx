import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // To show loading state

  // Handle username input
  const handleSetUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value.trim());
  };

  // Handle password input
  const handleSetPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value.trim());
  };

  // Validate inputs
  const validateInputs = () => {
    setError(""); // Reset error state

    // Basic validation to ensure both fields are filled
    if (!username || !password) {
      setError("Both username and password are required.");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    if (!validateInputs()) {
      return; // Stop submission if validation fails
    }

    setIsSubmitting(true); // Start loading

    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
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

      if (response.ok) {
        // Handle success (redirect to dashboard or home page)
        console.log("Login successful!", data);
        // Redirect or store auth token as needed
      } else {
        // Handle error (e.g., invalid credentials)
        setError(data.message || "An error occurred during login.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
      console.log(err);
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <img src="./src/assets/images/login-icon.gif" alt="Flower Icon" />
        </div>
        <h1>
          Welcome to <span className="brand">Spectre</span>
        </h1>
        <p>Securely Log In and Get Started!</p>
        <form onSubmit={handleSubmitLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleSetUsername}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleSetPassword}
            required
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
          {error && <div className="error-message">{error}</div>}
          <a href="#" className="forgot-password">
            Forgot password?
          </a>
        </form>
        <div className="signup-link">
          <Link to="/signup">Sign-up now</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
