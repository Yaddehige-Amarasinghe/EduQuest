import React, { useState } from "react";
import "./admin.css";
import {
  FaUserGraduate,
  FaBook,
  FaChartBar,
  FaMoneyBill,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaUsers,
  FaPlus,
  FaEdit,
  FaTrash,
  FaChalkboardTeacher,
  FaFileAlt,
  FaVideo,
  FaQuestionCircle,
  FaSearch,
  FaTachometerAlt,
  FaCalendarAlt,
  FaFilter,
  FaEllipsisV,
  FaDownload,
  FaArrowUp,
  FaArrowDown,
  FaBars,
  FaTimes
} from "react-icons/fa";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("materials");
  const [searchTerm, setSearchTerm] = useState("");
  const [contentSortOrder, setContentSortOrder] = useState("asc");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newContent, setNewContent] = useState({
    title: "",
    course: "",
    author: "",
    status: "draft"
  });

  const contentData = {
    materials: [
      { id: 1, title: "Introduction to React", course: "React Basics", author: "John Smith", date: "Apr 28, 2025", status: "Published" },
      { id: 2, title: "Python Programming Guide", course: "Python for Beginners", author: "Sarah Johnson", date: "Apr 25, 2025", status: "Draft" },
      { id: 3, title: "JavaScript ES6 Features", course: "Advanced JavaScript", author: "Michael Davis", date: "Apr 22, 2025", status: "Published" },
      { id: 4, title: "Database Design Principles", course: "SQL Fundamentals", author: "Jennifer Lee", date: "Apr 20, 2025", status: "In Review" }
    ],
    videos: [
      { id: 1, title: "React Hooks Tutorial", course: "Advanced React", author: "David Wilson", duration: "15:30", status: "Published" },
      { id: 2, title: "Building REST APIs", course: "Backend Development", author: "Amanda Chen", duration: "22:45", status: "Published" },
      { id: 3, title: "CSS Grid Layout", course: "Modern CSS", author: "Robert Taylor", duration: "18:15", status: "Draft" }
    ],
    quizzes: [
      { id: 1, title: "JavaScript Basics Quiz", course: "JavaScript Fundamentals", author: "Ryan Peters", questions: 10, status: "Published" },
      { id: 2, title: "Python Programming Quiz", course: "Python for Beginners", author: "Lisa Wang", questions: 8, status: "Published" },
      { id: 3, title: "SQL Queries Assessment", course: "Database Management", author: "Andrew Kim", questions: 12, status: "In Review" }
    ]
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchTerm("");
    setFilterStatus("all");
  };

  const toggleSortOrder = () => {
    setContentSortOrder(contentSortOrder === "asc" ? "desc" : "asc");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCreateContent = (e) => {
    e.preventDefault();
  
    console.log("Creating new content:", newContent);
    setShowCreateModal(false);
    setNewContent({ title: "", course: "", author: "", status: "draft" });
  };

  const handleDeleteContent = (id) => {
    
    console.log("Deleting content with id:", id);
    setShowDeleteConfirm(null);
  };

  const handleExportCSV = () => {
    const data = contentData[activeTab];
    const headers = Object.keys(data[0]).join(",");
    const csv = [headers, ...data.map(item => Object.values(item).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeTab}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredData = contentData[activeTab].filter(item => {
    const matchesSearch = Object.values(item).some(val =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesFilter = filterStatus === "all" || item.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    return contentSortOrder === "asc" ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
  });

  return (
    <div className="admin-container">
     
      <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Toggle sidebar">
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>


      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`} aria-label="Admin navigation">
        <div className="sidebar-header">
          <h2 className="logo">EduQuest</h2>
          <span className="app-version">v2.3.0</span>
        </div>
        
        <div className="sidebar-user">
          <img
            src="https://static.vecteezy.com/system/resources/previews/043/900/708/non_2x/user-profile-icon-illustration-vector.jpg"
            alt="Admin Avatar"
          />
          <div className="user-info">
            <h3>Gaveen Amarasinghe</h3>
            <span className="user-role">Administrator</span>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-section">
            <h4 className="nav-title">MAIN</h4>
            <ul>
              <li className="nav-item">
                <a href="#dashboard" aria-label="Dashboard">
                  <FaTachometerAlt /> <span>Dashboard</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#analytics" aria-label="Analytics">
                  <FaChartBar /> <span>Analytics</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#calendar" aria-label="Calendar">
                  <FaCalendarAlt /> <span>Calendar</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div className="nav-section">
            <h4 className="nav-title">MANAGEMENT</h4>
            <ul>
              <li className="nav-item">
                <a href="#users" aria-label="Users">
                  <FaUsers /> <span>Users</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#courses" aria-label="Courses">
                  <FaBook /> <span>Courses</span>
                </a>
              </li>
              <li className="nav-item active">
                <a href="#materials" aria-label="Materials">
                  <FaFileAlt /> <span>Materials</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#videos" aria-label="Videos">
                  <FaVideo /> <span>Videos</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#quizzes" aria-label="Quizzes">
                  <FaQuestionCircle /> <span>Quizzes</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div className="nav-section">
            <h4 className="nav-title">SYSTEM</h4>
            <ul>
              <li className="nav-item">
                <a href="#notifications" aria-label="Notifications">
                  <FaBell /> <span>Notifications</span>
                  <span className="notification-badge">5</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#settings" aria-label="Settings">
                  <FaCog /> <span>Settings</span>
                </a>
              </li>
              <li className="nav-item logout">
                <a href="#logout" aria-label="Logout">
                  <FaSignOutAlt /> <span>Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        
        <div className="sidebar-footer">
          <p>© 2025 EduQuest Ltd.</p>
          <p>All rights reserved</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        {/* Header */}
        <header className="admin-header">
          <div className="admin-breadcrumb">
            <h1>Content Management</h1>
            <div className="breadcrumb-path">
              <span>Dashboard</span> / <span>Materials</span>
            </div>
          </div>
          
          <div className="admin-header-actions">
            <div className="admin-search">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search..."
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="quick-actions">
              <button className="notification-btn" aria-label="Notifications">
                <FaBell />
                <span className="badge">3</span>
              </button>
              
              <div className="user-dropdown">
                <button className="user-dropdown-btn" onClick={toggleDropdown} aria-label="User menu">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/043/900/708/non_2x/user-profile-icon-illustration-vector.jpg"
                    alt="Admin Avatar"
                  />
                  <span>Gaveen</span>
                </button>
                
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <a href="#profile">My Profile</a>
                    <a href="#settings">Settings</a>
                    <a href="#activity">Activity Log</a>
                    <div className="dropdown-divider"></div>
                    <a href="#logout" className="dropdown-logout">
                      <FaSignOutAlt /> Logout
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Summary */}
        <section className="dashboard-summary">
          <div className="summary-card">
            <div className="summary-icon students">
              <FaUserGraduate />
            </div>
            <div className="summary-details">
              <h3>1,248</h3>
              <p>Total Students</p>
              <span className="summary-trend positive">
                <FaArrowUp /> 12%
              </span>
            </div>
          </div>
          
          <div className="summary-card">
            <div className="summary-icon courses">
              <FaBook />
            </div>
            <div className="summary-details">
              <h3>85</h3>
              <p>Active Courses</p>
              <span className="summary-trend positive">
                <FaArrowUp /> 5%
              </span>
            </div>
          </div>
          
          <div className="summary-card">
            <div className="summary-icon revenue">
              <FaMoneyBill />
            </div>
            <div className="summary-details">
              <h3>$12,500</h3>
              <p>Monthly Revenue</p>
              <span className="summary-trend positive">
                <FaArrowUp /> 8%
              </span>
            </div>
          </div>
          
          <div className="summary-card">
            <div className="summary-icon engagement">
              <FaChartBar />
            </div>
            <div className="summary-details">
              <h3>85%</h3>
              <p>Engagement Rate</p>
              <span className="summary-trend negative">
                <FaArrowDown /> 3%
              </span>
            </div>
          </div>
        </section>

      
        <section className="content-management-section">
          <div className="section-header">
            <h2>Learning Content Manager</h2>
            <div className="section-actions">
              <select
                className="filter-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                aria-label="Filter by status"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="in review">In Review</option>
              </select>
              <button className="export-btn" onClick={handleExportCSV}>
                <FaDownload /> Export CSV
              </button>
              <button className="add-content-btn" onClick={() => setShowCreateModal(true)}>
                <FaPlus /> Create New
              </button>
            </div>
          </div>
          
          <div className="content-tabs">
            <button
              className={activeTab === "materials" ? "active" : ""}
              onClick={() => handleTabChange("materials")}
              aria-label="Manage Materials"
            >
              <FaFileAlt /> Materials
            </button>
            <button
              className={activeTab === "videos" ? "active" : ""}
              onClick={() => handleTabChange("videos")}
              aria-label="Manage Videos"
            >
              <FaVideo /> Videos
            </button>
            <button
              className={activeTab === "quizzes" ? "active" : ""}
              onClick={() => handleTabChange("quizzes")}
              aria-label="Manage Quizzes"
            >
              <FaQuestionCircle /> Quizzes
            </button>
          </div>
          
          <div className="content-table-container">
            {activeTab === "materials" && (
              <table className="content-table">
                <thead>
                  <tr>
                    <th>
                      <div className="th-content">
                        <span>Title</span>
                        <button className="sort-btn" onClick={toggleSortOrder} aria-label="Sort by title">
                          {contentSortOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />}
                        </button>
                      </div>
                    </th>
                    <th>Course</th>
                    <th>Author</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map(item => (
                    <tr key={item.id}>
                      <td>
                        <div className="content-title">
                          <span className="content-icon"><FaFileAlt /></span>
                          <span>{item.title}</span>
                        </div>
                      </td>
                      <td>{item.course}</td>
                      <td>{item.author}</td>
                      <td>{item.date}</td>
                      <td><span className={`status-badge ${item.status.toLowerCase().replace(" ", "-")}`}>{item.status}</span></td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn edit" aria-label="Edit Material">
                            <FaEdit />
                          </button>
                          <button
                            className="action-btn delete"
                            onClick={() => setShowDeleteConfirm(item.id)}
                            aria-label="Delete Material"
                          >
                            <FaTrash />
                          </button>
                          <button className="action-btn more" aria-label="More options">
                            <FaEllipsisV />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {activeTab === "videos" && (
              <table className="content-table">
                <thead>
                  <tr>
                    <th>
                      <div className="th-content">
                        <span>Title</span>
                        <button className="sort-btn" onClick={toggleSortOrder} aria-label="Sort by title">
                          {contentSortOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />}
                        </button>
                      </div>
                    </th>
                    <th>Course</th>
                    <th>Author</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map(item => (
                    <tr key={item.id}>
                      <td>
                        <div className="content-title">
                          <span className="content-icon"><FaVideo /></span>
                          <span>{item.title}</span>
                        </div>
                      </td>
                      <td>{item.course}</td>
                      <td>{item.author}</td>
                      <td>{item.duration}</td>
                      <td><span className={`status-badge ${item.status.toLowerCase().replace(" ", "-")}`}>{item.status}</span></td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn edit" aria-label="Edit Video">
                            <FaEdit />
                          </button>
                          <button
                            className="action-btn delete"
                            onClick={() => setShowDeleteConfirm(item.id)}
                            aria-label="Delete Video"
                          >
                            <FaTrash />
                          </button>
                          <button className="action-btn more" aria-label="More options">
                            <FaEllipsisV />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {activeTab === "quizzes" && (
              <table className="content-table">
                <thead>
                  <tr>
                    <th>
                      <div className="th-content">
                        <span>Title</span>
                        <button className="sort-btn" onClick={toggleSortOrder} aria-label="Sort by title">
                          {contentSortOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />}
                        </button>
                      </div>
                    </th>
                    <th>Course</th>
                    <th>Author</th>
                    <th>Questions</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map(item => (
                    <tr key={item.id}>
                      <td>
                        <div className="content-title">
                          <span className="content-icon"><FaQuestionCircle /></span>
                          <span>{item.title}</span>
                        </div>
                      </td>
                      <td>{item.course}</td>
                      <td>{item.author}</td>
                      <td>{item.questions}</td>
                      <td><span className={`status-badge ${item.status.toLowerCase().replace(" ", "-")}`}>{item.status}</span></td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn edit" aria-label="Edit Quiz">
                            <FaEdit />
                          </button>
                          <button
                            className="action-btn delete"
                            onClick={() => setShowDeleteConfirm(item.id)}
                            aria-label="Delete Quiz"
                          >
                            <FaTrash />
                          </button>
                          <button className="action-btn more" aria-label="More options">
                            <FaEllipsisV />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            
            <div className="table-pagination">
              <div className="pagination-info">
                Showing {filteredData.length} of {contentData[activeTab].length} entries
              </div>
              <div className="pagination-controls">
                <button className="pagination-btn" disabled>Previous</button>
                <button className="pagination-btn active">1</button>
                <button className="pagination-btn">2</button>
                <button className="pagination-btn">3</button>
                <button className="pagination-btn">Next</button>
              </div>
            </div>
          </div>
        </section>

       
        {showCreateModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Create New {activeTab.slice(0, -1)}</h2>
                <button
                  className="modal-close"
                  onClick={() => setShowCreateModal(false)}
                  aria-label="Close modal"
                >
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleCreateContent}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={newContent.title}
                    onChange={(e) => setNewContent({...newContent, title: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="course">Course</label>
                  <input
                    type="text"
                    id="course"
                    value={newContent.course}
                    onChange={(e) => setNewContent({...newContent, course: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="author">Author</label>
                  <input
                    type="text"
                    id="author"
                    value={newContent.author}
                    onChange={(e) => setNewContent({...newContent, author: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    value={newContent.status}
                    onChange={(e) => setNewContent({...newContent, status: e.target.value})}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="in review">In Review</option>
                  </select>
                </div>
                <div className="modal-actions">
                  <button type="button" className="cancel-btn" onClick={() => setShowCreateModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      
        {showDeleteConfirm && (
          <div className="modal-overlay">
            <div className="modal-content confirm-dialog">
              <div className="modal-header">
                <h2>Confirm Delete</h2>
                <button
                  className="modal-close"
                  onClick={() => setShowDeleteConfirm(null)}
                  aria-label="Close modal"
                >
                  <FaTimes />
                </button>
              </div>
              <p>Are you sure you want to delete this {activeTab.slice(0, -1)}? This action cannot be undone.</p>
              <div className="modal-actions">
                <button
                  className="cancel-btn"
                  onClick={() => setShowDeleteConfirm(null)}
                >
                  Cancel
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteContent(showDeleteConfirm)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        
        <section className="recent-activity-section">
          <div className="section-header">
            <h2>Recent Activity</h2>
            <a href="#view-all" className="view-all-link">View All</a>
          </div>
          
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon enrollment">
                <FaUserGraduate />
              </div>
              <div className="activity-details">
                <p><strong>John Doe</strong> enrolled in <strong>"React Basics"</strong></p>
                <span className="activity-time">2 hours ago</span>
              </div>
            </div>
            
            <div className="activity-item">
              <div className="activity-icon completion">
                <FaBook />
              </div>
              <div className="activity-details">
                <p><strong>Jane Smith</strong> completed <strong>"Advanced JavaScript"</strong></p>
                <span className="activity-time">4 hours ago</span>
              </div>
            </div>
            
            <div className="activity-item">
              <div className="activity-icon approval">
                <FaEdit />
              </div>
              <div className="activity-details">
                <p>Admin approved <strong>"Python for Beginners"</strong> course</p>
                <span className="activity-time">1 day ago</span>
              </div>
            </div>
            
            <div className="activity-item">
              <div className="activity-icon registration">
                <FaChalkboardTeacher />
              </div>
              <div className="activity-details">
                <p>New instructor <strong>James Lee</strong> registered</p>
                <span className="activity-time">2 days ago</span>
              </div>
            </div>
          </div>
        </section>
        
        
        <footer className="admin-footer">
          <p>© 2025 EduQuest Learning Platform. All rights reserved.</p>
          <div className="footer-links">
            <a href="#help">Help</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </footer>
      </main>

    
      <aside className="right-sidebar">
        <section className="calendar-section">
          <h2>May 2025</h2>
          <div className="mini-calendar">
            <div className="calendar-placeholder">
              <FaCalendarAlt className="calendar-icon" />
              <p>Calendar component</p>
            </div>
          </div>
        </section>
        
        <section className="quick-actions-section">
          <h2>Quick Actions</h2>
          <div className="quick-action-buttons">
            <button className="quick-action-btn" onClick={() => setShowCreateModal(true)}>
              <FaPlus /> New Course
            </button>
            <button className="quick-action-btn">
              <FaUsers /> Manage Users
            </button>
            <button className="quick-action-btn" onClick={() => setShowCreateModal(true)}>
              <FaFileAlt /> Create Content
            </button>
            <button className="quick-action-btn">
              <FaChartBar /> View Reports
            </button>
          </div>
        </section>
        
        <section className="top-instructors-section">
          <div className="section-header">
            <h2>Top Instructors</h2>
            <a href="#view-all" className="view-all-link">View All</a>
          </div>
          
          <div className="instructors-list">
            <div className="instructor-item">
              <img 
                src="https://static.vecteezy.com/system/resources/previews/043/900/708/non_2x/user-profile-icon-illustration-vector.jpg" 
                alt="Alice Johnson" 
              />
              <div className="instructor-details">
                <h3>Alice Johnson</h3>
                <p>Web Development</p>
                <div className="instructor-stats">
                  <span>12 Courses</span>
                  <span>4.9 Rating</span>
                </div>
              </div>
            </div>
            
            <div className="instructor-item">
              <img 
                src="https://static.vecteezy.com/system/resources/previews/043/900/708/non_2x/user-profile-icon-illustration-vector.jpg" 
                alt="Michael Brown" 
              />
              <div className="instructor-details">
                <h3>Michael Brown</h3>
                <p>Data Science</p>
                <div className="instructor-stats">
                  <span>8 Courses</span>
                  <span>4.8 Rating</span>
                </div>
              </div>
            </div>
            
            <div className="instructor-item">
              <img 
                src="https://static.vecteezy.com/system/resources/previews/043/900/708/non_2x/user-profile-icon-illustration-vector.jpg" 
                alt="Sarah Wilson" 
              />
              <div className="instructor-details">
                <h3>Sarah Wilson</h3>
                <p>UI/UX Design</p>
                <div className="instructor-stats">
                  <span>10 Courses</span>
                  <span>4.7 Rating</span>
                </div>
              </div>
            </div>
            
            <div className="instructor-item">
              <img 
                src="https://static.vecteezy.com/system/resources/previews/043/900/708/non_2x/user-profile-icon-illustration-vector.jpg" 
                alt="David Smith" 
              />
              <div className="instructor-details">
                <h3>David Smith</h3>
                <p>Mobile Development</p>
                <div className="instructor-stats">
                  <span>6 Courses</span>
                  <span>4.9 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </aside>
    </div>
  );
};

export default Admin;