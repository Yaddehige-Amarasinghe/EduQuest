import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './courses.css';


import Header from './Header'; 
import Footer from './footer'; 

const StreamsPage = () => {
  const [selectedStream, setSelectedStream] = useState('science');
  const navigate = useNavigate();

  const streamsData = {
    science: {
      title: "Science Stream",
      description: "Prepare for careers in medicine, engineering, and scientific research with our comprehensive science program.",
      rating: 4.8,
      studentsEnrolled: 2854,
      price:  2500,
      duration: "2 years",
      image: "https://static.vecteezy.com/ti/vetor-gratis/p1/2217685-banner-ciencia-vetor.jpg",
      subjects: [
        {
          name: "Biology",
          topics: ["Cell Biology", "Human Physiology", "Genetics", "Ecology"],
          careers: ["Medicine", "Biotechnology", "Research"],
          image: "https://png.pngtree.com/png-clipart/20200225/original/pngtree-biology-microscope-science-blue-dotted-line-line-icon-png-image_5265484.jpg"
        },
        {
          name: "Physics",
          topics: ["Mechanics", "Electricity", "Optics", "Modern Physics"],
          careers: ["Engineering", "Research", "Technology"],
          image: "https://cdn-icons-png.flaticon.com/512/306/306335.png"
        },
        {
          name: "Chemistry",
          topics: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry", "Analytical Chemistry"],
          careers: ["Pharmacy", "Chemical Engineering", "Research"],
          image: "https://cdn-icons-png.freepik.com/256/2387/2387545.png?semt=ais_hybrid"
        },
        {
          name: "Mathematics",
          topics: ["Calculus", "Linear Algebra", "Statistics", "Differential Equations"],
          careers: ["Engineering", "Finance", "Data Science"],
          image: "https://c0.klipartz.com/pngpicture/401/990/gratis-png-iconos-de-computadora-alfabetizacion-simbolo-aritmetica-cv-ingles-thumbnail.png"
        },
        // Additional modules
        {
          name: "Astronomy",
          topics: ["Solar System", "Stars and Galaxies", "Cosmology", "Space Exploration"],
          careers: ["Astrophysicist", "Aerospace Engineer", "Astronomer"],
          image: "https://cdn-icons-png.flaticon.com/512/920/920221.png"
        },
        {
          name: "Environmental Science",
          topics: ["Environmental Issues", "Ecology", "Climate Change", "Sustainability"],
          careers: ["Environmental Consultant", "Ecologist", "Climate Scientist"],
          image: "https://www.cest.org.uk/wp-content/uploads/2021/07/cest-environment-science-technology.jpg"
        }
      ]
    },
    
  };

 