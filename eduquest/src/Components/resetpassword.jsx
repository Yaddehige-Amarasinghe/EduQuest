import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./resetpassword.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate(); 
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setShowPopup(false);

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    
    setSuccessMessage("Password has been successfully reset!");
    setShowPopup(true);

   
    setTimeout(() => {
      setShowPopup(false);
      navigate("/login"); 
    }, 3000);
  };

  return (
    <div className="reset-password-container">
      {}
      {showPopup && (
        <div className="popup-message">
          ✅ Password reset successfully! Redirecting to login...
        </div>
      )}

      <div className="reset-password-box">
        {}
        <div className="reset-password-image">
          <img src="reset.png" alt="Reset Password" />
        </div>

        {}
        <div className="reset-password-form">
          <h2>Reset Your Password</h2>
          <p>Enter your new password below to reset your account.</p>

          {error && <p className="error">{error}</p>}
          {successMessage && <p className="success">{successMessage}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
              />
            </div>

            <button type="submit" className="reset-btn">Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
