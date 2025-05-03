
import React from 'react';
import './footer.css';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h1>EduQuest</h1>
        </div>
        <nav>
          <ul className="footer-links">
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <div className="social-media">
          <a href="#facebook" className="social-icon"><FaFacebookF /></a>
          <a href="#twitter" className="social-icon"><FaTwitter /></a>
          <a href="#instagram" className="social-icon"><FaInstagram /></a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 EduQuest. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
