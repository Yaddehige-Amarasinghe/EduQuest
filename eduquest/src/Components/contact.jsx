import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaUser, FaPaperPlane } from "react-icons/fa";
import Header from "./Header";
import Footer from "./footer";
import "./contact.css";

const ContactPage = () => {
  return (
    <>
      <Header /> 
      <div className="contact-container">
      
        <div className="contact-left">
          <h2>Contact Us</h2>
          <p>Have a question or need help? Reach out to us, and our team will get back to you shortly.</p>

          <form className="contact-form">
            <div className="input-group">
              <FaUser className="input-icon" />
              <input type="text" placeholder="Your Name" required />
            </div>

            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input type="email" placeholder="Your Email" required />
            </div>

            <div className="input-group">
              <FaMapMarkerAlt className="input-icon" />
              <input type="text" placeholder="Your Address" required />
            </div>

            <div className="input-group">
              <FaPhone className="input-icon" />
              <input type="text" placeholder="Your Phone Number" required />
            </div>

            <div className="input-group">
              <textarea placeholder="Your Message" rows="5" required></textarea>
            </div>

            <button type="submit">
              <FaPaperPlane className="btn-icon" /> Send Message
            </button>
          </form>
        </div>

       
        <div className="contact-right">
          <img src="contact.png" alt="Contact Us" className="contact-image" />
        </div>
      </div>

      <Footer /> 
    </>
  );
};

export default ContactPage;
