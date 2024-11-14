import { Link } from "react-router-dom";
import "./style.css";

function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <img src="./src/assets/images/login-icon.gif" alt="Flower Icon" />
        </div>
        <h1>Welcome to <span className="brand">Spectre</span></h1>
        <p>Securely Log In and Get Started!</p>
        <form>
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
          <a href="#" className="forgot-password">Forgot password?</a>
        </form>
        <div className="signup-link">
          <Link to="/signup">Sign-up now</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
