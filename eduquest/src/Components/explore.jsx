import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './explore.css';
import { FaBook, FaYoutube, FaClipboardCheck } from 'react-icons/fa';

const Explore = () => {
  const [stream, setStream] = useState('default');
  const navigate = useNavigate();

  useEffect(() => {
    const selectedStream = localStorage.getItem('selectedStream');
    if (selectedStream) {
      setStream(selectedStream);
    }
  }, []);

  return (
    <div className={`explore-container ${stream}`}>
      <header className="banner">
        <h1>EduQuest Knowledge Hub</h1>
        <p>Discover, Learn, and Evaluate Your Knowledge Journey</p>
      </header>

      <main className="card-container">
        <div className="card">
          <div className="card-icon">
            <FaBook />
          </div>
          <h2>Knowledge Creation</h2>
          <p>Access comprehensive course materials designed to build your knowledge base from fundamentals to advanced concepts.</p>
          <div className="feature-list">
            <h3>Find Course Materials</h3>
            <ul>
              <li>Curated Reading Lists & Textbooks</li>
              <li>Interactive Learning Modules</li>
              <li>Practical Exercises & Projects</li>
              <li>Downloadable Resources & Templates</li>
            </ul>
          </div>
          <button className="primary-button" onClick={() => navigate('/material')}>
            Explore Materials
          </button>
        </div>

        <div className="card">
          <div className="card-icon">
            <FaYoutube />
          </div>
          <h2>Knowledge Determination</h2>
          <p>Enhance your understanding through visual learning with our collection of educational video content.</p>
          <div className="feature-list">
            <h3>Course Deliverables</h3>
            <ul>
              <li>Instructor-led Video Tutorials</li>
              <li>Step-by-step Demonstrations</li>
              <li>Expert Interviews & Case Studies</li>
              <li>Supplementary YouTube Playlists</li>
            </ul>
          </div>
          <button className="primary-button" onClick={() => navigate('/video')}>
            Watch Videos
          </button>
        </div>

        <div className="card">
          <div className="card-icon">
            <FaClipboardCheck />
          </div>
          <h2>Knowledge Evaluation</h2>
          <p>Test your understanding and track your progress with our comprehensive assessment tools.</p>
          <div className="feature-list">
            <h3>Interactive Quizzes</h3>
            <ul>
              <li>Topic-specific Assessments</li>
              <li>Adaptive Learning Paths</li>
              <li>Progress Tracking & Analytics</li>
              <li>Certification Preparation</li>
            </ul>
          </div>
          <button className="primary-button" onClick={() => navigate('/quizes')}>
            Take Quiz
          </button>
        </div>
      </main>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to accelerate your learning?</h2>
          <p>Join thousands of students who have transformed their knowledge journey with our platform.</p>
          <button className="secondary-button">Get Started Today</button>
        </div>
      </section>
    </div>
  );
};

export default Explore;