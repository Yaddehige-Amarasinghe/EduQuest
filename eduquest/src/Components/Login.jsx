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
      
      // Store token (optional)
      localStorage.setItem("token", response.data.token);
      
      // Redirect to dashboard after delay
      setTimeout(() => navigate("/home"), 3000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed ❌", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

 