import express from "express";
import {
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  approveAdmin
} from "./admins.controller.js";

export const AdminsRouter = express.Router();

AdminsRouter.get("/", getAdmins);
AdminsRouter.post("/", createAdmin);
AdminsRouter.put("/:id", updateAdmin);
AdminsRouter.patch("/:id/approve", approveAdmin);
AdminsRouter.delete("/:id", deleteAdmin);