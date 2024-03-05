import courseModel from "../models/course.model.js";
import domainModel from "../models/domain.model.js";
import { deleteImage } from "../utils/imageHelpler.js";
import mongoose from "mongoose";
const createCourse = async (req, res) => {
  try {
    const { name, description, domainId } = req.body;
    if (!name || !description || !domainId) {
      return res.status(400).json({
        success: false,
        error:
          "Incomplete data. Please provide name, image and description of the course and domainId ",
        data: null,
      });
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, error: "Image is required!", data: null });
    }
    const image = req.file.location;
    const newCourse = await courseModel.create({
      name,
      description,
      image,
      domainId,
    });
    return res.status(200).json({
      success: true,
      data: newCourse,
      message: "New academic domain has been created successfully.",
    });
  } catch (error) {
    console.log(error);
    if (req.file) {
      deleteImage(req.file.location);
    }
  }
  res
    .status(500)
    .json({ success: false, error: "error while creating course", data: null });
};

const getCourses = async (req, res, next) => {
  try {
    const courses = await courseModel.find({});
    res.status(200).json({
      success: true,
      data: courses,
      message: "All courses retrieved successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "error while getting courses",
      data: null,
    });
  }
};

const getCourse = async (req, res, next) => {
  const { id } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      error: "No such Course",
      data: null,
    });
  }
  try {
    const course = await courseModel.find({ _id: id });
    if (!course) {
      return res.status(200).json({
        success: true,
        data: course,
        message: "No course found.",
      });
    }
    res.status(200).json({
      success: true,
      data: course,
      message: "All course retrieved successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "error while getting domain",
      data: null,
    });
  }
};

const getCoursesByDomain = async (req, res, next) => {
  const { domainId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(domainId)) {
    return res.status(404).json({
      success: false,
      error: "No such domain",
      data: null,
    });
  }
  try {
    const courses = await courseModel.find({ domainId });
    if (!courses) {
      return res.status(200).json({
        success: true,
        data: courses,
        message: "No course found.",
      });
    }
    res.status(200).json({
      success: true,
      data: courses,
      message: "All course of the specific domain retrieved successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "error while getting courses",
      data: null,
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id, imageURL } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        error: "No such Course",
        data: null,
      });
    }
    const course = await courseModel.findOneAndDelete({ _id: id });
    if (!course) {
      return res.status(404).json({
        success: false,
        error: "No such course",
        data: null,
      });
    }
    // if (course.image){
    //   console.log(course.image)
    //   deleteImage(course.image);
    // }
    res.status(200).json({
      success: true,
      data: course,
      message: "course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "error while deleting course",
      data: null,
    });
  }
};
const updateCourse = async (req, res) => {
  try {
    const { id, name, description, domainId, oldimageURL } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        error: "No such Course",
        data: null,
      });
    }
    let image;
    if (req.file) {
      image = req.file.location;
      deleteImage(oldimageURL);
    }
    const course = await courseModel.findByIdAndUpdate(
      { _id: id },
      {
        name,
        description,
        domainId,
        image,
      },
      { new: true }
    );
    if (!course) {
      return res.status(404).json({
        success: false,
        error: "No such course",
        data: null,
      });
    }
    return res.status(200).json({
      success: true,
      data: course,
      message: "domain updated successfully",
    });
  } catch (error) {
    if (req.file) deleteImage(req.file.location);
    return res.status(500).json({
      success: false,
      error: "error while updating domain",
      data: null,
    });
  }
};

export {
  createCourse,
  getCourses,
  deleteCourse,
  getCourse,
  updateCourse,
  getCoursesByDomain,
};
