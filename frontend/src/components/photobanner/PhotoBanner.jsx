import React from "react";
import image4 from "../../assets/images/image4.jpg";
import "./PhotoBanner.css";

const PhotoBanner = () => {
  return (
    <div className="photo-banner-wrapper">
      <img
        src={image4}
        alt="Congregation at worship in MMUSDA"
        className="photo-banner-bg"
      />
      <div className="photo-banner-overlay">
        <p className="photo-banner-quote">
          “Connecting People to the<br />
          <em>Light of Truth.</em>”
        </p>
      </div>
    </div>
  );
};

export default PhotoBanner;
