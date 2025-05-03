import React from 'react';
import Header from './Header';  
import Footer from './footer';  
import './home.css';
import { FaChalkboardTeacher, FaUsers, FaLaptopCode, FaBookOpen } from 'react-icons/fa';

const courses = [
  {
    title: 'Biology',
    description: 'Learn how to build websites with HTML, CSS, and JavaScript.',
    image: 'https://i.ytimg.com/vi/3tisOnOkwzo/maxresdefault.jpg',
  },
  {
    title: 'Physics',
    description: 'Dive into the world of data analysis and machine learning.',
    image: 'https://i.ytimg.com/vi/ZAqIoDhornk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB0s3neePHG-GkYX91eNFWNjjqboA',
  },
  {
    title: 'Chemistry',
    description: 'Build native and hybrid apps for Android and iOS.',
    image: 'https://www.shutterstock.com/image-vector/chemistry-dark-blue-word-concept-260nw-2505113625.jpg',
  },
];

const CourseCard = ({ course }) => (
  <div className="course-card">
    <img src={course.image} alt={course.title} className="course-image" />
    <div className="course-info">
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <button className="course-button">Learn More</button>
    </div>
  </div>
);

const CourseSection = () => (
  <section className="course-section">
    <h2> AWESOME COURSES</h2>
    <div className="course-cards-container">
      {courses.map((course, index) => (
        <CourseCard key={index} course={course} />
      ))}
    </div>
    <div className="choose-us">
      <div className="choose-us-left">
        <img src="choose.png" alt="Why Choose Us" />
      </div>
      <div className="choose-us-right">
        <h3>Why Do We Choose Us?</h3>
        <p>
          EduQuest stands out with its expert-led courses, interactive learning, and flexibility. Here’s why we are the right choice for your career advancement.
        </p>
        <ul>
          <li>✅ Expert-led courses by industry professionals</li>
          <li>✅ Flexible learning with 24/7 access</li>
          <li>✅ Practical, hands-on experience with real-world projects</li>
          <li>✅ Engaging community for support and collaboration</li>
        </ul>
      </div>
    </div>
  </section>
);

const HomePage = () => {
  return (
    <div className="homepage">
      <Header />  
      <main className="main-content">
        {/* Welcome Section */}
        <section className="welcome-section">
          <div className="welcome-left">
            <h1>Unlock Your Potential, Elevate Your Career</h1>
            <p>
              Welcome to EduQuest, dedicated to empowering your professional journey. 
              Whether you're looking to refine your skills, gain industry insights, or explore new opportunities, 
              we provide the tools and resources to help you succeed. Advance your path with expert guidance and unlock new levels of achievement. 
              Let’s build the future you deserve, together.
            </p>
            <a href="#features" className="get-started-btn">Get Started</a> 
          </div>
          <div className="welcome-right">
            <img src="st.png" alt="Career Growth" /> 
          </div>
        </section>

        {/* Awesome Features Section */}
        <section className="features-section" id="features">
          <h2 className="features-title"> Awesome Features</h2>
          <div className="features-container">
            <div className="feature-box">
              <FaChalkboardTeacher className="feature-icon" />
              <h3>Expert-Led Courses</h3>
              <p>Learn from top instructors in various domains.</p>
            </div>
            <div className="feature-box">
              <FaUsers className="feature-icon" />
              <h3>Interactive Learning</h3>
              <p>Engage in discussions and collaborate with peers.</p>
            </div>
            <div className="feature-box">
              <FaLaptopCode className="feature-icon" />
              <h3>Hands-On Projects</h3>
              <p>Build real-world projects to strengthen your skills.</p>
            </div>
            <div className="feature-box">
              <FaBookOpen className="feature-icon" />
              <h3>Flexible Learning</h3>
              <p>Access courses anytime, anywhere at your convenience.</p>
            </div>
          </div>
        </section>

        {/* Popular Courses Section */}
        <CourseSection />
        
      </main>

      <Footer />  
    </div>
  );
};

export default HomePage;
