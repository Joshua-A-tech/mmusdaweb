import { useEffect, useState } from "react";
import { AdminsAPI } from "../../Features/admins/adminsAPI";
import "./Admins.css";

export default function Admins() {
  const [admins, setAdmins] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const loadAdmins = async () => {
    const data = await AdminsAPI.getAdmins();
    setAdmins(data);
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  const removeAdmin = async (id) => {
    await AdminsAPI.deleteAdmin(id);
    loadAdmins();
  };

  const submitCreate = async (e) => {
    e.preventDefault();
    await AdminsAPI.createAdmin({ fullName, email });
    setFullName("");
    setEmail("");
    setShowCreate(false);
    loadAdmins();
  };

  const submitUpdate = async (e) => {
    e.preventDefault();
    await AdminsAPI.updateAdmin(editingAdmin.adminId, { fullName, email });
    setEditingAdmin(null);
    setFullName("");
    setEmail("");
    loadAdmins();
  };

  const startEdit = (admin) => {
    setEditingAdmin(admin);
    setFullName(admin.fullName);
    setEmail(admin.email);
  };

  return (
    <div className="admins-page">
      <div className="admins-header">
        <h2>Admins</h2>
        <button
          className="create-btn"
          onClick={() => {
            setShowCreate(!showCreate);
            setEditingAdmin(null);
            setFullName("");
            setEmail("");
          }}
        >
          {showCreate ? "Close" : "Create Admin"}
        </button>
      </div>

      {showCreate && !editingAdmin && (
        <form className="admin-form" onSubmit={submitCreate}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button>Create Admin</button>
        </form>
      )}

      {editingAdmin && (
        <form className="admin-form" onSubmit={submitUpdate}>
          <h3>Update Admin</h3>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button>Update Admin</button>
          <button
            type="button"
            onClick={() => {
              setEditingAdmin(null);
              setFullName("");
              setEmail("");
            }}
            className="cancel-btn"
          >
            Cancel
          </button>
        </form>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.adminId}>
                <td><strong>{admin.fullName}</strong></td>
                <td>{admin.email}</td>
                <td>
                  <button className="edit" onClick={() => startEdit(admin)}>
                    Edit
                  </button>
                  <button className="delete" onClick={() => removeAdmin(admin.adminId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}