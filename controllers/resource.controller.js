import resourceModel from "../models/resource.model.js";
import mongoose from "mongoose";
const createResource = async (req, res) => {
  try {
    const { title, description, link, type } = req.body;
    if ((!link || !description || !title ||!type)) {
      return res.status(400).json({
        success: false,
        error:
          "Incomplete data. Please provide title, description, link, type ",
        data: null,
      });
    }
    const newResource = await resourceModel.create({
        title, description, link, type
    });
    return res.status(200).json({
      success: true,
      data: newResource,
      message: "New resource has been created successfully.",
    });
  } catch (error) {
    console.log(error);
  }
  return res
    .status(500)
    .json({
      success: false,
      error: "error while creating resource",
      data: null,
    });
};

const getResouces = async (req, res, next) => {
  try {
    const resources = await resourceModel.find({});
    res.status(200).json({
      success: true,
      data: resources,
      message: "All resources retrieved successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "error while getting resources",
      data: null,
    });
  }
};

const getResource = async (req, res, next) => {
  const { id } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      error: "No such resource",
      data: null,
    });
  }
  try {
    const resource = await resourceModel.find({ _id: id });
    if (!resource) {
      return res.status(200).json({
        success: true,
        data: resource,
        message: "No resource found.",
      });
    }
    res.status(200).json({
      success: true,
      data: resource,
      message: "All resource retrieved successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "error while getting resource",
      data: null,
    });
  }
};

const deleteResource = async (req, res) => {
  try {
    const { id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        error: "No such resource",
        data: null,
      });
    }
    const resource = await resourceModel.findOneAndDelete({ _id: id });
    if (!resource) {
      return res.status(404).json({
        success: false,
        error: "No such resource",
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      data: resource,
      message: "resource deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "error while deleting resource",
      data: null,
    });
  }
};
const updateResource = async (req, res) => {
  try {
    const { id , title, description, link, type } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        error: "No such resource",
        data: null,
      });
    }
    const resource = await resourceModel.findByIdAndUpdate(
      { _id: id },
      {
        title, description, link, type
      },
      { new: true }
    );
    if (!resource) {
      return res.status(404).json({
        success: false,
        error: "No such resource",
        data: null,
      });
    }
    return res.status(200).json({
      success: true,
      data: resource,
      message: "resource updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "error while updating resource",
      data: null,
    });
  }
};

export { createResource, getResouces, deleteResource, getResource, updateResource };
