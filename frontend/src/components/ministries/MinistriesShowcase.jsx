import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import image2 from "../../assets/images/image2.jpg";
import image3 from "../../assets/images/image3.jpg";
import image5 from "../../assets/images/image5.jpg";
import image7 from "../../assets/images/image7.jpeg";
import image8 from "../../assets/images/image8.jpeg";
import "./MinistriesShowcase.css";

const featuredMinistries = [
  {
    title: "Adventist Youth Ministry (AYM)",
    description:
      "Leading young people into a saving relationship with Christ through dynamic programs, leadership development, and campus evangelism.",
    link: "/departments",
    image: image2,
  },
  {
    title: "Personal Ministries Department",
    description:
      "Primary focus is campus evangelism and outreach, aiding in the preparation of men and women for the Kingdom of Glory.",
    link: "/departments",
    image: image3,
  },
  {
    title: "Adventist Chaplaincy Ministry (ACM)",
    description:
      "Providing pastoral care, hospital visitation, student spiritual counseling, and prison ministry in Christ's healing love.",
    link: "/departments",
    image: image5,
  },
  {
    title: "Sabbath School Department",
    description:
      "Fostering systematic Bible study, fellowship, and spiritual growth through interactive lesson discussion every Sabbath morning.",
    link: "/departments",
    image: image7,
  },
  {
    title: "Music Ministry & Choirs",
    description:
      "Glorifying God through sacred choral anthems, contemporary gospel, instrumental worship, and hymn singing.",
    link: "/choirs",
    image: image8,
  },
];

const MinistriesShowcase = () => {
  return (
    <section className="bg-white section-pad">
      <div className="container">
        <div className="ministries-header">
          <div>
            <span className="label">Our Ministries</span>
            <h2 className="heading-1 ministries-heading">
              Every member<br />
              is a <em>minister.</em>
            </h2>
          </div>

          <div>
            <Link to="/departments" className="btn btn-outline-blue">
              All 12 departments
            </Link>
          </div>
        </div>

        <div className="ministries-grid">
          {featuredMinistries.map((dept, index) => (
            <Link key={index} to={dept.link} className="ministry-card">
              <div className="ministry-card-img-frame">
                <img
                  src={dept.image}
                  alt={dept.title}
                  className="ministry-card-img"
                />
              </div>

              <div className="ministry-card-body">
                <h3 className="ministry-card-title">{dept.title}</h3>
                <p className="ministry-card-desc">{dept.description}</p>
                <span className="btn-text">
                  Explore ministry <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}

          {/* Featured 6th Card - The All Departments Callout */}
          <Link to="/departments" className="ministry-card featured-cta-card">
            <div className="featured-card-watermark">12</div>
            <div className="featured-card-content">
              <h3 className="featured-card-title">View all departments</h3>
              <p className="featured-card-desc">
                Every spiritual gift has a home in the body of Christ at MMUSDA.
                Find your place to serve and grow.
              </p>
              <span className="featured-card-action">
                Browse all 12 <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MinistriesShowcase;
