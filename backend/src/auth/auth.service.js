import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../Drizzle/db.js";
import { admins, registeredAdmins } from "../Drizzle/schema.js";
import { sendVerificationEmail } from "../mailer.js";
import { eq } from "drizzle-orm";

const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

// --- Registration ---
export const registerAdmin = async ({ fullName, email, password }) => {
  if (!email || !password) throw new Error("Email and password are required");
  const cleanEmail = email.trim().toLowerCase();

  const existingAdmin = await db.select().from(admins).where(eq(admins.email, cleanEmail)).limit(1);

  if (existingAdmin.length) {
    const adminId = existingAdmin[0].adminId;
    const registered = await db
      .select()
      .from(registeredAdmins)
      .where(eq(registeredAdmins.adminId, adminId))
      .limit(1);

    if (registered.length && registered[0].isVerified) {
      if (!registered[0].isApproved) {
        throw new Error("Your account is verified but currently awaiting approval by the Head Administrator.");
      }
      throw new Error("Admin already registered and verified. Please proceed to login.");
    }

    const code = generateCode();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    if (registered.length && !registered[0].isVerified) {
      await db.update(registeredAdmins)
        .set({ verificationCode: code, codeExpiresAt: expiresAt })
        .where(eq(registeredAdmins.registeredId, registered[0].registeredId));
      await sendVerificationEmail(cleanEmail, code);
      return { 
        message: "Verification code resent to your email",
        isApproved: registered[0].isApproved 
      };
    }

    // Pre-added admin in `admins` table setting password for first time
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.insert(registeredAdmins).values({
      adminId,
      password: hashedPassword,
      verificationCode: code,
      codeExpiresAt: expiresAt,
      isApproved: true,
      role: "admin",
    });

    await sendVerificationEmail(cleanEmail, code);
    return { message: "Verification code sent to your email", isApproved: true };
  }

  // --- Self-Registration: check if this is the very first admin (bootstrap superadmin) ---
  const verifiedList = await db
    .select()
    .from(registeredAdmins)
    .where(eq(registeredAdmins.isVerified, true));

  const isFirstAdmin = verifiedList.length === 0;
  const isApproved = isFirstAdmin; // First admin is auto-approved; subsequent need approval
  const role = isFirstAdmin ? "superadmin" : "admin";

  const [newAdmin] = await db
    .insert(admins)
    .values({
      fullName: (fullName && fullName.trim()) || cleanEmail.split("@")[0],
      email: cleanEmail,
    })
    .returning();

  const hashedPassword = await bcrypt.hash(password, 10);
  const code = generateCode();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await db.insert(registeredAdmins).values({
    adminId: newAdmin.adminId,
    password: hashedPassword,
    verificationCode: code,
    codeExpiresAt: expiresAt,
    isApproved,
    role,
  });

  await sendVerificationEmail(cleanEmail, code);
  return {
    message: isApproved
      ? "Verification code sent to your email"
      : "Verification code sent! Upon verification, your account will be reviewed by the Head Administrator.",
    isApproved,
    role,
    isFirstAdmin,
  };
};

export const resendVerificationCode = async ({ email }) => {
  if (!email) throw new Error("Email is required");
  const cleanEmail = email.trim().toLowerCase();

  const admin = await db.select().from(admins).where(eq(admins.email, cleanEmail)).limit(1);
  if (!admin.length) throw new Error("Admin not found");

  const registered = await db
    .select()
    .from(registeredAdmins)
    .where(eq(registeredAdmins.adminId, admin[0].adminId))
    .limit(1);

  if (!registered.length) throw new Error("Registration record not found");
  if (registered[0].isVerified) throw new Error("Account is already verified. Please log in.");

  const code = generateCode();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await db.update(registeredAdmins)
    .set({ verificationCode: code, codeExpiresAt: expiresAt })
    .where(eq(registeredAdmins.registeredId, registered[0].registeredId));

  await sendVerificationEmail(cleanEmail, code);
  return { message: "A new verification code has been sent to your email." };
};

