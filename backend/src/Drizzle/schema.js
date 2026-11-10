import { pgTable, serial, text, varchar, timestamp, boolean, integer, date } from "drizzle-orm/pg-core";

export const admins = pgTable("admins", {
  adminId: serial("admin_id").primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const registeredAdmins = pgTable("registered_admins", {
  registeredId: serial("registered_id").primaryKey(),
  adminId: integer("admin_id").notNull(),
  password: varchar("password", { length: 255 }).notNull(), 
  isVerified: boolean("is_verified").default(false),
  verificationCode: varchar("verification_code", { length: 10 }),
  codeExpiresAt: timestamp("code_expires_at"),
  isApproved: boolean("is_approved").default(true),
  role: varchar("role", { length: 50 }).default("admin"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const members = pgTable("members", {
  memberId: serial("member_id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  areaOfResidence: varchar("area_of_residence", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const departments = pgTable("departments", {
  departmentId: serial("department_id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  adminLeader: varchar("admin_leader", { length: 255 }).notNull(),
  assistant: varchar("assistant", { length: 255 }),
  adminContact: varchar("admin_contact", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const events = pgTable("events", {
  eventId: serial("event_id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  eventDate: date("event_date").notNull(),
  photo: varchar("photo", { length: 5000 }).default(null), 
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const contacts = pgTable("contacts", {
  contactId: serial("contact_id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const sermons = pgTable("sermons", {
  sermonId: serial("sermon_id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  sermonDate: date("sermon_date").notNull(),
  videoUrl: varchar("video_url", { length: 500 }).default(null),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const choirs = pgTable("choirs", {
  choirId: serial("choir_id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  leaderName: varchar("leader_name", { length: 255 }).notNull(),
  description: text("description"),
  videoUrl: varchar("video_url", { length: 500 }).default(null),
  choirPhoto: varchar("choir_photo", { length: 500 }).default(null), // URL of the image
  membersCount: integer("members_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const announcements = pgTable("announcements", {
  announcementId: serial("announcement_id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  createdBy: integer("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const homechurches = pgTable("homechurches", {
  homechurchId: serial("homechurch_id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  leaderName: varchar("leader_name", { length: 255 }),
  leaderContact: varchar("leader_contact", { length: 255 }),
  description: text("description"),
  location: varchar("location", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const families = pgTable("families", {
  familyId: serial("family_id").primaryKey(),
  familyName: varchar("family_name", { length: 255 }).notNull(),
  headOfFamily: varchar("head_of_family", { length: 255 }).notNull(),
  contactInfo: varchar("contact_info", { length: 255 }),
  leaderContact: varchar("leader_contact", { length: 255 }),
  photoUrl: varchar("photo_url", { length: 500 }),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const prayerRequests = pgTable("prayer_requests", {
  requestId: serial("request_id").primaryKey(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 50 }).default(null),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  requestedBy: integer("requested_by"),
  isPublic: varchar("is_public", { length: 3 }).default("yes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const leaders = pgTable("leaders", {
  leaderId: serial("leader_id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  department: varchar("department", { length: 255 }),
  contactInfo: varchar("contact_info", { length: 255 }).default(null),
  role: varchar("role", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const suggestions = pgTable("suggestions", {
  suggestionId: serial("suggestion_id").primaryKey(),
  name: varchar("name", { length: 255 }),                  
  contactNumber: varchar("contact_number", { length: 50 }), 
  message: text("message").notNull(),                      
  createdAt: timestamp("created_at").defaultNow(),
});

export const offerings = pgTable("offerings", {
  offeringId: serial("offering_id").primaryKey(),
  phoneNumber: varchar("phone_number", { length: 50 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  amount: integer("amount").notNull(),
  purpose: varchar("purpose", { length: 255 }).notNull(),  
  createdAt: timestamp("created_at").defaultNow(),
});

export const offeringDetails = pgTable("offering_details", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 50 }).notNull(),
});