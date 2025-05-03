import React, { useState, useEffect } from 'react';
import './quizes.css';

const QuizPage = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [progress, setProgress] = useState({
    quizzes: { score: 0, points: 0, level: 1, badges: [] },
    gamification: { points: 0, level: 1, badges: [] }
  });
  const [showResults, setShowResults] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const token = localStorage.getItem('token');

  const quizData = [
    {
      question: "Which of the following is a vector quantity?",
      options: ["Mass", "Temperature", "Velocity", "Energy"],
      correctAnswer: "Velocity",
      points: 10,
      subject: "Physics"
    },
    {
      question: "The equation PV=nRT is known as:",
      options: ["Boyle's Law", "Charles' Law", "Ideal Gas Law", "Gay-Lussac's Law"],
      correctAnswer: "Ideal Gas Law",
      points: 15,
      subject: "Chemistry"
    },
    {
      question: "DNA replication is:",
      options: ["Conservative", "Semi-conservative", "Dispersive", "None of these"],
      correctAnswer: "Semi-conservative",
      points: 10,
      subject: "Biology"
    },
    {
      question: "The most electronegative element is:",
      options: ["Oxygen", "Chlorine", "Fluorine", "Nitrogen"],
      correctAnswer: "Fluorine",
      points: 15,
      subject: "Chemistry"
    },
    {
      question: "The SI unit of electric current is:",
      options: ["Volt", "Ampere", "Ohm", "Coulomb"],
      correctAnswer: "Ampere",
      points: 10,
      subject: "Physics"
    },
    {
      question: "What is the primary source of energy for Earth's climate system?",
      options: ["Geothermal", "Solar", "Nuclear", "Tidal"],
      correctAnswer: "Solar",
      points: 15,
      subject: "Physics"
    },
    {
      question: "Which gas is most abundant in Earth's atmosphere?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
      correctAnswer: "Nitrogen",
      points: 10,
      subject: "Chemistry"
    },
    {
      question: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi Apparatus"],
      correctAnswer: "Mitochondria",
      points: 10,
      subject: "Biology"
    },
    {
      question: "Newton's first law is also known as the law of:",
      options: ["Motion", "Inertia", "Force", "Acceleration"],
      correctAnswer: "Inertia",
      points: 15,
      subject: "Physics"
    },
    {
      question: "What is the pH of a neutral solution at 25°C?",
      options: ["0", "7", "14", "10"],
      correctAnswer: "7",
      points: 10,
      subject: "Chemistry"
    }
  ];

  useEffect(() => {
    if (token) {
      fetch('http://localhost:5000/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setProgress(data.progress || {
          quizzes: { score: 0, points: 0, level: 1, badges: [] },
          gamification: { points: 0, level: 1, badges: [] }
        }))
        .catch(err => console.error('Error fetching progress:', err));
    }
  }, [token]);

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResults) {
      handleAnswerSelection(null);
    }
  }, [timeLeft, quizStarted, showResults]);

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setProgress(prev => ({
      ...prev,
      quizzes: { score: 0, points: 0, level: 1, badges: [] }
    }));
    setTimeLeft(60);
    setShowResults(false);
  };

  const updateQuizProgress = async () => {
    try {
      const response = await fetch('http://localhost:5000/progress/quizzes', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(progress.quizzes)
      });
      if (!response.ok) {
        console.error('Error updating quiz progress:', await response.json());
      }
    } catch (err) {
      console.error('Error updating quiz progress:', err);
    }
  };

  const handleAnswerSelection = (answer) => {
    const currentQ = quizData[currentQuestion];
    let earnedPoints = 0;
    let timeBonus = Math.floor(timeLeft / 10);

    if (answer === currentQ.correctAnswer) {
      earnedPoints = currentQ.points + timeBonus;
      setProgress(prev => ({
        ...prev,
        quizzes: {
          ...prev.quizzes,
          score: prev.quizzes.score + 1,
          points: prev.quizzes.points + earnedPoints
        },
        gamification: {
          ...prev.gamification,
          points: prev.gamification.points + earnedPoints
        }
      }));
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
      setTimeLeft(60);
    } else {
      setShowResults(true);
      checkBadges();
      checkLevelUp();
      updateQuizProgress();
      updateLeaderboard(progress.quizzes.score + earnedPoints);
    }
  };

  const checkBadges = () => {
    const newBadges = [...progress.quizzes.badges];
    if (progress.quizzes.score >= 5 && !newBadges.includes("Science Star")) {
      newBadges.push("Science Star");
    }
    if (progress.quizzes.points >= 100 && !newBadges.includes("Point Master")) {
      newBadges.push("Point Master");
    }
    if (progress.quizzes.score === quizData.length && !newBadges.includes("Perfect Score")) {
      newBadges.push("Perfect Score");
    }
    setProgress(prev => ({
      ...prev,
      quizzes: { ...prev.quizzes, badges: newBadges },
      gamification: { ...prev.gamification, badges: [...new Set([...prev.gamification.badges, ...newBadges])] }
    }));
  };

  const checkLevelUp = () => {
    const nextLevelThreshold = progress.quizzes.level * 50;
    if (progress.quizzes.points >= nextLevelThreshold) {
      setProgress(prev => ({
        ...prev,
        quizzes: { ...prev.quizzes, level: prev.quizzes.level + 1 },
        gamification: { ...prev.gamification, level: prev.gamification.level + 1 }
      }));
    }
  };

  const updateLeaderboard = (finalScore) => {
    const newEntry = {
      name: `Player ${Math.floor(Math.random() * 1000)}`,
      score: finalScore,
      timestamp: new Date().toLocaleString()
    };
    const updatedLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    setLeaderboard(updatedLeaderboard);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setShowResults(false);
    setTimeLeft(60);
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>A/L Science Mastery Quest</h1>
        <p>Challenge Your Knowledge in Physics, Chemistry, and Biology</p>
        <div className="stats-bar">
          <span>Level: {progress.quizzes.level}</span>
          <span>Points: {progress.quizzes.points}</span>
          <span>Badges: {progress.quizzes.badges.length}</span>
        </div>
      </div>

      {!quizStarted ? (
        <div className="quiz-intro">
          <h2>A/L Science Stream Challenge</h2>
          <p>Engage in a gamified journey to master Advanced Level Science concepts!</p>
          <div className="quiz-details">
            <div className="detail-item">
              <span className="detail-label">Total Questions:</span>
              <span className="detail-value">{quizData.length}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Time per Question:</span>
              <span className="detail-value">60 seconds</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Difficulty Level:</span>
              <span className="detail-value">Advanced</span>
            </div>
          </div>
          <div className="button-container">
            <button className="start-button" onClick={startQuiz}>
              Begin Challenge
            </button>
          </div>
        </div>
      ) : showResults ? (
        <div className="quiz-results">
          <h2>Challenge Completed!</h2>
          <div className="score-container">
            <div className="score-circle">
              <div className="score-text">
                <span className="score-value">{progress.quizzes.score}</span>
                <span className="score-total">/{quizData.length}</span>
              </div>
              <p className="score-label">Your Score</p>
            </div>
            <div className="points-display">Total Points: {progress.quizzes.points}</div>
          </div>
          <div className="badges-earned">
            <h3>Achievements Unlocked</h3>
            <ul>
              {progress.quizzes.badges.length > 0 ? (
                progress.quizzes.badges.map((badge, index) => <li key={index}>{badge}</li>)
              ) : (
                <li>No achievements yet. Try again!</li>
              )}
            </ul>
          </div>
          <div className="leaderboard">
            <h3>Top Performers</h3>
            <ul>
              {leaderboard.map((entry, index) => (
                <li key={index}>
                  {entry.name}: {entry.score} points ({entry.timestamp})
                </li>
              ))}
            </ul>
          </div>
          <div className="button-container">
            <button className="restart-button" onClick={startQuiz}>
              Retry Challenge
            </button>
            <button className="home-button" onClick={resetQuiz}>
              Return to Home
            </button>
          </div>
        </div>
      ) : (
        <div className="quiz-question">
          <div className="question-header">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
              ></div>
            </div>
            <div className="question-info">
              <span>Question {currentQuestion + 1} of {quizData.length}</span>
              <span>Time Remaining: {timeLeft}s</span>
              <span>Subject: {quizData[currentQuestion].subject}</span>
            </div>
          </div>
          <div className="question-content">
            <h3>{quizData[currentQuestion].question}</h3>
            <div className="options-container">
              {quizData[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className="option-button"
                  onClick={() => handleAnswerSelection(option)}
                >
                  <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                  <span className="option-text">{option}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <footer className="quiz-footer">
        <p>© 2025 Science Mastery Platform | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default QuizPage;