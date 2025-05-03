import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./forgotpassword.css"; 

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setIsSubmitting(true); 
    try {
      const response = await fetch("http://localhost:5000/reset-password-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setError(""); 
        setShowPopup(true); 
        setTimeout(() => {
          setShowPopup(false);
          navigate("/"); 
        }, 3000);
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <div className="image-container">
          <img src="pass.png" alt="Forgot Password" />
        </div>
        <div className="form-container">
          <h2>Forgot Your Password?</h2>
          <p>Enter your email address to reset your password.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isSubmitting} 
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting} 
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      </div>

      {showPopup && (
        <div className="popup-notification">
          <p>Reset link sent successfully! </p>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
