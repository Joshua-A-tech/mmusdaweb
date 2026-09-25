import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { getAllFamilies, deleteFamily } from "../../Features/families/familiesAPI";
import CreateFamily from "./CreateFamily";
import UpdateFamily from "./UpdateFamily";
import "./Families.css";

export default function Families() {
  const [families, setFamilies] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchFamilies = async () => {
    setLoading(true);
    try { setFamilies(await getAllFamilies()); } catch (err) { console.error(err); }
    setLoading(false);
  };

  useEffect(() => { fetchFamilies(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this family?")) return;
    try { await deleteFamily(id); fetchFamilies(); } catch (err) { console.error(err); }
  };

  const openUpdate = (family) => { setSelectedFamily(family); setShowUpdate(true); };

  return (
    <div className="families-page">
      <div className="families-header">
        <h2>Families</h2>
        <button className="create-btn" onClick={() => setShowCreate(!showCreate)}>
          {showCreate ? "Close" : "Create Family"}
        </button>
      </div>

      {showCreate && <CreateFamily onSuccess={() => { setShowCreate(false); fetchFamilies(); }} />}
      {showUpdate && selectedFamily && (
        <UpdateFamily family={selectedFamily} onClose={() => setShowUpdate(false)} onSuccess={() => { setShowUpdate(false); fetchFamilies(); }} />
      )}

      {loading ? <p className="loading-text">Loading families...</p> : (
        <div className="families-cards">
          {families.map(family => (
            <div className="family-card" key={family.familyId}>
              <div className="photo-wrapper">
                {family.photoUrl ? <img src={family.photoUrl} alt={family.familyName} /> : <div className="placeholder">No Photo</div>}
              </div>
              <div className="family-info">
                <h3>{family.familyName}</h3>
                <p><strong>Head:</strong> {family.headOfFamily}</p>
                <p><strong>Contact:</strong> {family.contactInfo}</p>
                <p><strong>Leader Contact:</strong> {family.leaderContact}</p>
                <p className="description">{family.description}</p>
              </div>
              <div className="card-actions">
                <FaEdit onClick={() => openUpdate(family)} />
                <FaTrash onClick={() => handleDelete(family.familyId)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}