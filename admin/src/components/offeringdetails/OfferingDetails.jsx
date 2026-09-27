import { useEffect, useState } from "react";
import { getAllOfferingDetails, updateOfferingDetails } from "../../Features/offeringDetails/offeringDetailsAPI";
import "./OfferingDetails.css";

export default function OfferingDetails() {
  const [details, setDetails] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", phoneNumber: "" });

  // Load all offering details
  const loadDetails = async () => {
    const data = await getAllOfferingDetails();
    setDetails(data);
  };

  useEffect(() => {
    loadDetails();
  }, []);

  // Start editing
  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditData({ name: item.name, phoneNumber: item.phoneNumber });
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setEditData({ name: "", phoneNumber: "" });
  };

  // Save update
  const handleSave = async (id) => {
    await updateOfferingDetails(id, editData);
    setEditingId(null);
    loadDetails();
  };

  return (
    <div className="offering-details-page">
      <h2>Offering Details</h2>

      <div className="table-container">
        <table className="details-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {details.length === 0 && (
              <tr>
                <td colSpan="3" className="no-data">
                  No offering details found
                </td>
              </tr>
            )}

            {details.map((item) => (
              <tr key={item.id}>
                <td>
                  {editingId === item.id ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                    />
                  ) : (
                    <strong>{item.name}</strong>
                  )}
                </td>

                <td>
                  {editingId === item.id ? (
                    <input
                      type="text"
                      value={editData.phoneNumber}
                      onChange={(e) =>
                        setEditData({ ...editData, phoneNumber: e.target.value })
                      }
                    />
                  ) : (
                    item.phoneNumber
                  )}
                </td>

                <td>
                  {editingId === item.id ? (
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        className="save-btn"
                        onClick={() => handleSave(item.id)}
                      >
                        Save
                      </button>
                      <button className="cancel-btn" onClick={handleCancel}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button className="edit-btn" onClick={() => handleEdit(item)}>
                      Edit Details
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}