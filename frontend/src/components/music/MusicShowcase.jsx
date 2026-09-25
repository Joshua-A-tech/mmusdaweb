import React from "react";
import { Link } from "react-router-dom";
import image7 from "../../assets/images/image7.jpeg";
import "./MusicShowcase.css";

const choirGroups = [
  { name: "MMUSDA Main Church Choir", members: "120+ members" },
  { name: "Christ Ambassadors Ministry", members: "100+ members" },
  { name: "Gospel Melodies Ministry", members: "90+ members" },
  { name: "Heralds of Hope Ministry", members: "80+ members" },
  { name: "Macheo Singing Ministry", members: "85+ members" },
  { name: "Present Truth Singers", members: "75+ members" },
];

const MusicShowcase = () => {
  return (
    <section className="bg-cream section-pad">
      <div className="container">
        <div className="music-grid">
          {/* Left Column: Portrait Choir Photo */}
          <div className="music-image-col">
            <div className="music-img-card">
              <img
                src={image7}
                alt="MMUSDA Choir ministering in song"
                className="music-img"
              />
            </div>
          </div>

          {/* Right Column: Choir Listings & Info */}
          <div className="music-content-col">
            <span className="label">Music Ministry</span>

            <h2 className="heading-1 music-heading">
              Worship through<br />
              <em>song and praise.</em>
            </h2>

            <p className="body-lg music-desc">
              Vibrant music groups glorify God through diverse sacred expressions.
              From timeless Adventist hymns to contemporary choral gospel, every
              voice has a place in lifting up the Savior.
            </p>

            <div className="music-groups-list">
              {choirGroups.map((group, index) => (
                <div key={index} className="music-group-row">
                  <span className="music-group-name">{group.name}</span>
                  <span className="music-group-count">{group.members}</span>
                </div>
              ))}
            </div>

            <div className="music-actions">
              <Link to="/choirs" className="btn btn-primary">
                Meet all groups
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicShowcase;
