import React from "react";
import { Link } from "react-router-dom";
import image1 from "../../assets/images/image1.jpeg";
import YouTubeLive from "../youtube/YoutubeLive";
import "./Hero.css";

const scheduleItems = [
  {
    time: "7:30 AM",
    title: "Singing Session",
    subtitle: "Every Saturday",
  },
  {
    time: "8:00 AM",
    title: "Morning Devotion",
    subtitle: "Every Saturday",
  },
  {
    time: "8:30 AM",
    title: "Sabbath School",
    subtitle: "Every Saturday",
  },
  {
    time: "10:00 AM",
    title: "Song Service",
    subtitle: "Every Saturday",
  },
  {
    time: "11:10 AM",
    title: "Divine Hour",
    subtitle: "Main Worship Service",
  },
];

const Hero = () => {
  return (
    <section className="main-hero-section">
      {/* Background Image & Gradient Overlays */}
      <div className="main-hero-bg">
        <img
          src={image1}
          alt="MMUSDA Church congregation in worship"
          className="main-hero-img"
        />
        <div className="main-hero-overlay" />
      </div>

      {/* Floating YouTube Live Widget if broadcast is active */}
      <div className="hero-live-wrapper">
        <YouTubeLive />
      </div>

      {/* Hero Content */}
      <div className="main-hero-body">
        <div className="container main-hero-container">
          <p className="hero-location-label">
            Masinde Muliro University · Kakamega, Kenya
          </p>

          <h1 className="display hero-main-title">
            Connecting People<br />
            to The <em>Light of Truth.</em>
          </h1>

          <p className="hero-mmusda-desc">
            Join the Masinde Muliro University Seventh Day Adventist Church community.
            Experience spiritual growth, fellowship, and service in the heart of Kakamega.
          </p>

          <blockquote className="hero-quote">
            “Your word is a lamp to my feet and a light to my path.”
            <cite className="hero-quote-cite">Psalm 119:105</cite>
          </blockquote>

          <div className="hero-actions">
            <Link to="/about/mmusda" className="btn btn-primary">
              Learn More
            </Link>
            <Link to="/sermons" className="btn btn-outline-white">
              Watch Sermons
            </Link>
          </div>
        </div>

        {/* Hero Bottom Sabbath Schedule Bar */}
        <div className="hero-schedule-bar">
          <div className="container schedule-bar-grid">
            {scheduleItems.map((item, index) => (
              <div key={index} className="schedule-item">
                <div className="schedule-time">{item.time}</div>
                <div className="schedule-title">{item.title}</div>
                <div className="schedule-sub">{item.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