export const verifyAdmin = async ({ email, code }) => {
  if (!email || !code) throw new Error("Email and verification code are required");
  const cleanEmail = email.trim().toLowerCase();

  const admin = await db.select().from(admins).where(eq(admins.email, cleanEmail)).limit(1);
  if (!admin.length) throw new Error("Admin not found");

  const adminId = admin[0].adminId;

  const registered = await db.select()
    .from(registeredAdmins)
    .where(eq(registeredAdmins.adminId, adminId))
    .limit(1);

  if (!registered.length) throw new Error("Registration record not found");
  if (registered[0].verificationCode !== code.trim()) {
    throw new Error("Invalid verification code");
  }

  if (registered[0].codeExpiresAt && new Date() > new Date(registered[0].codeExpiresAt)) {
    throw new Error("Verification code has expired. Please request a new code.");
  }

  await db.update(registeredAdmins)
    .set({ isVerified: true, verificationCode: null, codeExpiresAt: null })
    .where(eq(registeredAdmins.registeredId, registered[0].registeredId));

  return {
    message: registered[0].isApproved
      ? "Verification successful! You can now log in."
      : "Email verified successfully! Your account is now pending approval by the Head Administrator.",
    isApproved: registered[0].isApproved,
  };
};

// --- Login ---
export const loginAdmin = async ({ email, password }) => {
  if (!email || !password) throw new Error("Email and password are required");
  const cleanEmail = email.trim().toLowerCase();

  const admin = await db.select().from(admins).where(eq(admins.email, cleanEmail)).limit(1);
  if (!admin.length) throw new Error("Invalid email or password");

  const adminId = admin[0].adminId;

  const registered = await db.select()
    .from(registeredAdmins)
    .where(eq(registeredAdmins.adminId, adminId))
    .limit(1);

  if (!registered.length) throw new Error("Account not registered");
  if (!registered[0].isVerified) throw new Error("Account email not verified. Please verify your email first.");
  if (!registered[0].isApproved) {
    throw new Error("Your account is pending approval by the Head Administrator. You will receive an email once approved.");
  }

  const isMatch = await bcrypt.compare(password, registered[0].password);
  if (!isMatch) throw new Error("Invalid email or password");

  const token = jwt.sign(
    { adminId, email: admin[0].email, role: registered[0].role || "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    fullName: admin[0].fullName,
    email: admin[0].email,
    role: registered[0].role || "admin",
  };
};

// --- Password Reset Flow ---
// Step 1: Request Reset
export const requestPasswordReset = async ({ email }) => {
  const admin = await db.select().from(admins).where(eq(admins.email, email)).limit(1);
  if (!admin.length) throw new Error("Email not found");

  const adminId = admin[0].adminId;

  const registered = await db.select()
    .from(registeredAdmins)
    .where(eq(registeredAdmins.adminId, adminId))
    .limit(1);

  if (!registered.length) throw new Error("Account not registered");

  const code = generateCode();

  await db.update(registeredAdmins)
    .set({ verificationCode: code })
    .where(eq(registeredAdmins.registeredId, registered[0].registeredId));

  await sendVerificationEmail(email, code);

  return { message: "Reset code sent" };
};

// Step 2: Verify Reset Code (does NOT clear code)
export const verifyResetCode = async ({ email, code }) => {
  const admin = await db.select().from(admins).where(eq(admins.email, email)).limit(1);
  if (!admin.length) throw new Error("Admin not found");

  const adminId = admin[0].adminId;

  const registered = await db.select()
    .from(registeredAdmins)
    .where(eq(registeredAdmins.adminId, adminId))
    .limit(1);

  if (!registered.length) throw new Error("Account not registered");
  if (registered[0].verificationCode !== code) throw new Error("Invalid reset code");

  return { message: "Code verified" }; // do not clear yet
};

// Step 3: Reset Password
export const resetPassword = async ({ email, code, newPassword }) => {
  const admin = await db.select().from(admins).where(eq(admins.email, email)).limit(1);
  if (!admin.length) throw new Error("Email not found");

  const adminId = admin[0].adminId;

  const registered = await db.select()
    .from(registeredAdmins)
    .where(eq(registeredAdmins.adminId, adminId))
    .limit(1);

  if (!registered.length) throw new Error("Account not registered");
  if (registered[0].verificationCode !== code) throw new Error("Invalid reset code");

  const hashed = await bcrypt.hash(newPassword, 10);

  await db.update(registeredAdmins)
    .set({ password: hashed, verificationCode: null }) // clear code AFTER successful reset
    .where(eq(registeredAdmins.registeredId, registered[0].registeredId));

  return { message: "Password reset successful" };
};