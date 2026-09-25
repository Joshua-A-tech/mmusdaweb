import express from "express";
import PrayerRequestsController from "./prayerRequest.controller.js";

const prayerRouter = express.Router();

prayerRouter.get("/", PrayerRequestsController.getAll);
prayerRouter.get("/public", PrayerRequestsController.getPublic);
prayerRouter.get("/latest", PrayerRequestsController.getLatestFive);
prayerRouter.post("/", PrayerRequestsController.create);
prayerRouter.get("/:id", PrayerRequestsController.getById);
prayerRouter.put("/:id", PrayerRequestsController.update);
prayerRouter.delete("/:id", PrayerRequestsController.delete);

export default prayerRouter;