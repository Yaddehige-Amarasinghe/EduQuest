import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./signup.css";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:5000/signup", { name, email, password });
      
      toast.success("You Created Account Successfully ✅🚀", {
        position: "top-right",
        autoClose: 3000,
      });
      
     
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup Failed ❌", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer />
      <div className="signup-box">
        <div className="image-section">
          <img src="Sign up.png" alt="Signup Illustration" />
        </div>
        <div className="form-section">
          <h2>Signup</h2>
          <p className="form-description">
            Join us today! Enter your details below to get started.
          </p>
          <form onSubmit={handleSignup}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="signup-button">
              Signup
            </button>
          </form>
          <p className="login-link">
            Already have an account? <Link to="/">Login here</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
