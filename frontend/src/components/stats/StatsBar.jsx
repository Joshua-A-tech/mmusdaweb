import React from "react";
import "./StatsBar.css";

const stats = [
  { value: "2000", suffix: "+", label: "Church Members" },
  { value: "12", suffix: "", label: "Active Ministries" },
  { value: "6", suffix: "", label: "Choirs & Music Groups" },
  { value: "Weekly", suffix: "", label: "Dynamic Fellowship" },
];

const StatsBar = () => {
  return (
    <div className="stats-bar-wrapper">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-col">
              <div className="stat-number">
                {stat.value}
                {stat.suffix && (
                  <sup className="stat-suffix">{stat.suffix}</sup>
                )}
              </div>
              <div className="stat-tag">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
