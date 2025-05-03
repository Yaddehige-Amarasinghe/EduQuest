import React from "react";
import Header from "./Header"; 
import Footer from "./footer"; 
import "./aboutus.css";

const AboutUs = () => {
  return (
    <div>
      {}
      <Header />

      {}
      <section className="about-section">
        <div className="about-container">
          {}
          <div className="about-content">
            <h1 className="about-title">About Us</h1>
            <p className="about-description">
              Welcome to <span className="company-name">EduQuest</span>, where learning meets opportunity. 
              We empower professionals to enhance their skills, gain industry insights, and unlock new career heights.
            </p>
          </div>

          {}
          <div className="about-image">
            <img src="ab.png" alt="About EduQuest" />
          </div>
        </div>
      </section>

      