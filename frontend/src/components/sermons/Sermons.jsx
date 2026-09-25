import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { getInitialSermons, getAllSermons } from "../../Features/sermons/sermonsAPI";
import "./Sermons.css";

const getEmbedUrl = (url) => {
  if (!url) return "";

  if (url.includes("watch?v=")) {
    return url.replace("watch?v=", "embed/");
  }

  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${id}`;
  }

  if (url.includes("youtube.com/embed")) {
    return url;
  }

  return "";
};

const Sermons = () => {
  const [sermons, setSermons] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSermons = async () => {
      setLoading(true);
      try {
        const data = showAll ? await getAllSermons() : await getInitialSermons();
        setSermons(data || []);
      } catch (err) {
        console.error("Error loading sermons:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSermons();
  }, [showAll]);

  return (
    <section className="bg-white section-pad">
      <div className="container">
        <div className="sermons-header-bar">
          <div>
            <span className="label">Spiritual Nourishment</span>
            <h2 className="heading-1 sermons-title-main">
              Latest <em>Sermons</em>
            </h2>
            <p className="body-lg" style={{ marginTop: "0.5rem", maxWidth: "600px", color: "var(--text-muted)" }}>
              Listen to powerful messages from our pulpit that inspire faith,
              build hope, and strengthen our walk with Christ.
            </p>
          </div>

          <div>
            <button
              type="button"
              className="btn btn-outline-blue"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "View All Sermons"}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="sermons-cards-grid">
            {[1, 2, 3].map((n) => (
              <div key={n} className="sermon-skeleton-card" />
            ))}
          </div>
        ) : sermons.length === 0 ? (
          <div className="sermons-empty-state">
            <p className="body-md">No recorded messages found at this time.</p>
          </div>
        ) : (
          <div className="sermons-cards-grid">
            {sermons.map((sermon) => (
              <div key={sermon.sermonId} className="sermon-media-card">
                <div className="sermon-video-wrapper">
                  <iframe
                    src={getEmbedUrl(sermon.videoUrl)}
                    title={sermon.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className="sermon-card-body">
                  <h3 className="sermon-card-title">{sermon.title}</h3>
                  {sermon.description && (
                    <p className="sermon-card-desc">{sermon.description}</p>
                  )}

                  <div className="sermon-meta-row">
                    <Clock size={13} className="meta-icon" />
                    <span className="sermon-meta-date">
                      {new Date(sermon.sermonDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Sermons;