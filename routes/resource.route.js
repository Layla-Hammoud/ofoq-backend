import express from "express";
import{ createResource, getResouces, deleteResource, getResource, updateResource } from "../controllers/resource.controller.js";


const resourceRouter = express.Router();

resourceRouter.post("/create",  createResource);
resourceRouter.get("/get-all", getResouces);
resourceRouter.post("/get-one", getResource);
resourceRouter.post("/delete", deleteResource);
resourceRouter.patch("/update", updateResource);

export default resourceRouter;