import React from "react";
import { Link } from "react-router-dom";
import "./SabbathProgramme.css";

const scheduleRows = [
  {
    time: "7:30 AM",
    title: "Singing Session",
    description: "Congregational singing, praise, and preparation for worship",
    badge: "Saturday",
    isMain: false,
  },
  {
    time: "8:00 AM",
    title: "Morning Devotion",
    description: "Devotional meditation, scripture reflection, and morning prayer",
    badge: "Saturday",
    isMain: false,
  },
  {
    time: "8:30 AM",
    title: "Sabbath School & Discussion",
    description: "Quarterly lesson discussion, break-out study classes, and mission spotlight",
    badge: "Saturday",
    isMain: false,
  },
  {
    time: "10:00 AM",
    title: "Song Service & Prayer",
    description: "Special songs, testimonies, and corporate intercession before main worship",
    badge: "Saturday",
    isMain: false,
  },
  {
    time: "11:10 AM",
    title: "Divine Hour",
    description: "Main worship service, ministry in song, tithes & offerings, and the spoken Word",
    badge: "Main Service",
    isMain: true,
  },
  {
    time: "2:00 PM",
    title: "Bible Study & Song Service",
    description: "Afternoon scripture study, topical fellowship, and sacred music ministry",
    badge: "Saturday",
    isMain: false,
  },
  {
    time: "4:15 PM",
    title: "Youth Programs & Vespers",
    description: "Adventist Youth Society (AYS) discussions, group activities, and sunset vespers",
    badge: "Saturday",
    isMain: false,
  },
];

const SabbathProgramme = () => {
  return (
    <section className="bg-off-white section-pad">
      <div className="container">
        <div className="programme-header">
          <div>
            <span className="label">Sabbath Programme</span>
            <h2 className="heading-1 programme-heading">
              Worship with us<br />
              every <em>Saturday.</em>
            </h2>
          </div>

          <div>
            <Link to="/contact" className="btn btn-outline-blue">
              Get directions
            </Link>
          </div>
        </div>

        <div className="programme-table">
          {scheduleRows.map((row, index) => (
            <div key={index} className="programme-row">
              <div className="programme-time">{row.time}</div>

              <div className="programme-details">
                <div className="programme-title">{row.title}</div>
                <div className="programme-desc">{row.description}</div>
              </div>

              <div className="programme-badge-col hide-on-mobile">
                <span
                  className={`badge-mono ${row.isMain ? "dark" : ""}`}
                >
                  {row.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SabbathProgramme;
