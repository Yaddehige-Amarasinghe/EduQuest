import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./forgotpassword.css"; 

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const navigate = useNavigate();
  