import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:5000/login", { email, password });
      
      toast.success("Your login is Successful ✅🚀", {
        position: "top-right",
        autoClose: 3000,
      });
      
     
      localStorage.setItem("token", response.data.token);
      
      
      setTimeout(() => navigate("/home"), 3000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed ❌", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="login-box">
        <div className="image-section">
          <img src="login.png" alt="Login Illustration" />
        </div>
        <div className="form-section">
          <h2>Welcome Back</h2>
          <p className="form-description">
            Log in to access your account and continue where you left off.
          </p>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <p className="signup-link">
            Don’t have an account? <Link to="/Signup">Create one here</Link>.
          </p>
          <p className="forgot-password">
            <Link to="/forgotpassword">Forgot your password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
