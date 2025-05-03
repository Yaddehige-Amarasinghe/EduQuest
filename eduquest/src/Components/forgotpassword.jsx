import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./forgotpassword.css"; // Assuming the CSS file exists for styling

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission status
  const navigate = useNavigate(); // Initialize useNavigate

  