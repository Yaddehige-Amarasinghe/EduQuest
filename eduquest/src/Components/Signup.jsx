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