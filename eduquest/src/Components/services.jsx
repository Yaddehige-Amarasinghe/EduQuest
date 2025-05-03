
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

        
        <div className="services-card-container">
          <h2 className="card-title">Our Core Services</h2>
          <div className="services-list">
  
            <div className="service-card">
              <img src="https://media.licdn.com/dms/image/v2/D4D12AQGVr5_i_VulUw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1676452598560?e=2147483647&v=beta&t=PlZPpZDbZ5uGifjLrBq1n_Gl9XCtI122bWq9hTyPtM8" alt="Gamified Learning" className="service-image" />
              <h3>Gamified Learning</h3>
              <p>Boost engagement with rewards, challenges, and leaderboard-driven learning experiences.</p>
            </div>

            <div className="service-card">
              <img src="https://media.licdn.com/dms/image/v2/D4E12AQGPQ_ufluY8hQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1689299959631?e=2147483647&v=beta&t=nqMQPr0YVqnFwRwwga-M10BsRmXVmMnOnkqXtw8i0LE" alt="Progress Tracking" className="service-image" />
              <h3>Student Progress Tracking</h3>
              <p>Monitor learning analytics to provide personalized feedback and adaptive content.</p>
            </div>
         
            <div className="service-card">
              <img src="https://img.freepik.com/premium-vector/student-chooses-correct-answer-test-online-quiz-e-learning-distance-education-concept-horizontal_48369-47035.jpg" alt="Interactive Quizzes" className="service-image" />
              <h3>Interactive Quizzes</h3>
              <p>Engaging quizzes with instant feedback to reinforce knowledge retention.</p>
            </div>
            
            <div className="service-card">
              <img src="https://www.edu-nation.net/wp-content/uploads/2020/03/774.fw_.png" alt="Virtual Classrooms" className="service-image" />
              <h3>Virtual Classrooms</h3>
              <p>Seamless live learning experiences with chat, video, and collaboration tools.</p>
            </div>
          </div>
        </div>

        {}
        <div className="learning-experience-section">
          {}
          <div className="left-learning">
            <img src="ex.png" alt="Learning Experience" className="learning-image" />
          </div>

          {}
          <div className="right-learning">
            <h2 className="learning-title">Learning Experiences</h2>
            <ul className="learning-list">
              <li>✔ Engaging and fun learning journeys</li>
              <li>✔ AI-driven personalized learning paths</li>
              <li>✔ Interactive multimedia-based education</li>
              <li>✔ Encouragement through rewards & achievements</li>
              <li>✔ Real-time performance tracking & feedback</li>
            </ul>
          </div>
        </div>

        {}
        <div className="social-proof-section">
          <h2 className="social-proof-title">Join a Growing Community of Learners</h2>
          <div className="stats-container">
            <div className="stat-card">
              <FaUsers className="stat-icon" />
              <h3>10,000+</h3>
              <p>Active Users</p>
            </div>
            <div className="stat-card">
              <FaAward className="stat-icon" />
              <h3>5 Awards</h3>
              <p>Recognized Excellence</p>
            </div>
            <div className="stat-card">
              <FaChartLine className="stat-icon" />
              <h3>98% Satisfaction</h3>
              <p>Customer Approval</p>
            </div>
            <div className="stat-card">
              <FaThumbsUp className="stat-icon" />
              <h3>500+ Clients</h3>
              <p>Trusted by Businesses</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Services;
