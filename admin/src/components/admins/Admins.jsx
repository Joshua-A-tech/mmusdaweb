import { useEffect, useState } from "react";
import { AdminsAPI } from "../../Features/admins/adminsAPI";
import toast from "react-hot-toast";
import { FiCheckCircle, FiClock, FiShield, FiAlertTriangle } from "react-icons/fi";
import "./Admins.css";

export default function Admins() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const loadAdmins = async () => {
    try {
      setLoading(true);
      const data = await AdminsAPI.getAdmins();
      setAdmins(data || []);
    } catch (err) {
      toast.error("Failed to load administrators");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  const handleApprove = async (id, name) => {
    try {
      await AdminsAPI.approveAdmin(id);
      toast.success(`${name || "Administrator"} approved successfully!`);
      loadAdmins();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to approve administrator");
    }
  };

  const removeAdmin = async (id, name) => {
    if (!window.confirm(`Are you sure you want to remove ${name || "this admin"}?`)) return;
    try {
      await AdminsAPI.deleteAdmin(id);
      toast.success("Administrator removed");
      loadAdmins();
    } catch (err) {
      toast.error("Failed to remove administrator");
    }
  };

  const submitCreate = async (e) => {
    e.preventDefault();
    try {
      await AdminsAPI.createAdmin({ fullName, email });
      toast.success("Administrator invited successfully!");
      setFullName("");
      setEmail("");
      setShowCreate(false);
      loadAdmins();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create administrator");
    }
  };

  const submitUpdate = async (e) => {
    e.preventDefault();
    try {
      await AdminsAPI.updateAdmin(editingAdmin.adminId, { fullName, email });
      toast.success("Administrator updated");
      setEditingAdmin(null);
      setFullName("");
      setEmail("");
      loadAdmins();
    } catch (err) {
      toast.error("Failed to update administrator");
    }
  };

  const startEdit = (admin) => {
    setEditingAdmin(admin);
    setFullName(admin.fullName);
    setEmail(admin.email);
    setShowCreate(false);
  };

  const pendingAdmins = admins.filter(
    (a) => a.registeredId && a.isVerified && a.isApproved === false
  );

  return (
    <div className="admins-page">
      <div className="admins-header">
        <div>
          <h2>Administrators & Leaders</h2>
          <p className="admins-subtitle">
            Manage church system access, review pending approvals, and invite new leaders.
          </p>
        </div>
        <button
          className="create-btn"
          onClick={() => {
            setShowCreate(!showCreate);
            setEditingAdmin(null);
            setFullName("");
            setEmail("");
          }}
        >
          {showCreate ? "Close" : "+ Pre-Approve Admin"}
        </button>
      </div>

      {pendingAdmins.length > 0 && (
        <div className="pending-alert-box">
          <FiAlertTriangle className="pending-icon" />
          <div className="pending-text">
            <strong>{pendingAdmins.length} New Registration(s) Awaiting Approval</strong>
            <span>Review registrations below and click "Approve" to grant access to the dashboard.</span>
          </div>
        </div>
      )}

      {showCreate && !editingAdmin && (
        <form className="admin-form" onSubmit={submitCreate}>
          <h3>Pre-Approve New Administrator</h3>
          <p className="form-tip">Pre-approved emails can register and bypass approval.</p>
          <input
            type="text"
            placeholder="Full Name (e.g. Elder Jane Doe)"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="form-actions">
            <button type="submit">Add Administrator</button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setShowCreate(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {editingAdmin && (
        <form className="admin-form" onSubmit={submitUpdate}>
          <h3>Update Administrator</h3>
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
          <div className="form-actions">
            <button type="submit">Update Admin</button>
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
          </div>
        </form>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Leader Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Account Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-row">
                  {loading ? "Loading administrators..." : "No administrators registered yet."}
                </td>
              </tr>
            ) : (
              admins.map((admin) => {
                const isSuper = admin.role === "superadmin";
                const isPending = admin.registeredId && admin.isVerified && admin.isApproved === false;
                const isUnverified = admin.registeredId && !admin.isVerified;
                const isPreAdded = !admin.registeredId;

                return (
                  <tr key={admin.adminId} className={isPending ? "row-pending" : ""}>
                    <td>
                      <strong>{admin.fullName}</strong>
                    </td>
                    <td>{admin.email}</td>
                    <td>
                      {isSuper ? (
                        <span className="badge badge-super">
                          <FiShield /> Superadmin
                        </span>
                      ) : (
                        <span className="badge badge-admin">Admin</span>
                      )}
                    </td>
                    <td>
                      {isPending && (
                        <span className="badge badge-pending">
                          <FiClock /> Pending Approval
                        </span>
                      )}
                      {!isPending && admin.isApproved && (
                        <span className="badge badge-approved">
                          <FiCheckCircle /> Active
                        </span>
                      )}
                      {isUnverified && (
                        <span className="badge badge-unverified">
                          Unverified Email
                        </span>
                      )}
                      {isPreAdded && (
                        <span className="badge badge-invited">
                          Invited (Not Registered)
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="action-buttons">
                        {isPending && (
                          <button
                            className="approve-btn"
                            onClick={() => handleApprove(admin.adminId, admin.fullName)}
                            title="Approve access"
                          >
                            Approve
                          </button>
                        )}
                        <button className="edit" onClick={() => startEdit(admin)}>
                          Edit
                        </button>
                        <button
                          className="delete"
                          onClick={() => removeAdmin(admin.adminId, admin.fullName)}
                          disabled={isSuper}
                          title={isSuper ? "Superadmin cannot be deleted" : "Delete"}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}