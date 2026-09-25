import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Heart, Users, Music } from "lucide-react";
import logo1 from "../../assets/images/logo1.jpeg";
import "./Welcome.css";

const pillars = [
  { text: "Empowering Faith", icon: BookOpen },
  { text: "Inspiring Hope", icon: Heart },
  { text: "Serving Community", icon: Users },
  { text: "Growing Together in Spirit", icon: Music },
];

const Welcome = () => {
  return (
    <section className="bg-white section-pad">
      <div className="container">
        <div className="welcome-grid">
          {/* Left Column: Campus Community Photo */}
          <div className="welcome-image-col">
            <div className="welcome-img-card">
              <img
                src={logo1}
                alt="MMUSDA Church"
                className="welcome-img"
              />
              <div className="welcome-badge-floating">
                <Users size={18} className="badge-icon" />
                <div>
                  <div className="badge-val">1000+</div>
                  <div className="badge-sub">Members Strong</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Original MMUSDA Editorial Content */}
          <div className="welcome-content-col">
            <span className="label">Welcome to MMUSDA</span>

            <h2 className="heading-1 welcome-heading">
              Welcome to <em>MMUSDA</em> Church
            </h2>

            <div className="welcome-pillars-list">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <div key={index} className="welcome-pillar-item">
                    <div className="pillar-icon-box">
                      <Icon size={16} />
                    </div>
                    <span className="pillar-text">{pillar.text}</span>
                  </div>
                );
              })}
            </div>

            <div className="welcome-paragraphs">
              <p className="body-lg">
                We are committed to nurturing spiritual growth, fostering strong
                connections, and serving the community with love and purpose.
              </p>
              <p className="body-md">
                Join us every Sabbath for worship, fellowship, music, and meaningful
                spiritual enrichment that strengthens faith and builds lasting
                relationships.
              </p>
            </div>

            <div className="welcome-buttons">
              <Link to="/about/mmusda" className="btn btn-primary">
                Learn More
              </Link>
              <Link to="/become-member" className="btn btn-outline-blue">
                Become a Member
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
