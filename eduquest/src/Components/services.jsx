import React from 'react';
import Header from './Header';
import Footer from './footer';
import { FaUsers, FaAward, FaChartLine, FaThumbsUp } from 'react-icons/fa';
import './services.css'; 

const Services = () => {
  return (
    <>
      <Header />
      <div className="services-container">
        {}
        <div className="main-section">
          <div className="left-side">
            <h1 className="services-title">Empower Learning with Gamification</h1>
            <p className="services-description">
              Transform education with an interactive, gamified platform that makes learning engaging, rewarding, and highly effective. 
              Track progress, earn badges, and enjoy a personalized learning experience.
            </p>
          </div>
          <div className="right-side">
            <img src="services.png" alt="Gamification Concept" className="services-image" />
          </div>
        </div>

       