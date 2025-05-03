import React, { useState, useEffect } from 'react';
import './video.css';
import { 
  FaTrophy, 
  FaStar, 
  FaMedal, 
  FaCheck, 
  FaPlay, 
  FaGraduationCap, 
  FaAtom, 
  FaFlask, 
  FaDna, 
  FaCalculator,
  FaChartLine
} from 'react-icons/fa';

const VideoPage = () => {
  const [activeTab, setActiveTab] = useState('physics');
  const [progress, setProgress] = useState({ videos: [], gamification: { points: 0, level: 1, badges: [] } });
  const [isPlaying, setIsPlaying] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      fetch('http://localhost:5000/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setProgress(data.progress || { videos: [], gamification: { points: 0, level: 1, badges: [] } }))
        .catch(err => console.error('Error fetching progress:', err));
    }
  }, [token]);

  const updateVideoProgress = async (videoId, module, completed) => {
    try {
      const response = await fetch('http://localhost:5000/progress/videos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ videoId, module, completed })
      });
      const data = await response.json();
      if (response.ok) {
        setProgress(prev => ({
          ...prev,
          videos: prev.videos.map(v =>
            v.videoId === videoId ? { ...v, completed } : v
          ).concat(prev.videos.find(v => v.videoId === videoId) ? [] : [{ videoId, module, completed }]),
          gamification: {
            ...prev.gamification,
            points: prev.gamification.points + (completed ? 10 : 0)
          }
        }));
      } else {
        console.error('Error updating video progress:', data.message);
      }
    } catch (err) {
      console.error('Error updating video progress:', err);
    }
  };

  const modules = {
    physics: {
      title: 'Physics',
      icon: <FaAtom className="module-icon" />,
      videos: [
        {
          id: 'physics1',
          title: 'Mechanics - Forces and Motion',
          videoId: 'wBrJ30plBhw',
          poster: 'https://unifyphysics.com/wp-content/uploads/2024/04/Common-Forces-in-Mechanics.jpg',
          description: 'Learn about Newton\'s laws, forces, momentum, and applications in real-world scenarios.'
        },
        {
          id: 'physics2',
          title: 'Waves and Oscillations',
          videoId: 't0YQoCSwPJ0',
          poster: 'https://cdn.slidesharecdn.com/ss_thumbnails/presentation1-240902150756-21398b46-thumbnail.jpg?width=560&fit=bounds',
          description: 'Explore wave phenomena, superposition, interference, and oscillatory motion.'
        },
        {
          id: 'physics3',
          title: 'Electricity and Magnetism',
          videoId: 'dQw4w9WgXcQ',
          poster: 'https://ecdn.teacherspayteachers.com/thumbitem/Electricity-and-Magnetism-PowerPoint-1851080-1643632082/original-1851080-1.jpg',
          description: 'Understand electric fields, magnetic fields, electromagnetic induction, and circuits.'
        },
        {
          id: 'physics4',
          title: 'Modern Physics - Quantum Theory',
          videoId: 'dQw4w9WgXcQ',
          poster: 'https://i.ytimg.com/vi/uJmam-gkgFY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDbN9Nelt_-bsUuGW6eEMyw6rGRAA',
          description: 'Dive into quantum mechanics, atomic structure, and nuclear physics.'
        }
      ]
    },
    chemistry: {
      title: 'Chemistry',
      icon: <FaFlask className="module-icon" />,
      videos: [
        {
          id: 'chem1',
          title: 'Organic Chemistry Fundamentals',
          videoId: 'dQw4w9WgXcQ',
          poster: 'https://cdn.slidesharecdn.com/ss_thumbnails/organicchemistryxicbse-120701003142-phpapp02-150809113721-lva1-app6892-thumbnail.jpg?width=560&fit=bounds',
          description: 'Learn about hydrocarbons, functional groups, and organic reactions.'
        },
        {
          id: 'chem2',
          title: 'Chemical Bonding and Structures',
          videoId: 'dQw4w9WgXcQ',
          poster: 'https://cdn.slidesharecdn.com/ss_thumbnails/chemicalbonding-130621001159-phpapp02-241015225918-de783d82-thumbnail.jpg?width=560&fit=bounds',
          description: 'Understand ionic, covalent, and metallic bonding and molecular structures.'
        },
        {
          id: 'chem3',
          title: 'Equilibrium and Reaction Rates',
          videoId: 'dQw4w9WgXcQ',
          poster: 'https://slideplayer.com/90/14785690/big_thumb.jpg',
          description: 'Study chemical equilibrium, factors affecting reaction rates, and catalysis.'
        },
        {
          id: 'chem4',
          title: 'Electrochemistry and Thermodynamics',
          videoId: 'dQw4w9WgXcQ',
          poster: 'https://i.imgur.com/2eHvNGD.jpg',
          description: 'Explore electrochemical cells, thermodynamic principles, and energy changes.'
        }
      ]
    },
    biology: {
      title: 'Biology',
      icon: <FaDna className="module-icon" />,
      videos: [
        {
          id: 'bio1',
          title: 'Cell Biology and Structure',
          videoId: 'dQw4w9WgXcQ',
          poster: 'https://cdn.slidesharecdn.com/ss_thumbnails/cell-organele-lec-200207135605-thumbnail.jpg?width=560&fit=bounds',
          description: 'Discover cell organelles, membranes, and cellular processes.'
        },
        {
          id: 'bio2',
          title: 'Genetics and Inheritance',
          videoId: 'dQw4w9WgXcQ',
          poster: 'https://i.ytimg.com/vi/4g_0y6ARFLg/maxresdefault.jpg',
          description: 'Learn about DNA, genes, inheritance patterns, and genetic disorders.'
        },
        {
          id: 'bio3',
          title: 'Human Physiology Systems',
          videoId: 'dQw4w9WgXcQ',
          poster: 'https://www.diginerve.com/blogs/wp-content/uploads/2023/07/Important-Topics-for-Physiology-in-MBBS.webp',
          description: 'Study cardiovascular, respiratory, digestive, and nervous systems.'
        },
        {
          id: 'bio4',
          title: 'Ecology and Environmental Biology',
          videoId: 'dQw4w9WgXcQ',
          poster: 'https://media.istockphoto.com/id/1182619005/photo/biology-laboratory-nature-and-science-plants-with-biochemistry-structure-on-green-background.jpg?s=612x612&w=0&k=20&c=TLqoeYYlVMQlhA_iW9GOFYKVWAl67V3nTRTSPYpkwOE=',
          description: 'Explore ecosystems, biodiversity, and environmental challenges.'
        }
      ]
    },
    mathematics: {
      title: 'Mathematics',
      icon: <FaCalculator className="module-icon" />,
      videos: [
        {
          id: 'math1',
          title: 'Calculus - Differentiation',
          videoId: 'dQw4w9WgXcQ',
          poster: 'https://i.imgur.com/hv8Jabp.jpg',
          description: 'Master differentiation techniques, rates of change, and applications.'
        },
        {
          id: 'math2',
          title: 'Calculus - Integration',
          videoId: 'dQw4w9WgXcQ',
          poster: 'https://i.imgur.com/N4hL6Wa.jpg',
          description: 'Learn integration methods and their applications to real-world problems.'
        },
        {
          id: 'math3',
          title: 'Algebra and Functions',
          videoId: 'dQw4w9WgXcQ',
          poster: 'https://i.imgur.com/hxMHwiA.jpg',
          description: 'Study functions, equations, inequalities, and matrices.'
        },
        {
          id: 'math4',
          title: 'Statistics and Probability',
          videoId: 'dQw4w9WgXcQ',
          poster: 'https://i.imgur.com/59JtxRy.jpg',
          description: 'Explore data analysis, probability distributions, and statistical inference.'
        }
      ]
    }
  };

  const completedVideos = progress.videos.filter(v => v.completed).map(v => v.videoId);
  const userPoints = progress.gamification.points;
  const userLevel = progress.gamification.level;

  const playVideo = (videoId) => {
    setIsPlaying(videoId);
  };

  const calculateProgress = () => {
    return (completedVideos.length / 16) * 100;
  };

  return (
    <div className="video-page-container">
      <header className="page-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="page-title">Advanced Level Stream Modules</h1>
            <div className="subtitle">Interactive learning for A/L students</div>
          </div>
          <div className="user-stats">
            <div className="stat-item points">
              <div className="stat-icon-wrapper">
                <FaStar className="stat-icon" />
              </div>
              <div className="stat-content">
                <div className="stat-value">{userPoints}</div>
                <div className="stat-label">Points</div>
              </div>
            </div>
            <div className="stat-item level">
              <div className="stat-icon-wrapper">
                <FaTrophy className="stat-icon" />
              </div>
              <div className="stat-content">
                <div className="stat-value">{userLevel}</div>
                <div className="stat-label">Level</div>
              </div>
            </div>
            <div className="stat-item progress">
              <div className="stat-icon-wrapper">
                <FaChartLine className="stat-icon" />
              </div>
              <div className="stat-content">
                <div className="stat-value">{Math.round(calculateProgress())}%</div>
                <div className="stat-label">Complete</div>
              </div>
            </div>
          </div>
        </div>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${calculateProgress()}%` }}></div>
          <div className="progress-markers">
            {[25, 50, 75, 100].map(marker => (
              <div
                key={marker}
                className={`progress-marker ${calculateProgress() >= marker ? 'reached' : ''}`}
                style={{ left: `${marker}%` }}
              >
                <div className="marker-value">{marker}%</div>
              </div>
            ))}
          </div>
        </div>
      </header>
      
      <nav className="module-tabs">
        {Object.keys(modules).map(moduleKey => (
          <button
            key={moduleKey}
            onClick={() => setActiveTab(moduleKey)}
            className={`module-tab ${moduleKey} ${activeTab === moduleKey ? 'active' : ''}`}
          >
            {modules[moduleKey].icon}
            <span>{modules[moduleKey].title}</span>
          </button>
        ))}
      </nav>
      
      <div className="current-module-header">
        <h2>{modules[activeTab].title} Module</h2>
        <p className="module-completion">
          {completedVideos.filter(id => id.startsWith(activeTab)).length}/{modules[activeTab].videos.length} videos completed
        </p>
      </div>
      
      <div className="video-grid">
        {modules[activeTab].videos.map((video, index) => (
          <div key={video.id} className={`video-card ${completedVideos.includes(video.id) ? 'completed' : ''}`}>
            <div className="video-thumbnail-container">
              <div className="video-thumbnail">
                {isPlaying === video.id ? (
                  <div className="video-player">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`} 
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <>
                    <img src={video.poster} alt={video.title} className="poster-image" />
                    <div className="video-overlay">
                      <button className="play-button" onClick={() => playVideo(video.id)} aria-label="Play video">
                        <FaPlay className="play-icon" />
                      </button>
                    </div>
                  </>
                )}
              </div>
              {completedVideos.includes(video.id) && (
                <div className="completion-badge">
                  <FaCheck />
                </div>
              )}
            </div>
            <div className="video-info">
              <div className="video-header">
                <h3 className="video-title">{video.title}</h3>
                <span className="video-number">Video {index + 1}</span>
              </div>
              <p className="video-description">{video.description}</p>
              <div className="video-footer">
                <button 
                  onClick={() => updateVideoProgress(video.id, activeTab, true)}
                  disabled={completedVideos.includes(video.id)}
                  className={`complete-button ${completedVideos.includes(video.id) ? 'completed' : ''}`}
                  aria-label={completedVideos.includes(video.id) ? "Completed" : "Mark as complete"}
                >
                  {completedVideos.includes(video.id) ? (
                    <>
                      <FaCheck className="complete-icon" />
                      <span>Completed</span>
                    </>
                  ) : (
                    <>
                      <FaCheck className="complete-icon" />
                      <span>Mark as Complete</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <section className="achievements-section">
        <h2 className="section-title">Your Achievements</h2>
        <div className="achievements-grid">
          <div className={`achievement-card ${completedVideos.length >= 4 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon-wrapper">
              <FaTrophy className="achievement-icon" />
            </div>
            <div className="achievement-info">
              <h3 className="achievement-title">Module Master</h3>
              <p className="achievement-description">Complete all videos in a module</p>
              <div className="achievement-progress">
                <div className="achievement-progress-bar" style={{ width: `${Math.min(completedVideos.length / 4 * 100, 100)}%` }}></div>
                <span className="achievement-progress-text">{Math.min(completedVideos.length, 4)}/4</span>
              </div>
            </div>
          </div>
          <div className={`achievement-card ${completedVideos.length >= 8 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon-wrapper">
              <FaMedal className="achievement-icon" />
            </div>
            <div className="achievement-info">
              <h3 className="achievement-title">Explorer</h3>
              <p className="achievement-description">Watch videos across multiple subjects</p>
              <div className="achievement-progress">
                <div className="achievement-progress-bar" style={{ width: `${Math.min(completedVideos.length / 8 * 100, 100)}%` }}></div>
                <span className="achievement-progress-text">{Math.min(completedVideos.length, 8)}/8</span>
              </div>
            </div>
          </div>
          <div className={`achievement-card ${completedVideos.length >= 12 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon-wrapper">
              <FaGraduationCap className="achievement-icon" />
            </div>
            <div className="achievement-info">
              <h3 className="achievement-title">Scholar</h3>
              <p className="achievement-description">Reach level 2 learning status</p>
              <div className="achievement-progress">
                <div className="achievement-progress-bar" style={{ width: `${Math.min(completedVideos.length / 12 * 100, 100)}%` }}></div>
                <span className="achievement-progress-text">{Math.min(completedVideos.length, 12)}/12</span>
              </div>
            </div>
          </div>
          <div className={`achievement-card ${completedVideos.length >= 16 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon-wrapper">
              <FaStar className="achievement-icon" />
            </div>
            <div className="achievement-info">
              <h3 className="achievement-title">Knowledge Master</h3>
              <p className="achievement-description">Complete all available videos</p>
              <div className="achievement-progress">
                <div className="achievement-progress-bar" style={{ width: `${Math.min(completedVideos.length / 16 * 100, 100)}%` }}></div>
                <span className="achievement-progress-text">{Math.min(completedVideos.length, 16)}/16</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VideoPage;