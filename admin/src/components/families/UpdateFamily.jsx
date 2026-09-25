import { useState } from "react";
import { updateFamily } from "../../Features/families/familiesAPI";
import "./UpdateFamily.css";

export default function UpdateFamily({ family, onClose, onSuccess }) {
  const [familyName, setFamilyName] = useState(family.familyName);
  const [headOfFamily, setHeadOfFamily] = useState(family.headOfFamily);
  const [contactInfo, setContactInfo] = useState(family.contactInfo);
  const [leaderContact, setLeaderContact] = useState(family.leaderContact);
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState(family.description);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateFamily(family.familyId, { familyName, headOfFamily, contactInfo, leaderContact, photo, description });
      onSuccess();
    } catch (err) {
      console.error("Failed to update family:", err);
    }
    setLoading(false);
  };

  return (
    <div className="update-overlay">
      <div className="update-modal">
        <h3>Update Family</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" value={familyName} onChange={e => setFamilyName(e.target.value)} required />
          <input type="text" value={headOfFamily} onChange={e => setHeadOfFamily(e.target.value)} required />
          <input type="text" value={contactInfo} onChange={e => setContactInfo(e.target.value)} />
          <input type="text" value={leaderContact} onChange={e => setLeaderContact(e.target.value)} />
          <input type="file" onChange={e => setPhoto(e.target.files[0])} />
          <textarea value={description} onChange={e => setDescription(e.target.value)} />
          <div className="update-actions">
            <button type="submit" disabled={loading}>{loading ? "Updating..." : "Update"}</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}