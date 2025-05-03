import React from "react";
import Header from "./Header"; 
import Footer from "./footer"; 
import "./aboutus.css";

const AboutUs = () => {
  return (
    <div>
      {}
      <Header />

      {/* About Us Section */}
      <section className="about-section">
        <div className="about-container">
          {/* Left Side: Title & Description */}
          <div className="about-content">
            <h1 className="about-title">About Us</h1>
            <p className="about-description">
              Welcome to <span className="company-name">EduQuest</span>, where learning meets opportunity. 
              We empower professionals to enhance their skills, gain industry insights, and unlock new career heights.
            </p>
          </div>

          {/* Right Side: Image */}
          <div className="about-image">
            <img src="ab.png" alt="About EduQuest" />
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="about-section reverse">
        <div className="about-container">
          {/* Left Side: Image */}
          <div className="about-image">
            <img src="vision.png" alt="Our Vision" />
          </div>

          {/* Right Side: Vision Text */}
          <div className="about-content">
            <h1 className="about-title">Our Vision</h1>
            <p className="about-description">
              Our vision is to build a platform that fosters growth, knowledge sharing, and innovation, empowering professionals to stay ahead of industry trends.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="about-section">
        <div className="about-container">
          {/* Left Side: Mission Text */}
          <div className="about-content">
            <h1 className="about-title">Our Mission</h1>
            <p className="about-description">
              Our mission is to provide accessible and high-quality learning resources that equip professionals with the tools and skills they need to excel in their careers.
            </p>
          </div>

          {/* Right Side: Image */}
          <div className="about-image">
            <img src="mission.png" alt="Our Mission" />
          </div>
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default AboutUs;
