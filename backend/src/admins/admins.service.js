import { db } from "../Drizzle/db.js";
import { admins, registeredAdmins } from "../Drizzle/schema.js";
import { sendApprovalNotificationEmail } from "../mailer.js";
import { eq } from "drizzle-orm";

export const getAllAdminsService = async () => {
  const rows = await db
    .select({
      adminId: admins.adminId,
      fullName: admins.fullName,
      email: admins.email,
      createdAt: admins.createdAt,
      updatedAt: admins.updatedAt,
      registeredId: registeredAdmins.registeredId,
      isVerified: registeredAdmins.isVerified,
      isApproved: registeredAdmins.isApproved,
      role: registeredAdmins.role,
    })
    .from(admins)
    .leftJoin(registeredAdmins, eq(admins.adminId, registeredAdmins.adminId));

  return rows;
};

export const createAdminService = async (data) => {
  const count = await db.select().from(admins);
  if (count.length >= 25) {
    throw new Error("Maximum admins limit reached");
  }
  const result = await db.insert(admins).values(data).returning();
  return result[0];
};

export const approveAdminService = async (id) => {
  const adminId = Number(id);
  const admin = await db.select().from(admins).where(eq(admins.adminId, adminId)).limit(1);
  if (!admin.length) throw new Error("Admin not found");

  const [updated] = await db
    .update(registeredAdmins)
    .set({ isApproved: true })
    .where(eq(registeredAdmins.adminId, adminId))
    .returning();

  await sendApprovalNotificationEmail(admin[0].email, admin[0].fullName);

  return { message: "Admin approved successfully", admin: admin[0], registered: updated };
};

export const updateAdminService = async (id, data) => {
  const result = await db
    .update(admins)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(admins.adminId, Number(id)))
    .returning();
  return result[0];
};

export const deleteAdminService = async (id) => {
  const adminId = Number(id);
  await db.delete(registeredAdmins).where(eq(registeredAdmins.adminId, adminId));
  await db.delete(admins).where(eq(admins.adminId, adminId));
};