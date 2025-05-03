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

