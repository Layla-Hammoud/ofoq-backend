import express from "express";
import{ createChapter, getChapters, deleteChapter, getChapter, updateChapter, getChaptersByCourse } from "../controllers/chapter.controller.js";
import { uploadImage } from "../middleware/multer.js";

const chapterRouter = express.Router();

chapterRouter.post("/create",  createChapter);
chapterRouter.get("/get-all", getChapters);
chapterRouter.post("/get-one", getChapter);
chapterRouter.post("/delete", deleteChapter);
chapterRouter.post("/get-chapters-by-course", getChaptersByCourse);
chapterRouter.patch("/update", updateChapter);

export default chapterRouter;