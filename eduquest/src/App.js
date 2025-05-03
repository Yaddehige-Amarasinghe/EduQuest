import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Components/Login";
import SignupPage from "./Components/Signup";
import Header from "./Components/Header";
import ForgetPassword from "./Components/forgotpassword";
import ResetPassword from "./Components/resetpassword";
import Footer from "./Components/footer";





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/header" element={<Header />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/forgotpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        
      </Routes>
    </Router>
  );
}

export default App;
