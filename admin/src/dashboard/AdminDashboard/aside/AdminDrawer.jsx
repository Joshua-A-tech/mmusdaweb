import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { adminDrawerData } from "./drawerData";
import { FaTimes, FaSignOutAlt } from "react-icons/fa";
import "./AdminDrawer.css";

const AdminDrawer = ({ isSidebarOpen, onToggle }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminEmail");
    navigate("/login");
  };

  const handleLinkClick = () => {
    if (window.innerWidth <= 1024) {
      onToggle();
    }
  };

  return (
    <>
      <div 
        className={`drawer-overlay ${isSidebarOpen ? "active" : ""}`} 
        onClick={onToggle}
        aria-hidden="true"
      />
      <aside className={`drawer ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="drawer-header">
          {isSidebarOpen ? (
            <div className="drawer-brand">
              <h2 className="drawer-title">MMUSDA</h2>
              <span className="drawer-subtitle">ADMIN PORTAL</span>
            </div>
          ) : (
            <div className="drawer-brand">
              <h2 className="drawer-title">M</h2>
            </div>
          )}
          <button 
            onClick={onToggle} 
            className="toggle-btn"
            title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isSidebarOpen ? <FaTimes /> : "❯"}
          </button>
        </div>

        <nav className="drawer-nav">
          {adminDrawerData.map((item) => (
            <NavLink
              key={item.id}
              to={item.link}
              end={item.link === ""}
              className={({ isActive }) => `drawer-item ${isActive ? "active" : ""}`}
              onClick={handleLinkClick}
              title={!isSidebarOpen ? item.name : undefined}
            >
              <item.icon className="item-icon" />
              {isSidebarOpen && <span>{item.name}</span>}
            </NavLink>
          ))}

          <button className="drawer-item logout" onClick={handleLogout} title="Sign Out">
            <FaSignOutAlt className="item-icon" />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </nav>

        <div className="drawer-footer">
          {isSidebarOpen ? `© ${new Date().getFullYear()} MMUSDA Church` : `©`}
        </div>
      </aside>
    </>
  );
};

export default AdminDrawer;