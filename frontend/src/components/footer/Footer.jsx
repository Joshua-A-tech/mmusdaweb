import React from "react";
import { Link } from "react-router-dom";
import logo1 from "../../assets/images/logo1.jpeg";
import {
  FaFacebookF,
  FaTwitter,
  FaTiktok,
  FaYoutube,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import { MapPin, Phone, Mail } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer-container">
        <div className="footer-top-grid">
          {/* Column 1: Church Brand & Mission */}
          <div className="footer-col">
            <div className="footer-brand-header">
              <div className="footer-logo-frame">
                <img src={logo1} alt="MMUSDA Church" />
              </div>
              <div>
                <span className="footer-brand-title">MMUSDA Church</span>
                <span className="footer-brand-tag">MMUST Campus Church</span>
              </div>
            </div>

            <p className="footer-about-text">
              A Christ-centered Seventh-day Adventist Church at Masinde Muliro
              University of Science and Technology nurturing spiritual growth,
              fellowship, and service.
            </p>

            <div className="footer-contact-items">
              <div className="footer-contact-row">
                <MapPin size={15} className="footer-icon" />
                <span>MMUST Main Campus, Kakamega, Kenya</span>
              </div>
              <div className="footer-contact-row">
                <Phone size={15} className="footer-icon" />
                <span>+254 705 214 338</span>
              </div>
              <div className="footer-contact-row">
                <Mail size={15} className="footer-icon" />
                <span>Mmusdachurch1844@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Sabbath Worship Times & Midweek */}
          <div className="footer-col">
            <h4 className="footer-heading">Sabbath Worship</h4>
            <ul className="footer-schedule-list">
              <li>
                <span className="sched-label">Singing Session</span>
                <span className="sched-val">7:30 AM</span>
              </li>
              <li>
                <span className="sched-label">Devotion</span>
                <span className="sched-val">8:00 AM</span>
              </li>
              <li>
                <span className="sched-label">Sabbath School</span>
                <span className="sched-val">8:30 AM</span>
              </li>
              <li>
                <span className="sched-label">Song Service</span>
                <span className="sched-val">10:00 AM</span>
              </li>
              <li>
                <span className="sched-label">Divine Hour</span>
                <span className="sched-val">11:10 AM</span>
              </li>
              <li>
                <span className="sched-label">Bible Study</span>
                <span className="sched-val">2:00 PM</span>
              </li>
            </ul>

            <h4 className="footer-heading" style={{ marginTop: "1rem" }}>Midweek Services</h4>
            <ul className="footer-schedule-list">
              <li>
                <span className="sched-label">Health Class (Mon)</span>
                <span className="sched-val">6:30 PM</span>
              </li>
              <li>
                <span className="sched-label">Prophecy Class (Tue)</span>
                <span className="sched-val">6:30 PM</span>
              </li>
              <li>
                <span className="sched-label">Midweek Vespers (Wed)</span>
                <span className="sched-val">6:30 PM</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Ministries & Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Ministries</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/departments">Church Departments</Link>
              </li>
              <li>
                <Link to="/choirs">Choirs & Music Ministry</Link>
              </li>
              <li>
                <Link to="/homechurches">Campus Home Churches</Link>
              </li>
              <li>
                <Link to="/families">Care Families</Link>
              </li>
              <li>
                <Link to="/leadership">Leadership Directory</Link>
              </li>
              <li>
                <Link to="/about/beliefs">28 Fundamental Beliefs</Link>
              </li>
              <li>
                <Link to="/announcements">Weekly Announcements</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Online Giving & Connect */}
          <div className="footer-col">
            <h4 className="footer-heading">Online Giving</h4>
            <p className="footer-giving-text">
              Faithfully worship God through your tithes, offerings, and gifts for
              campus evangelism and welfare ministry.
            </p>

            <Link to="/offering" className="btn btn-primary footer-give-btn">
              Give Tithes & Offerings
            </Link>

            <div className="footer-socials-wrapper">
              <span className="footer-socials-title">Follow Us</span>
              <div className="footer-social-icons">
                <a
                  href="https://m.facebook.com/@MasindeMuliroSDA/?wtsid=rdr_0aLQHB4isZ7jCnp0Q&hr=1"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="footer-social-link"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://x.com/Mmusda_church?s=09"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter"
                  className="footer-social-link"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://www.tiktok.com/@mmustsda?is_from_webapp=1&sender_device=pc"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TikTok"
                  className="footer-social-link"
                >
                  <FaTiktok />
                </a>
                <a
                  href="https://youtube.com/@mmustsdachurch?si=Mzu6ODG4WY-aMk9z"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="footer-social-link"
                >
                  <FaYoutube />
                </a>
                <a
                  href="https://whatsapp.com/channel/0029Vb2VS6M5vKA9AQyoJD3P"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp Channel"
                  className="footer-social-link"
                >
                  <FaWhatsapp />
                </a>
                <a
                  href="mailto:Mmusdachurch1844@gmail.com"
                  aria-label="Email"
                  className="footer-social-link"
                >
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            © {currentYear} MMUSDA Church | Built with Faith & Technology
          </div>
          <div className="footer-tagline">
            Connecting People to the Light of Truth
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;