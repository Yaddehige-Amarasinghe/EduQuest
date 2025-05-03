import React, { useState, useMemo } from 'react';
import { Award, Star, Flame, CheckCircle, Book, Monitor, Download, Video, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import './progress.css';

const CollapsibleSection = ({ title, children, isOpen, toggleOpen }) => (
  <div className="collapsible-section">
    <button
      className="collapsible-header"
      onClick={toggleOpen}
      aria-expanded={isOpen}
      aria-controls={`section-${title}`}
    >
      <h3>{title}</h3>
      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
    {isOpen && (
      <div id={`section-${title}`} className="collapsible-content">
        {children}
      </div>
    )}
  </div>
);

const ProgressTracking = ({ materials = { readings: { items: [] }, modules: { items: [] }, resources: { items: [] } }, videoModules = {}, quizData = [] }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userProgress, setUserProgress] = useState({
    materials: {
      readings: materials.readings.items.map(item => ({
        name: item.name || 'Unnamed Reading',
        completed: false,
        pointsEarned: 0
      })),
      modules: materials.modules.items.map(item => ({
        name: item.name || 'Unnamed Module',
        progress: item.progress || 0,
        completed: item.progress === 100,
        pointsEarned: item.progress === 100 ? 50 : 0
      })),
      resources: materials.resources.items.map(item => ({
        name: item.name || 'Unnamed Resource',
        downloaded: false,
        pointsEarned: 0
      }))
    },
    videos: Object.keys(videoModules).reduce((acc, key) => ({
      ...acc,
      [key]: videoModules[key].videos?.map(video => ({
        id: video.id,
        title: video.title || 'Unnamed Video',
        completed: false,
        pointsEarned: 0
      })) || []
    }), {}),
    quizzes: []
  });
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [badges, setBadges] = useState([]);
  const [streak, setStreak] = useState(0);
  const [showBadge, setShowBadge] = useState(false);
  const [badgeType, setBadgeType] = useState('');
  const [quizFilter, setQuizFilter] = useState('all');
  const [openSections, setOpenSections] = useState({});

  const leaderboard = useMemo(() => [
    { rank: 1, name: 'ScienceMaster', points: 2500 },
    { rank: 2, name: 'LearnLegend', points: 2200 },
    { rank: 3, name: 'QuizStar', points: 1900 },
    { rank: 4, name: 'VideoVanguard', points: 1700 },
    { rank: 5, name: 'You', points }
  ], [points]);

 
  const calculateProgress = useMemo(() => (category) => {
    try {
      if (category === 'materials') {
        const totalItems = materials.readings.items.length + materials.modules.items.length + materials.resources.items.length;
        const completedItems = 
          userProgress.materials.readings.filter(r => r.completed).length +
          userProgress.materials.modules.filter(m => m.completed).length +
          userProgress.materials.resources.filter(r => r.downloaded).length;
        return totalItems ? Math.round((completedItems / totalItems) * 100) : 0;
      } else if (category === 'videos') {
        const totalVideos = Object.values(videoModules).reduce((sum, m) => sum + (m.videos?.length || 0), 0);
        const completedVideos = Object.values(userProgress.videos).flat().filter(v => v.completed).length;
        return totalVideos ? Math.round((completedVideos / totalVideos) * 100) : 0;
      } else if (category === 'quizzes') {
        const totalCorrect = userProgress.quizzes.reduce((sum, q) => sum + q.score, 0);
        const totalQuestions = userProgress.quizzes.length * quizData.length;
        return totalQuestions ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
      }
      return 0;
    } catch (error) {
      console.error('Error calculating progress:', error);
      return 0;
    }
  }, [materials, videoModules, quizData, userProgress]);

  const calculateSubjectProgress = useMemo(() => (subject) => {
    const subjectQuestions = quizData.filter(q => q.subject === subject).length;
    const correctAnswers = userProgress.quizzes.reduce((sum, q) => sum + (q.subjects[subject] || 0), 0);
    return subjectQuestions ? Math.round((correctAnswers / subjectQuestions) * 100) : 0;
  }, [quizData, userProgress]);

 
  const completeItem = (category, subCategory, index, videoModuleKey) => {
    const newProgress = { ...userProgress };
    let earnedPoints = 0;
    let newBadges = [...badges];

    if (category === 'materials') {
      if (subCategory === 'readings') {
        newProgress.materials.readings[index].completed = true;
        newProgress.materials.readings[index].pointsEarned = 10;
        earnedPoints = 10;
        if (!badges.includes('First Reading')) newBadges.push('First Reading');
      } else if (subCategory === 'modules') {
        newProgress.materials.modules[index].progress = 100;
        newProgress.materials.modules[index].completed = true;
        newProgress.materials.modules[index].pointsEarned = 50;
        earnedPoints = 50;
        if (!badges.includes('Module Master')) newBadges.push('Module Master');
      } else if (subCategory === 'resources') {
        newProgress.materials.resources[index].downloaded = true;
        newProgress.materials.resources[index].pointsEarned = 20;
        earnedPoints = 20;
        if (!badges.includes('Resource Rookie')) newBadges.push('Resource Rookie');
      }
    } else if (category === 'videos') {
      newProgress.videos[videoModuleKey][index].completed = true;
      newProgress.videos[videoModuleKey][index].pointsEarned = 10;
      earnedPoints = 10;
      const completedVideos = Object.values(newProgress.videos).flat().filter(v => v.completed).length;
      if (completedVideos >= 4 && !badges.includes('Video Module Master')) {
        newBadges.push('Video Module Master');
        earnedPoints += 20;
      }
      if (completedVideos >= 8 && !badges.includes('Explorer')) {
        newBadges.push('Explorer');
        earnedPoints += 30;
      }
      if (completedVideos >= 12 && !badges.includes('Scholar')) {
        newBadges.push('Scholar');
        earnedPoints += 50;
      }
      if (completedVideos >= 16 && !badges.includes('Knowledge Master')) {
        newBadges.push('Knowledge Master');
        earnedPoints += 100;
      }
    } else if (category === 'quizzes') {
      const score = Math.floor(Math.random() * quizData.length);
      const correctAnswers = quizData.slice(0, score).map(q => q.correctAnswer);
      const quizPoints = correctAnswers.reduce((sum, answer) => {
        const q = quizData.find(q => q.correctAnswer === answer);
        return sum + (q ? q.points + Math.floor(Math.random() * 6) : 0);
      }, 0);
      const newQuiz = {
        id: userProgress.quizzes.length + 1,
        score,
        points: quizPoints,
        timestamp: new Date().toLocaleString(),
        subjects: correctAnswers.reduce((acc, answer) => {
          const q = quizData.find(q => q.correctAnswer === answer);
          if (q) acc[q.subject] = (acc[q.subject] || 0) + 1;
          return acc;
        }, { Physics: 0, Chemistry: 0, Biology: 0 })
      };
      newProgress.quizzes.push(newQuiz);
      earnedPoints = quizPoints;
      if (score >= 5 && !badges.includes('Science Star')) newBadges.push('Science Star');
      if (points + quizPoints >= 100 && !badges.includes('Point Master')) newBadges.push('Point Master');
      if (score === quizData.length && !badges.includes('Perfect Score')) newBadges.push('Perfect Score');
      if (newProgress.quizzes.length >= 5 && !badges.includes('Quiz Veteran')) newBadges.push('Quiz Veteran');
      const subjectCounts = newProgress.quizzes.reduce((acc, q) => {
        Object.keys(q.subjects).forEach(s => acc[s] = (acc[s] || 0) + q.subjects[s]);
        return acc;
      }, { Physics: 0, Chemistry: 0, Biology: 0 });
      if (subjectCounts.Physics >= 4 && !badges.includes('Physics Specialist')) newBadges.push('Physics Specialist');
      if (subjectCounts.Chemistry >= 4 && !badges.includes('Chemistry Specialist')) newBadges.push('Chemistry Specialist');
      if (subjectCounts.Biology >= 2 && !badges.includes('Biology Specialist')) newBadges.push('Biology Specialist');
    }

    
    setStreak(streak + 1);
    if (streak + 1 >= 7 && !badges.includes('7-Day Streak')) {
      newBadges.push('7-Day Streak');
      earnedPoints += 50;
    }
    const hasMaterial = newProgress.materials.readings.some(r => r.completed) ||
                       newProgress.materials.modules.some(m => m.completed) ||
                       newProgress.materials.resources.some(r => r.downloaded);
    const hasVideo = Object.values(newProgress.videos).flat().some(v => v.completed);
    const hasQuiz = newProgress.quizzes.length > 0;
    if (hasMaterial && hasVideo && hasQuiz && !badges.includes('Cross-Disciplinary Learner')) {
      newBadges.push('Cross-Disciplinary Learner');
      earnedPoints += 100;
    }
    const allMaterials = newProgress.materials.readings.every(r => r.completed) &&
                         newProgress.materials.modules.every(m => m.completed) &&
                         newProgress.materials.resources.every(r => r.downloaded);
    const allVideos = Object.values(newProgress.videos).flat().every(v => v.completed);
    const perfectQuiz = newProgress.quizzes.some(q => q.score === quizData.length);
    if (allMaterials && allVideos && perfectQuiz && !badges.includes('Master Learner')) {
      newBadges.push('Master Learner');
      earnedPoints += 200;
    }
    if (points + earnedPoints >= 500 && !badges.includes('Bronze Learner')) {
      newBadges.push('Bronze Learner');
      earnedPoints += 50;
    }
    if (points + earnedPoints >= 1000 && !badges.includes('Silver Learner')) {
      newBadges.push('Silver Learner');
      earnedPoints += 100;
    }
    if (points + earnedPoints >= 2000 && !badges.includes('Gold Learner')) {
      newBadges.push('Gold Learner');
      earnedPoints += 150;
    }

    setUserProgress(newProgress);
    setPoints(points + earnedPoints);
    setBadges(newBadges);
    if (newBadges.length > badges.length) {
      setBadgeType(newBadges[newBadges.length - 1].toLowerCase().replace(/\s/g, ''));
      setShowBadge(true);
    }
    if (points + earnedPoints >= level * 100) setLevel(level + 1);
  };

 
  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  
  const filteredQuizzes = useMemo(() => {
    if (quizFilter === 'all') return userProgress.quizzes;
    return userProgress.quizzes.filter(quiz => 
      Object.keys(quiz.subjects).some(subject => subject === quizFilter && quiz.subjects[subject] > 0)
    );
  }, [quizFilter, userProgress.quizzes]);

 
  const getBadgeInfo = () => {
    const badgeMap = {
      firstreading: { title: 'First Reading', description: 'Completed your first reading!', icon: <Book className="text-blue-500 text-4xl" />, points: 10 },
      modulemaster: { title: 'Module Master', description: 'Completed all interactive modules!', icon: <Monitor className="text-green-500 text-4xl" />, points: 50 },
      resourcerookie: { title: 'Resource Rookie', description: 'Downloaded your first resource!', icon: <Download className="text-purple-500 text-4xl" />, points: 20 },
      videomodulemaster: { title: 'Video Module Master', description: 'Completed all videos in a module!', icon: <Video className="text-yellow-500 text-4xl" />, points: 20 },
      explorer: { title: 'Explorer', description: 'Watched videos across multiple subjects!', icon: <Award className="text-bronze-500 text-4xl" />, points: 30 },
      scholar: { title: 'Scholar', description: 'Reached advanced video learning status!', icon: <Book className="text-blue-500 text-4xl" />, points: 50 },
      knowledgemaster: { title: 'Knowledge Master', description: 'Completed all videos!', icon: <Star className="text-gold-500 text-4xl" />, points: 100 },
      sciencestar: { title: 'Science Star', description: 'Answered 5 quiz questions correctly!', icon: <Star className="text-yellow-500 text-4xl" />, points: 20 },
      pointmaster: { title: 'Point Master', description: 'Earned 100 total points!', icon: <Award className="text-gold-500 text-4xl" />, points: 30 },
      perfectscore: { title: 'Perfect Score', description: 'Answered all quiz questions correctly!', icon: <CheckCircle className="text-green-500 text-4xl" />, points: 50 },
      quizveteran: { title: 'Quiz Veteran', description: 'Completed 5 quizzes!', icon: <Book className="text-blue-500 text-4xl" />, points: 20 },
      physicsspecialist: { title: 'Physics Specialist', description: 'Mastered all Physics quiz questions!', icon: <Award className="text-blue-500 text-4xl" />, points: 20 },
      chemistryspecialist: { title: 'Chemistry Specialist', description: 'Mastered all Chemistry quiz questions!', icon: <Award className="text-purple-500 text-4xl" />, points: 20 },
      biologyspecialist: { title: 'Biology Specialist', description: 'Mastered all Biology quiz questions!', icon: <Award className="text-green-500 text-4xl" />, points: 20 },
      '7-daystreak': { title: '7-Day Streak', description: 'Engaged for 7 consecutive days!', icon: <Flame className="text-orange-500 text-4xl" />, points: 50 },
      crossdisciplinarylearner: { title: 'Cross-Disciplinary Learner', description: 'Completed items from all learning types!', icon: <Star className="text-gold-500 text-4xl" />, points: 100 },
      masterlearner: { title: 'Master Learner', description: 'Completed all learning content!', icon: <Award className="text-gold-500 text-4xl" />, points: 200 },
      bronzelearner: { title: 'Bronze Learner', description: 'Earned 500 points!', icon: <Award className="text-bronze-500 text-4xl" />, points: 50 },
      silverlearner: { title: 'Silver Learner', description: 'Earned 1000 points!', icon: <Award className="text-silver-500 text-4xl" />, points: 100 },
      goldlearner: { title: 'Gold Learner', description: 'Earned 2000 points!', icon: <Award className="text-gold-500 text-4xl" />, points: 150 }
    };
    return badgeMap[badgeType] || { title: '', description: '', icon: null, points: 0 };
  };

  return (
    <div className="progress-tracking-container">
      <header className="progress-header">
        <h1>Your Learning Progress</h1>
        <p>Track your journey through A/L Science learning materials, videos, and quizzes.</p>
      </header>

 
      <nav className="tabs">
        {['overview', 'materials', 'videos', 'quizzes'].map(tab => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
            aria-selected={activeTab === tab}
            role="tab"
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

     
      {activeTab === 'overview' && (
        <section className="overview">
          <div className="progress-summary">
            {[
              { title: 'Materials', progress: calculateProgress('materials'), icon: Book },
              { title: 'Videos', progress: calculateProgress('videos'), icon: Video },
              { title: 'Quizzes', progress: calculateProgress('quizzes'), icon: HelpCircle }
            ].map(({ title, progress, icon: Icon }) => (
              <div key={title} className="summary-card">
                <div className="card-header">
                  <Icon size={24} />
                  <h3>{title}</h3>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <p>{progress}% {title === 'Quizzes' ? 'Correct' : 'Complete'}</p>
              </div>
            ))}
          </div>
          <div className="stats-section">
            <div className="stat-item"><Star size={24} /><span>{points} Points</span></div>
            <div className="stat-item"><Award size={24} /><span>Level {level}</span></div>
            <div className="stat-item"><Flame size={24} /><span>{streak} Day Streak</span></div>
            <div className="stat-item"><CheckCircle size={24} /><span>{badges.length} Badges</span></div>
          </div>
          <div className="subject-progress">
            <h2>Subject Progress</h2>
            <div className="progress-grid">
              {['Physics', 'Chemistry', 'Biology', 'Mathematics'].map(subject => (
                <div key={subject} className="progress-card">
                  <h3>{subject}</h3>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${calculateSubjectProgress(subject)}%` }}></div>
                  </div>
                  <p>{calculateSubjectProgress(subject)}% {subject === 'Mathematics' ? 'Complete' : 'Correct'}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

   
      {activeTab === 'materials' && (
        <section className="materials-progress">
          {['readings', 'modules', 'resources'].map(subCategory => (
            <CollapsibleSection
              key={subCategory}
              title={subCategory.charAt(0).toUpperCase() + subCategory.slice(1)}
              isOpen={openSections[subCategory] || false}
              toggleOpen={() => toggleSection(subCategory)}
            >
              <div className="progress-grid">
                {userProgress.materials[subCategory].map((item, index) => (
                  <div key={item.name} className="progress-card">
                    <h3>{item.name}</h3>
                    <p>
                      {subCategory === 'modules' ? `${item.progress}% Complete` : item.completed || item.downloaded ? 'Completed' : 'Not Started'}
                    </p>
                    <p>Points: {item.pointsEarned}</p>
                    {!item.completed && !item.downloaded && (
                      <button
                        className="action-button"
                        onClick={() => completeItem('materials', subCategory, index)}
                        aria-label={`Complete ${item.name}`}
                      >
                        {subCategory === 'resources' ? 'Download' : 'Complete'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          ))}
        </section>
      )}

     
      {activeTab === 'videos' && (
        <section className="videos-progress">
          {Object.keys(videoModules).map(moduleKey => (
            <CollapsibleSection
              key={moduleKey}
              title={`${moduleKey.charAt(0).toUpperCase() + moduleKey.slice(1)} Videos`}
              isOpen={openSections[moduleKey] || false}
              toggleOpen={() => toggleSection(moduleKey)}
            >
              <div className="progress-grid">
                {userProgress.videos[moduleKey].map((video, index) => (
                  <div key={video.id} className="progress-card">
                    <h3>{video.title}</h3>
                    <p>{video.completed ? 'Completed' : 'Not Started'}</p>
                    <p>Points: {video.pointsEarned}</p>
                    {!video.completed && (
                      <button
                        className="action-button"
                        onClick={() => completeItem('videos', null, index, moduleKey)}
                        aria-label={`Complete ${video.title}`}
                      >
                        Mark as Complete
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          ))}
        </section>
      )}

     
      {activeTab === 'quizzes' && (
        <section className="quizzes-progress">
          <CollapsibleSection
            title="Subject Progress"
            isOpen={openSections.subjectProgress || false}
            toggleOpen={() => toggleSection('subjectProgress')}
          >
            <div className="progress-grid">
              {['Physics', 'Chemistry', 'Biology'].map(subject => (
                <div key={subject} className="progress-card">
                  <h3>{subject}</h3>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${calculateSubjectProgress(subject)}%` }}></div>
                  </div>
                  <p>{calculateSubjectProgress(subject)}% Correct</p>
                </div>
              ))}
            </div>
          </CollapsibleSection>
          <CollapsibleSection
            title="Quiz History"
            isOpen={openSections.quizHistory || false}
            toggleOpen={() => toggleSection('quizHistory')}
          >
            <div className="filter-section">
              <label htmlFor="quiz-filter" className="filter-label">Filter by Subject:</label>
              <select
                id="quiz-filter"
                value={quizFilter}
                onChange={(e) => setQuizFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
              </select>
            </div>
            {filteredQuizzes.length === 0 ? (
              <p className="no-data">No quizzes completed yet.</p>
            ) : (
              <div className="progress-grid">
                {filteredQuizzes.map(quiz => (
                  <div key={quiz.id} className="progress-card">
                    <h3>Quiz #{quiz.id} - {quiz.timestamp}</h3>
                    <p>Score: {quiz.score}/{quizData.length}</p>
                    <p>Points: {quiz.points}</p>
                    <p>
                      Subjects: Physics ({quiz.subjects.Physics}), Chemistry ({quiz.subjects.Chemistry}), Biology ({quiz.subjects.Biology})
                    </p>
                  </div>
                ))}
              </div>
            )}
            <button
              className="action-button"
              onClick={() => completeItem('quizzes')}
              aria-label="Simulate quiz attempt"
            >
              Simulate Quiz Attempt
            </button>
          </CollapsibleSection>
        </section>
      )}


      <section className="badges-section">
        <h2>Your Badges</h2>
        <div className="badges-grid">
          {[
            { name: 'First Reading', icon: Book, earned: badges.includes('First Reading') },
            { name: 'Module Master', icon: Monitor, earned: badges.includes('Module Master') },
            { name: 'Resource Rookie', icon: Download, earned: badges.includes('Resource Rookie') },
            { name: 'Video Module Master', icon: Video, earned: badges.includes('Video Module Master') },
            { name: 'Explorer', icon: Award, earned: badges.includes('Explorer') },
            { name: 'Scholar', icon: Book, earned: badges.includes('Scholar') },
            { name: 'Knowledge Master', icon: Star, earned: badges.includes('Knowledge Master') },
            { name: 'Science Star', icon: Star, earned: badges.includes('Science Star') },
            { name: 'Point Master', icon: Award, earned: badges.includes('Point Master') },
            { name: 'Perfect Score', icon: CheckCircle, earned: badges.includes('Perfect Score') },
            { name: 'Quiz Veteran', icon: Book, earned: badges.includes('Quiz Veteran') },
            { name: 'Physics Specialist', icon: Award, earned: badges.includes('Physics Specialist') },
            { name: 'Chemistry Specialist', icon: Award, earned: badges.includes('Chemistry Specialist') },
            { name: 'Biology Specialist', icon: Award, earned: badges.includes('Biology Specialist') },
            { name: '7-Day Streak', icon: Flame, earned: badges.includes('7-Day Streak') },
            { name: 'Cross-Disciplinary Learner', icon: Star, earned: badges.includes('Cross-Disciplinary Learner') },
            { name: 'Master Learner', icon: Award, earned: badges.includes('Master Learner') },
            { name: 'Bronze Learner', icon: Award, earned: badges.includes('Bronze Learner') },
            { name: 'Silver Learner', icon: Award, earned: badges.includes('Silver Learner') },
            { name: 'Gold Learner', icon: Award, earned: badges.includes('Gold Learner') }
          ].map(badge => (
            <div
              key={badge.name}
              className={`badge-card ${badge.earned ? 'earned' : 'locked'}`}
              role="button"
              tabIndex={0}
              onClick={() => badge.earned && setShowBadge(true) && setBadgeType(badge.name.toLowerCase().replace(/\s/g, ''))}
              onKeyPress={(e) => e.key === 'Enter' && badge.earned && setShowBadge(true) && setBadgeType(badge.name.toLowerCase().replace(/\s/g, ''))}
              aria-label={`${badge.name} badge, ${badge.earned ? 'earned' : 'locked'}`}
            >
              <badge.icon size={32} />
              <span>{badge.name}</span>
            </div>
          ))}
        </div>
      </section>

   
      <section className="leaderboard">
        <h2>Leaderboard</h2>
        <div className="leaderboard-table">
          <div className="table-header">
            <span>Rank</span>
            <span>User</span>
            <span>Points</span>
          </div>
          {leaderboard.map(user => (
            <div key={user.rank} className={`table-row ${user.name === 'You' ? 'highlight' : ''}`}>
              <span>{user.rank}</span>
              <span>{user.name}</span>
              <span>{user.points}</span>
            </div>
          ))}
        </div>
      </section>

      
      {showBadge && (
        <div className="badge-modal" role="dialog" aria-labelledby="badge-title" aria-describedby="badge-description">
          <div className="badge-content">
            {getBadgeInfo().icon}
            <h3 id="badge-title">{getBadgeInfo().title}</h3>
            <p id="badge-description">{getBadgeInfo().description}</p>
            <p className="badge-points">+{getBadgeInfo().points} points!</p>
            <button
              className="action-button"
              onClick={() => setShowBadge(false)}
              aria-label="Close badge notification"
            >
              Continue Learning
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProgressTracking;