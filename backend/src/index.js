import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import youtubeRoutes from "./youtube/youtube.router.js";
import sermonsRouter from "./sermons/sermons.router.js";
import { announcementsRouter } from "./announcements/announcements.router.js";
import { eventsRouter } from "./events/events.router.js";
import { authRouter } from "./auth/auth.router.js";
import { departmentRouter } from "./departments/departments.router.js";
import { contactsRouter } from "./contacts/contacts.router.js";
import { leadersRouter } from "./leaders/leaders.router.js";
import homeChurchesRouter from "./homechurches/homechurches.router.js";
import familiesRouter from "./families/families.router.js";
import choirsRouter from "./choirs/choirs.router.js";
import prayerRouter from "./prayerRequest/prayerRequest.router.js";
import { membersRouter } from "./members/members.router.js";
import { suggestionsRouter } from "./suggestions/suggestions.router.js";
import offeringsRouter from "./offering/offering.router.js";
import offeringDetailsRouter from "./offeringDetails/offeringDetails.router.js";
import { AdminsRouter } from "./admins/admins.router.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "https://mmusda.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
  "https://mmusdaadmin.vercel.app"
];

app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
);

app.use("/sermons", sermonsRouter);
app.use("/youtube", youtubeRoutes);
app.use("/api/prayer-requests", prayerRouter);
app.use("/api/announcements", announcementsRouter);
app.use("/api/events", eventsRouter);
app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/leaders", leadersRouter);
app.use("/api/homechurches", homeChurchesRouter);
app.use("/api/families", familiesRouter);
app.use("/api/choirs", choirsRouter);
app.use("/api/members", membersRouter);
app.use("/api/suggestions", suggestionsRouter);
app.use("/api/offerings", offeringsRouter);
app.use("/api/offeringsdetails", offeringDetailsRouter);
app.use("/api/admins", AdminsRouter);

app.get("/", (req, res) =>
  res.send(
    "MKUU HAPA NI BACKEND, HUWEZI ONA KITU INAFANYIKA, MAYBE UTUHACK WHICH HUWEZI, SISI NDO SIFUNA!!!!!"
  )
);

export default app;