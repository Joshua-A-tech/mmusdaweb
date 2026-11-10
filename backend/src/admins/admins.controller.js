import {
  getAllAdminsService,
  createAdminService,
  updateAdminService,
  deleteAdminService,
  approveAdminService
} from "./admins.service.js";

export const getAdmins = async (req, res) => {
  try {
    const data = await getAllAdminsService();
    res.json({ admins: data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const approveAdmin = async (req, res) => {
  try {
    const result = await approveAdminService(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const createAdmin = async (req, res) => {
  try {
    const admin = await createAdminService(req.body);
    res.status(201).json({ admin });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const admin = await updateAdminService(req.params.id, req.body);
    res.json({ admin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    await deleteAdminService(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};