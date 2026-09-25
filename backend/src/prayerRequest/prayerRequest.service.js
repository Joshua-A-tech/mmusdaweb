import { db } from "../Drizzle/db.js";
import { prayerRequests } from "../Drizzle/schema.js";
import { eq, desc } from "drizzle-orm";

export const PrayerRequestsService = {
  getAll: async () => {
    return await db.select().from(prayerRequests).orderBy(desc(prayerRequests.createdAt));
  },

  getPublic: async () => {
    return await db
      .select()
      .from(prayerRequests)
      .where(eq(prayerRequests.isPublic, "yes"))
      .orderBy(desc(prayerRequests.createdAt));
  },

  getLatestFive: async () => {
    return await db
      .select()
      .from(prayerRequests)
      .where(eq(prayerRequests.isPublic, "yes"))
      .orderBy(desc(prayerRequests.createdAt))
      .limit(5);
  },

  create: async (data) => {
    const inserted = await db.insert(prayerRequests).values(data).returning();
    return inserted[0];
  },

  update: async (id, data) => {
    const updated = await db
      .update(prayerRequests)
      .set(data)
      .where(eq(prayerRequests.requestId, id))
      .returning();
    return updated[0];
  },

  delete: async (id) => {
    return await db
      .delete(prayerRequests)
      .where(eq(prayerRequests.requestId, id));
  },

  getById: async (id) => {
    const result = await db
      .select()
      .from(prayerRequests)
      .where(eq(prayerRequests.requestId, id));
    return result[0] || null;
  }
};