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

  const calculateTotalProgress = () => {
    const totalItems = 12 + 16 + 10; // 12 materials, 16 videos, 10 quiz questions
    const completedItems =
      progress.materials.filter((m) => m.completed).length +
      progress.videos.filter((v) => v.completed).length +
      progress.quizzes.score;
    return Math.round((completedItems / totalItems) * 100);
  };

  const nextLevelPoints = progress.gamification.level * 100;
  const currentPoints = progress.gamification.points;
  const pointsToNextLevel = nextLevelPoints - currentPoints;
  const levelProgress = (currentPoints / nextLevelPoints) * 100;

  const toggleProfileDropdown = (e) => {
    if (e.type === "click" || (e.type === "keydown" && (e.key === "Enter" || e.key === " "))) {
      e.preventDefault();
      setIsProfileOpen(!isProfileOpen);
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>EduQuest</h1>
      </div>
      <nav aria-label="Main navigation">
        <ul className="nav-links">
          <li>
            <Link to="/home" aria-label="Home">
              <FaHome className="nav-icon" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/courses" aria-label="Courses">
              <FaBook className="nav-icon" />
              <span>Courses</span>
            </Link>
          </li>
          <li>
            <Link to="/aboutus" aria-label="About Us">
              <FaInfo className="nav-icon" />
              <span>About</span>
            </Link>
          </li>
          <li>
            <Link to="/services" aria-label="Services">
              <FaCog className="nav-icon" />
              <span>Services</span>
            </Link>
          </li>
          <li>
            <Link to="/contact" aria-label="Contact">
              <FaEnvelope className="nav-icon" />
              <span>Contact</span>
            </Link>
          </li>
          {profile ? (
            <li className="profile-section">
              <img
                src={profile.avatar || "images.png"}
                alt="Profile"
                className="profile-icon"
                onClick={toggleProfileDropdown}
                onKeyDown={toggleProfileDropdown}
                tabIndex={0}
                role="button"
                aria-label="Toggle profile dropdown"
                aria-expanded={isProfileOpen}
              />
              {isProfileOpen && (
                <div className="profile-dropdown">
                  <div className="profile-header">
                    <div className="profile-avatar-container">
                      <img
                        src={profile.avatar || "images.png"}
                        alt={`${profile.name}'s avatar`}
                        className="profile-avatar"
                      />
                    </div>
                    <div className="profile-info">
                      <h2 className="profile-name">{profile.name}</h2>
                      <p className="profile-email">{profile.email}</p>
                      <div className="profile-level-badge">
                        Level {progress.gamification.level}
                      </div>
                    </div>
                  </div>

                  <div className="progress-dashboard" role="region" aria-label="Progress dashboard">
                    <div className="progress-overview">
                      <div className="progress-card">
                        <div
                          className="progress-circle"
                          style={{ "--progress": `${calculateTotalProgress()}%` }}
                        >
                          <span>{calculateTotalProgress()}%</span>
                        </div>
                        <h3>Overall Progress</h3>
                      </div>

                      <div className="progress-stats-container">
                        <div className="stat-item-card">
                          <div className="stat-icon-container points-icon">
                            <FaStar className="stat-icon" />
                          </div>
                          <div className="stat-details">
                            <h4>Points</h4>
                            <p>{progress.gamification.points}</p>
                          </div>
                        </div>

                        <div className="stat-item-card">
                          <div className="stat-icon-container badge-icon">
                            <FaMedal className="stat-icon" />
                          </div>
                          <div className="stat-details">
                            <h4>Badges</h4>
                            <p>{progress.gamification.badges.length}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="level-progress-container">
                      <div className="level-progress-header">
                        <h3>Level Progress</h3>
                        <span>
                          {pointsToNextLevel} points to Level{" "}
                          {progress.gamification.level + 1}
                        </span>
                      </div>
                      <div className="level-progress-bar">
                        <div
                          className="level-progress-fill"
                          style={{ width: `${levelProgress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="learning-breakdown">
                      <h3>Learning Breakdown</h3>
                      <div className="progress-breakdown">
                        <div className="breakdown-item">
                          <div className="breakdown-header">
                            <div className="breakdown-icon-container materials-icon">
                              <FaFileAlt className="breakdown-icon" />
                            </div>
                            <div className="breakdown-info">
                              <h4>Materials</h4>
                              <div className="breakdown-count">
                                {progress.materials.filter((m) => m.completed).length}
                                <span className="breakdown-total">/12</span>
                              </div>
                            </div>
                          </div>
                          <div className="breakdown-progress-bar">
                            <div
                              className="breakdown-progress-fill materials-fill"
                              style={{
                                width: `${
                                  (progress.materials.filter((m) => m.completed).length /
                                    12) *
                                  100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        <div className="breakdown-item">
                          <div className="breakdown-header">
                            <div className="breakdown-icon-container videos-icon">
                              <FaVideo className="breakdown-icon" />
                            </div>
                            <div className="breakdown-info">
                              <h4>Videos</h4>
                              <div className="breakdown-count">
                                {progress.videos.filter((v) => v.completed).length}
                                <span className="breakdown-total">/16</span>
                              </div>
                            </div>
                          </div>
                          <div className="breakdown-progress-bar">
                            <div
                              className="breakdown-progress-fill videos-fill"
                              style={{
                                width: `${
                                  (progress.videos.filter((v) => v.completed).length / 16) *
                                  100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        <div className="breakdown-item">
                          <div className="breakdown-header">
                            <div className="breakdown-icon-container quizzes-icon">
                              <FaQuestionCircle className="breakdown-icon" />
                            </div>
                            <div className="breakdown-info">
                              <h4>Quizzes</h4>
                              <div className="breakdown-count">
                                {progress.quizzes.score}
                                <span className="breakdown-total">/10</span>
                              </div>
                            </div>
                          </div>
                          <div className="breakdown-progress-bar">
                            <div
                              className="breakdown-progress-fill quizzes-fill"
                              style={{ width: `${(progress.quizzes.score / 10) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="achievements-section">
                      <h3>Achievements</h3>
                      <div className="achievements-grid">
                        {progress.gamification.badges.length > 0 ? (
                          progress.gamification.badges.map((badge, index) => (
                            <div key={index} className="achievement-badge">
                              <div className="achievement-icon-container">
                                {badge.includes("Module Master") ? (
                                  <FaTrophy className="achievement-icon trophy" />
                                ) : badge.includes("Explorer") ? (
                                  <FaMedal className="achievement-icon medal" />
                                ) : badge.includes("Scholar") ? (
                                  <FaGraduationCap className="achievement-icon graduation" />
                                ) : (
                                  <FaStar className="achievement-icon star" />
                                )}
                              </div>
                              <span className="achievement-name">{badge}</span>
                            </div>
                          ))
                        ) : (
                          <div className="no-achievements">
                            <FaTrophy className="no-achievements-icon" />
                            <p>No achievements yet. Keep learning!</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="profile-dropdown-footer">
                    <Link to="/dashboard" className="view-dashboard-btn">
                      View Full Dashboard
                    </Link>
                    <button
                      className="logout-btn"
                      onClick={() => {
                        localStorage.removeItem("token");
                        window.location.reload();
                      }}
                      aria-label="Logout"
                    >
                      <FaSignOutAlt className="logout-icon" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </li>
          ) : (
            <li>
              <Link to="/" className="login-link" aria-label="Login">
                <FaUserCircle className="nav-icon" />
                <span>Login</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;