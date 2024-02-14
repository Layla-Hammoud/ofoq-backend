import express from "express";
import{ createCourse, getCourses, deleteCourse, getCourse, updateCourse, getCoursesByDomain } from "../controllers/course.controller.js";
import { uploadImage } from "../middleware/multer.js";

const courseRouter = express.Router();

courseRouter.post("/create", uploadImage.single("image"), createCourse);
courseRouter.get("/get-all", getCourses);
courseRouter.post("/get-one", getCourse);
courseRouter.post("/get-courses-by-domain", getCoursesByDomain);
courseRouter.post("/delete", deleteCourse);
courseRouter.patch("/update", updateCourse);

export default courseRouter;
