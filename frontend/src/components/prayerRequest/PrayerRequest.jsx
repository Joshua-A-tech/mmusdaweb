import React, { useEffect, useState } from "react";
import { Lock, Globe, Send, ShieldCheck } from "lucide-react";
import {
  getPublicPrayerRequests,
  getLatestPrayerRequests,
  createPrayerRequest,
} from "../../Features/prayerRequest/prayerRequestAPI";
import "./PrayerRequest.css";

const PrayerRequest = () => {
  const [requests, setRequests] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    title: "",
    description: "",
    isPublic: "yes",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchLatest = async () => {
    try {
      const data = await getLatestPrayerRequests();
      setRequests(data || []);
    } catch (error) {
      console.error("Error fetching prayers:", error);
    }
  };

  const fetchAll = async () => {
    try {
      const data = await getPublicPrayerRequests();
      setRequests(data || []);
      setShowAll(true);
    } catch (error) {
      console.error("Error fetching all prayers:", error);
    }
  };

  useEffect(() => {
    fetchLatest();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await createPrayerRequest(formData);
      setMessage("Your prayer request has been lifted up!");
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        title: "",
        description: "",
        isPublic: "yes",
      });
      fetchLatest();
      setShowAll(false);
    } catch (error) {
      setMessage(error.message || "Failed to submit prayer request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-cream section-pad">
      <div className="container">
        <div className="prayer-section-header">
          <span className="label">Divine Connection</span>
          <h2 className="heading-1 prayer-section-title">
            MMUSDA Prayer <em>Altar</em>
          </h2>
          <p className="body-lg prayer-section-intro">
            “For where two or three gather in my name, there am I with them.” — Matthew 18:20
          </p>
        </div>

        <div className="prayer-grid-layout">
          {/* Left Column: Prayer Submission Form */}
          <div className="prayer-form-card">
            <h3 className="prayer-card-heading">Submit Petition</h3>
            <p className="prayer-card-sub">
              Share your burden or praise. You may choose to share it on the
              Community Wall or keep it confidential with our pastoral prayer team.
            </p>

            <form onSubmit={handleSubmit} className="prayer-actual-form">
              <div className="prayer-input-row">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="field-input"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="field-input"
                />
              </div>

              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone number (optional)"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="field-input"
              />

              <input
                type="text"
                name="title"
                placeholder="Request title / burden"
                value={formData.title}
                onChange={handleChange}
                required
                className="field-input"
              />

              <textarea
                name="description"
                placeholder="Describe your burden..."
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="field-input textarea"
              />

              <div className="privacy-selector">
                <span className="privacy-label">Visibility:</span>
                <div className="privacy-options">
                  <button
                    type="button"
                    className={`privacy-btn ${
                      formData.isPublic === "yes" ? "selected" : ""
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, isPublic: "yes" })
                    }
                  >
                    <Globe size={13} /> Public (Community Wall)
                  </button>

                  <button
                    type="button"
                    className={`privacy-btn ${
                      formData.isPublic === "no" ? "selected" : ""
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, isPublic: "no" })
                    }
                  >
                    <Lock size={13} /> Private (Pastoral Team)
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary prayer-submit-btn"
              >
                {loading ? "Lifting petition..." : "Lift to Prayer"}
                <Send size={14} />
              </button>

              {message && (
                <div className="prayer-feedback-banner">
                  <ShieldCheck size={16} />
                  <span>{message}</span>
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Community Prayer Requests */}
          <div className="prayer-feed-card">
            <div className="feed-header-row">
              <h3 className="prayer-card-heading">Community Wall</h3>
              <span className="label">Shared Petitions</span>
            </div>

            <div className="prayer-items-list">
              {requests.length === 0 ? (
                <div className="prayer-empty-feed">
                  <p className="body-md">
                    Be the first to share a prayer petition.
                  </p>
                </div>
              ) : (
                requests.map((req, index) => (
                  <div key={req.requestId || index} className="prayer-feed-item">
                    <div className="prayer-item-header">
                      <div className="prayer-avatar">
                        {req.firstName?.charAt(0) || "P"}
                      </div>
                      <div className="prayer-author-info">
                        <div className="prayer-author-name">
                          {req.firstName} {req.lastName}
                        </div>
                        <div className="prayer-title-text">{req.title}</div>
                      </div>
                    </div>

                    <p className="prayer-desc-text">{req.description}</p>
                  </div>
                ))
              )}
            </div>

            {!showAll && requests.length >= 4 && (
              <div className="prayer-feed-footer">
                <button
                  type="button"
                  onClick={fetchAll}
                  className="btn btn-outline-blue view-all-btn"
                >
                  Explore All Petitions
                </button>
              </div>
            )}
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem", color: "var(--text-muted)", fontSize: "0.95rem", fontStyle: "italic" }}>
          “The prayer of a righteous person is powerful and effective.” — James 5:16
        </div>
      </div>
    </section>
  );
};

export default PrayerRequest;