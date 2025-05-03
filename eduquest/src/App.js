import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Components/Login";
import SignupPage from "./Components/Signup";
import Header from "./Components/Header";
import ForgetPassword from "./Components/forgotpassword";
import ResetPassword from "./Components/resetpassword";
import Home from "./Components/Home";
import Footer from "./Components/footer";
import CoursesPage from "./Components/courses";





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/header" element={<Header />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/forgotpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/courses" element={<CoursesPage />} />
       
      </Routes>
    </Router>
  );
}

export default App;
