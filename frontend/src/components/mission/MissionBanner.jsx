import React from "react";
import "./MissionBanner.css";

const MissionBanner = () => {
  return (
    <div className="mission-banner-wrapper">
      <div className="mission-grid-pattern" aria-hidden="true" />
      <div className="container mission-container">
        <span className="label mission-label">Our Mission</span>

        <h2 className="mission-heading">
          To nurture a Christ-centered community on campus, empowering students and faculty to live and share the Adventist message of hope and wholeness.
        </h2>

        <div className="mission-scripture">
          <p className="mission-verse">
            “You are the light of the world. A city that is set on a hill cannot be hidden. Nor do they light a lamp and put it under a basket, but on a stand, and it gives light to all in the house.”
          </p>
          <div className="mission-cite">Matthew 5:14-15 · MMUSDA</div>
        </div>
      </div>
    </div>
  );
};

export default MissionBanner;
