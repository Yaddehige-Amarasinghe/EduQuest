import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaStar,
  FaTrophy,
  FaMedal,
  FaGraduationCap,
  FaHome,
  FaBook,
  FaInfo,
  FaCog,
  FaEnvelope,
  FaSignOutAlt,
  FaUserCircle,
  FaVideo,
  FaFileAlt,
  FaQuestionCircle,
} from "react-icons/fa";
import "./header.css";

const Header = () => {
  const [profile, setProfile] = useState(null);
  const [progress, setProgress] = useState({
    materials: [],
    videos: [],
    quizzes: { score: 0, points: 0, level: 1, badges: [] },
    gamification: { points: 0, level: 1, badges: [] },
  });
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setProfile(data);
          setProgress(
            data.progress || {
              materials: [],
              videos: [],
              quizzes: { score: 0, points: 0, level: 1, badges: [] },
              gamification: { points: 0, level: 1, badges: [] },
            }
          );
        })
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, []);

 