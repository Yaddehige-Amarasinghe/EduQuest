import React, { useState, useEffect } from 'react';
import { 
  Book, 
  Monitor, 
  Download, 
  ArrowRight, 
  BookmarkIcon, 
  CheckCircle 
} from 'lucide-react';
import './materials.css';

const ScienceMaterials = () => {
  const [activeTab, setActiveTab] = useState('readings');
  const [progress, setProgress] = useState({ materials: [] });
  const token = localStorage.getItem('token');

  const tabs = [
    { id: 'readings', label: 'Curated Reading Lists', icon: Book },
    { id: 'modules', label: 'Interactive Modules', icon: Monitor },
    { id: 'resources', label: 'Downloadable Resources', icon: Download }
  ];

  const materials = {
    readings: {
      title: 'Scientific Literature & Textbooks',
      description: 'Comprehensive collection of cutting-edge scientific publications and foundational textbooks',
      items: [
        {
          id: 'reading1',
          name: 'Advanced Molecular Biology',
          author: 'Dr. Elena Rodriguez',
          type: 'Comprehensive Textbook',
          image: 'https://thumbs.dreamstime.com/z/vector-molecular-biology-round-illustration-thin-line-style-concept-141970532.jpg',
          tags: ['Genetics', 'Advanced'],
          description: 'In-depth exploration of molecular mechanisms and cellular processes'
        },
        {
          id: 'reading2',
          name: 'Quantum Physics Principles',
          author: 'Prof. Michael Chen',
          type: 'Research Compilation',
          image: 'https://blogassets.leverageedu.com/blog/wp-content/uploads/2020/08/17201124/Bestselling-Quantum-Physics-Books-1.jpg',
          tags: ['Physics', 'Quantum Mechanics'],
          description: 'Cutting-edge insights into quantum theory and modern physics'
        },
        {
          id: 'reading3',
          name: 'Ecological Systems Dynamics',
          author: 'Dr. Sarah Thompson',
          type: 'Academic Reference',
          image: 'https://media.istockphoto.com/id/1344285301/vector/male-and-female-characters-are-generating-ideas.jpg?s=612x612&w=0&k=20&c=smk8e_2U0CsKzF83RL-dei26SXZQyksjc2mDMEWHhuA=',
          tags: ['Ecology', 'Environmental Science'],
          description: 'Comprehensive analysis of complex ecological interactions'
        },
        {
          id: 'reading4',
          name: 'Computational Neuroscience',
          author: 'Dr. Alex Wong',
          type: 'Interdisciplinary Text',
          image: 'https://st3.depositphotos.com/16364802/19087/v/450/depositphotos_190876584-stock-illustration-abstract-technology-science-concept-brain.jpg',
          tags: ['Neuroscience', 'Computer Science'],
          description: 'Bridging computational methods with neurological research'
        }
      ]
    },
    modules: {
      title: 'Interactive Learning Experiences',
      description: 'Immersive, hands-on learning modules designed to enhance scientific understanding',
      items: [
        {
          id: 'module1',
          name: 'Advanced Laboratory Techniques',
          duration: '4 hours 30 mins',
          level: 'Advanced',
          image: 'https://img.freepik.com/free-vector/flat-world-science-day-illustration_23-2149818035.jpg',
          description: 'Practical skills for cutting-edge scientific research methods'
        },
        {
          id: 'module2',
          name: 'Data Analysis in Science',
          duration: '3 hours 45 mins',
          level: 'Intermediate',
          image: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/Data-Science-vs.-Big-Data-vs.jpg',
          description: 'Statistical approaches and computational tools for scientific research'
        },
        {
          id: 'module3',
          name: 'Scientific Writing Workshop',
          duration: '2 hours 15 mins',
          level: 'Beginner',
          image: 'https://d2nzy1qhita6w.cloudfront.net/media/magefan_blog/data-analysis-vs-data-science.jpeg',
          description: 'Techniques for effective academic and research communication'
        },
        {
          id: 'module4',
          name: 'Research Ethics & Methodology',
          duration: '3 hours',
          level: 'Intermediate',
          image: 'https://itchronicles.com/wp-content/uploads/2019/05/bigstock-Doctor-With-Medical-Healthcare-287331085.jpg',
          description: 'Comprehensive guide to ethical research practices'
        }
      ]
    },
    resources: {
      title: 'Professional Scientific Resources',
      description: 'Downloadable tools, templates, and reference materials for scientific research',
      items: [
        {
          id: 'resource1',
          name: 'Research Proposal Template',
          format: 'DOCX, PDF',
          size: '320 KB',
          downloads: 1456,
          image: 'https://thumbs.dreamstime.com/b/research-proposal-concept-people-team-analyze-analysis-some-data-paper-document-modern-flat-style-vector-illustration-232620412.jpg',
          description: 'Comprehensive framework for crafting compelling research proposals'
        },
        {
          id: 'resource2',
          name: 'Data Visualization Toolkit',
          format: 'XLSX, PPT',
          size: '520 KB',
          downloads: 2310,
          image: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210705144258/What-is-Data-Visualization-and-Why-is-It-Important.png',
          description: 'Advanced tools for creating professional scientific visualizations'
        },
        {
          id: 'resource3',
          name: 'Laboratory Experiment Planner',
          format: 'XLSX',
          size: '240 KB',
          downloads: 1872,
          image: 'https://www.simplypsychology.org/wp-content/uploads/science-lab2.jpg',
          description: 'Systematic approach to planning and documenting scientific experiments'
        },
        {
          id: 'resource4',
          name: 'Scientific Reference Manager',
          format: 'PDF, CSV',
          size: '180 KB',
          downloads: 1654,
          image: 'https://static-blog.onlyoffice.com/wp-content/uploads/2024/01/19100758/Best-reference-management-software-2024.png',
          description: 'Comprehensive citation and reference tracking system'
        }
      ]
    }
  };

  useEffect(() => {
    if (token) {
      fetch('http://localhost:5000/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setProgress(data.progress || { materials: [] }))
        .catch(err => console.error('Error fetching progress:', err));
    }
  }, [token]);

  const updateProgress = async (materialId, category, completed, progress) => {
    try {
      const response = await fetch('http://localhost:5000/progress/materials', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ materialId, category, completed, progress })
      });
      const data = await response.json();
      if (response.ok) {
        setProgress(prev => ({
          ...prev,
          materials: prev.materials.map(m =>
            m.materialId === materialId ? { ...m, completed, progress } : m
          )
        }));
      } else {
        console.error('Error updating progress:', data.message);
      }
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  };

  const renderMaterialCard = (item, category) => {
    const materialProgress = progress.materials.find(m => m.materialId === item.id) || { progress: 0, completed: false };
    return (
      <div className="material-card">
        <div className="card-image">
          <img src={item.image} alt={item.name} />
          {category === 'modules' && materialProgress.progress > 0 && (
            <div className="progress-overlay">
              <div 
                className="progress-bar" 
                style={{width: `${materialProgress.progress}%`}}
              />
              <span>{materialProgress.progress}% Complete</span>
            </div>
          )}
        </div>
        <div className="card-content">
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <div className="card-meta">
            {category === 'readings' && (
              <div className="author-info">
                <span>By {item.author}</span>
                <div className="tags">
                  {item.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            )}
            {category === 'modules' && (
              <div className="module-info">
                <span>{item.duration}</span>
                <span className="level">{item.level}</span>
              </div>
            )}
            {category === 'resources' && (
              <div className="resource-info">
                <span>{item.format}</span>
                <span>{item.size}</span>
                <span className="downloads">
                  <Download size={16} /> {item.downloads}
                </span>
              </div>
            )}
          </div>
          <div className="card-actions">
            <button 
              className="primary-action"
              onClick={() => updateProgress(item.id, category, true, category === 'modules' ? 100 : undefined)}
            >
              {materialProgress.completed ? 'Completed' : 
               category === 'readings' ? 'View Material' : 
               category === 'modules' ? 'Start Module' : 'Download'}
              <ArrowRight size={18} />
            </button>
            <button className="bookmark-action" title="Bookmark">
              <BookmarkIcon size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="science-materials-container">
      <div className="materials-banner">
        <div className="banner-content">
          <h1>Scientific Learning Ecosystem</h1>
          <p>Comprehensive resources for cutting-edge scientific education and research</p>
          <div className="banner-stats">
            <div className="stat">
              <CheckCircle size={24} />
              <span>4+ Curated Reading Lists</span>
            </div>
            <div className="stat">
              <Monitor size={24} />
              <span>4 Interactive Modules</span>
            </div>
            <div className="stat">
              <Download size={24} />
              <span>4 Professional Resources</span>
            </div>
          </div>
        </div>
        <div className="banner-image">
          <img 
            src="course.png" 
            alt="Scientific Research Laboratory" 
          />
        </div>
      </div>

      <div className="materials-navigation">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={24} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="materials-section">
        <div className="section-header">
          <h2>{materials[activeTab].title}</h2>
          <p>{materials[activeTab].description}</p>
        </div>
        <div className="materials-grid">
          {materials[activeTab].items.map((item) => (
            renderMaterialCard(item, activeTab)
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScienceMaterials;