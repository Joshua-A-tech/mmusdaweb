import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo1 from "../../assets/images/logo1.jpeg";
import { ChevronDown, ChevronRight, X, ArrowLeft } from "lucide-react";
import "./Navbar.css";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Departments", path: "/departments" },
  {
    label: "About",
    children: [
      { label: "About MMUSDA", path: "/about/mmusda" },
      { label: "About SDA", path: "/about/sda" },
      { label: "Beliefs", path: "/about/beliefs" },
      { label: "Members", path: "/members" },
    ],
  },
  { label: "Events", path: "/events" },
  { label: "Contact", path: "/contact" },
  { label: "Offering", path: "/offering" },
  { label: "Leadership", path: "/leadership" },
  {
    label: "Evangelism",
    children: [
      { label: "Sermons", path: "/sermons" },
      { label: "HomeChurches", path: "/homechurches" },
      { label: "Families", path: "/families" },
      { label: "Choirs", path: "/choirs" },
      { label: "Books", path: "/books" },
    ],
  },
  {
    label: "Others",
    children: [
      { label: "Announcements", path: "/announcements" },
      { label: "Prayer Requests", path: "/prayers" },
      { label: "Donations", path: "/donations" },
      { label: "Suggestions", path: "/suggestions" },
      { label: "Admins", path: "https://mmusdaadmin.vercel.app" },
    ],
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    setActiveSubMenu(null);
  };

  return (
    <>
      {/* Header Ticker / Top Announcement Sub-bar */}
      <div className="top-sub-bar">
        <div className="container top-sub-bar-container">
          <div className="top-sub-left">
            <span className="sub-badge live-tag">
              <span className="dot-pulse" aria-hidden="true" />
              This Sabbath
            </span>
            <span className="sub-badge border-sep">Sabbath School 8:30 AM</span>
            <span className="sub-badge border-sep">Divine Hour 11:10 AM</span>
            <span className="sub-badge border-sep hide-on-mobile">MMUST Main Campus</span>
          </div>

          <div className="top-sub-right">
            <span className="ticker-slogan hide-on-mobile">
              Connecting People to the Light of Truth
            </span>
            <Link to="/offering" className="sub-link gold-link">
              Give Online
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <nav className={`site-navbar ${isScrolled ? "is-scrolled" : ""}`}>
        <div className="container navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-brand" onClick={closeMenu}>
            <div className="brand-logo-frame">
              <img src={logo1} alt="MMUSDA Church Crest" />
            </div>
            <div className="brand-text">
              <span className="brand-title">MMUSDA Church</span>
              <span className="brand-subtitle">MMUST Seventh-day Adventist</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="navbar-nav desktop-only">
            {navItems.map((item) => (
              <li
                key={item.label}
                className={`nav-item ${item.children ? "has-dropdown" : ""}`}
              >
                {item.children ? (
                  <>
                    <button type="button" className="nav-link-btn">
                      <span>{item.label}</span>
                      <ChevronDown className="chevron-icon" size={14} />
                    </button>
                    <div className="dropdown-panel">
                      <div className="dropdown-panel-inner">
                        {item.children.map((child) =>
                          child.path.startsWith("http") ? (
                            <a
                              key={child.label}
                              href={child.path}
                              target="_blank"
                              rel="noreferrer"
                              className="dropdown-item"
                            >
                              {child.label}
                            </a>
                          ) : (
                            <Link
                              key={child.label}
                              to={child.path}
                              className="dropdown-item"
                            >
                              {child.label}
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`nav-link ${
                      location.pathname === item.path ? "active" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Action CTAs */}
          <div className="navbar-actions">
            <Link to="/offering" className="btn btn-outline-blue hide-on-mobile">
              Offering
            </Link>
            <Link to="/become-member" className="btn btn-primary hide-on-small">
              Become a Member
            </Link>

            {/* Mobile Hamburger Trigger */}
            <button
              type="button"
              className="hamburger-btn mobile-only"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation"
            >
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </button>
          </div>
        </div>

        {/* Mobile Full Screen Menu Modal */}
        {isOpen && (
          <div className="mobile-modal">
            <div className="mobile-modal-header">
              {activeSubMenu ? (
                <button
                  type="button"
                  onClick={() => setActiveSubMenu(null)}
                  className="modal-back-btn"
                >
                  <ArrowLeft size={18} /> Back
                </button>
              ) : (
                <span className="modal-title">MMUSDA Menu</span>
              )}
              <button
                type="button"
                onClick={closeMenu}
                className="modal-close-btn"
                aria-label="Close menu"
              >
                <X size={26} />
              </button>
            </div>

            <div className="mobile-modal-body">
              {!activeSubMenu ? (
                <div className="mobile-links-list">
                  {navItems.map((item) =>
                    item.children ? (
                      <button
                        key={item.label}
                        type="button"
                        className="mobile-nav-link with-chevron"
                        onClick={() => setActiveSubMenu(item)}
                      >
                        <span>{item.label}</span>
                        <ChevronRight size={18} />
                      </button>
                    ) : (
                      <Link
                        key={item.label}
                        to={item.path}
                        className="mobile-nav-link"
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    )
                  )}

                  <div className="mobile-divider" />

                  <div className="mobile-cta-wrapper">
                    <Link
                      to="/become-member"
                      className="btn btn-primary full-width"
                      onClick={closeMenu}
                    >
                      Become a Member
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="mobile-links-list">
                  <div className="mobile-submenu-heading">
                    {activeSubMenu.label}
                  </div>
                  {activeSubMenu.children.map((child) =>
                    child.path.startsWith("http") ? (
                      <a
                        key={child.label}
                        href={child.path}
                        target="_blank"
                        rel="noreferrer"
                        className="mobile-nav-link"
                        onClick={closeMenu}
                      >
                        {child.label}
                      </a>
                    ) : (
                      <Link
                        key={child.label}
                        to={child.path}
                        className="mobile-nav-link"
                        onClick={closeMenu}
                      >
                        {child.label}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;