import { useEffect, useState } from "react";
import { getAllChoirs, deleteChoir } from "../../Features/choirs/choirsAPI";
import { FaEdit, FaYoutube, FaTrash } from "react-icons/fa";
import CreateChoir from "./CreateChoir";
import UpdateChoir from "./UpdateChoir";
import "./Choir.css";

export default function Choir() {
  const [choirs, setChoirs] = useState([]);
  const [selectedChoir, setSelectedChoir] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadChoirs = async () => {
    setLoading(true);
    try {
      const data = await getAllChoirs();
      setChoirs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteChoir(id);
        alert("Choir deleted successfully");
        loadChoirs();
      } catch (error) {
        console.error("Failed to delete choir:", error);
        alert("Failed to delete choir");
      }
    }
  };

  useEffect(() => {
    loadChoirs();
  }, []);

  return (
    <div className="choirPage">
      <h1 className="pageTitle">Choirs Management</h1>

      <CreateChoir onSuccess={loadChoirs} />

      {selectedChoir && (
        <UpdateChoir
          choir={selectedChoir}
          onSuccess={() => {
            setSelectedChoir(null);
            loadChoirs();
          }}
        />
      )}

      <div className="choirList">
        {loading && <p className="loading">Loading choirs...</p>}

        {!loading && choirs.length === 0 && (
          <p className="empty">No choirs available</p>
        )}

        {choirs.map((choir) => (
          <div className="choirCard" key={choir.choirId}>
            <img
              src={choir.choirPhoto || "https://via.placeholder.com/400x250"}
              alt={choir.name}
            />
            <div className="cardContent">
              <h3>{choir.name}</h3>
              <p className="leader">Leader: {choir.leaderName}</p>
              <p className="members">Members: {choir.membersCount}</p>
              <p className="desc">{choir.description}</p>

              <div className="actions">
                {choir.videoUrl && (
                  <a href={choir.videoUrl} target="_blank" rel="noreferrer" className="videoBtn">
                    <FaYoutube />
                  </a>
                )}
                <button className="editBtn" onClick={() => setSelectedChoir(choir)}>
                  <FaEdit />
                </button>
                <button className="deleteBtn" onClick={() => handleDelete(choir.choirId, choir.name)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}