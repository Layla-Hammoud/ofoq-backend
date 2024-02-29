import express from "express";
import {
  createEvent,
  getEvents,
  deleteEvent,
  getEvent,
  updateEvent,
  getTeacherEvents,
} from "../controllers/event.controller.js";
import { uploadImage } from "../middleware/multer.js";

const eventRouter = express.Router();

eventRouter.post("/create", uploadImage.single("image"), createEvent);
eventRouter.post("/get-all", getEvents);
eventRouter.post("/getByTeacher", getTeacherEvents);
eventRouter.post("/get-one", getEvent);
eventRouter.post("/delete", deleteEvent);
eventRouter.patch("/update", updateEvent);

export default eventRouter;
