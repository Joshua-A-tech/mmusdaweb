import React, { useState, useEffect } from "react";
import AdminDrawer from "./aside/AdminDrawer";
import { Outlet, useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle, FaSearch, FaBars, FaSignOutAlt } from "react-icons/fa";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const navigate = useNavigate();
  const adminName = localStorage.getItem("adminName") || "Joshua Muorongole";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminEmail");
    navigate("/login");
  };

  return (
    <div className="app-container">
      <div className="admin-layout">
        <AdminDrawer
          isSidebarOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <div className="main-viewport">
          <header className="top-bar">
            <div className="top-bar-left">
              <button 
                className="mobile-menu-trigger" 
                onClick={() => setIsSidebarOpen(true)}
                aria-label="Open menu"
              >
                <FaBars />
              </button>
              <h2 className="view-title">
                MMUSDA ADMIN CONSOLE
                <span className="title-badge">CHURCH MANAGEMENT</span>
              </h2>
            </div>

            <div className="top-bar-right">
              <div className="search-container">
                <FaSearch />
                <input type="text" placeholder="Search records..." />
              </div>

              <button className="action-icon" title="Notifications">
                <FaBell />
                <span className="dot">3</span>
              </button>

              <div className="profile-chip" title={adminName}>
                <FaUserCircle className="user-avatar" />
                <div className="profile-text">
                  <span className="user-name">{adminName}</span>
                  <span className="user-role">Administrator</span>
                </div>
              </div>

              <button 
                className="action-icon logout-trigger" 
                onClick={handleLogout} 
                title="Sign Out"
              >
                <FaSignOutAlt />
              </button>
            </div>
          </header>

          <main className="scroll-content">
            <div className="content-wrapper">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;