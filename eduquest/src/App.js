import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Components/Login";
import SignupPage from "./Components/Signup";
import Header from "./Components/Header";
import ForgetPassword from "./Components/forgotpassword";
import ResetPassword from "./Components/resetpassword";
import AdminPanel from "./Components/admin";
import Home from "./Components/Home";
import Footer from "./Components/footer";
import CoursesPage from "./Components/courses";
import Services from "./Components/services";
import AboutUs from "./Components/aboutus";
import ContactPage from "./Components/contact";
import PaymentPage from "./Components/payment";
import ExplorePage from "./Components/explore";
import MaterialsPage from "./Components/materials";
import QuizzesPage from "./Components/quizes";
import VideoPage from "./Components/video";
import ProgressTracking from "./Components/progress";




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
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/material" element={<MaterialsPage />} />
        <Route path="/quizes" element={<QuizzesPage />} />
        <Route path="/video" element={<VideoPage />} />
        <Route path="/progress" element={<ProgressTracking />} />
        
      </Routes>
    </Router>
  );
}

export default App;
