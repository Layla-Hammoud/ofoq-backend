import eventModel from "../models/event.model.js";
import userModel from "../models/user.model.js";
import { sendEventParticipationEmail } from "../utils/sendingEmails.js";
import mongoose from "mongoose";
const createEvent = async (req, res) => {
  try {
    const {
      domainId,
      teacherId,
      title,
      date,
      duration,
      description,
      startTime,
      endTime,
      link,
      platformType,
    } = req.body;
    if (
      !domainId ||
      !description ||
      !title ||
      !teacherId ||
      !date ||
      !duration ||
      !startTime ||
      !endTime ||
      !link ||
      !platformType
    ) {
      return res.status(400).json({
        success: false,
        error:
          "Incomplete data. Please provide domainId, platformType, teacherId, title, start Time ,end Time ,link, date, duration, description ",
        data: null,
      });
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, error: "Image is required!", data: null });
    }
    const image = req.file.location;
    const newevent = await eventModel.create({
      domainId,
      image,
      teacherId,
      title,
      date,
      startTime,
      endTime,
      duration,
      description,
      link,
      platformType,
    });
    return res.status(200).json({
      success: true,
      data: newevent,
      message: "New event has been created successfully.",
    });
  } catch (error) {
    console.log(error);
    // if (req.file) {
    //   deleteImage(req.file.location);
    // }
  }
  res
    .status(500)
    .json({ success: false, error: "error while creating event", data: null });
};

const getEvents = async (req, res) => {
  const { domainId, page = 1, pageSize = 10 } = req.body;
  const query = domainId === "all" ? {} : { domainId };
  console.log(query);
  try {
    const totalItems = await eventModel.countDocuments(query);
    const events = await eventModel
      .find(query)
      .populate({
        path: "teacherId",
        populate: {
          path: "profileId",
          model: "Profile",
        },
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    res.status(200).json({
      success: true,
      data: events,
      totalItems,
      message: "All events retrieved successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "error while getting events",
      data: null,
    });
  }
};

const getEvent = async (req, res, next) => {
  const { id } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      error: "No such event",
      data: null,
    });
  }
  try {
    const event = await eventModel.findById(id).populate({
      path: "teacherId",
      populate: {
        path: "profileId",
        model: "Profile",
      },
    });
    if (!event) {
      return res.status(200).json({
        success: true,
        data: event,
        message: "No event found.",
      });
    }
    res.status(200).json({
      success: true,
      data: event,
      message: "All event retrieved successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "error while getting domain",
      data: null,
    });
  }
};

const getTeacherEvents = async (req, res, next) => {
  const { id } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      error: "No such event",
      data: null,
    });
  }
  try {
    const events = await eventModel.find({ teacherId: id }).populate({
      path: "teacherId",
      populate: {
        path: "profileId",
        model: "Profile",
      },
    });
    if (!events) {
      return res.status(200).json({
        success: true,
        data: events,
        message: "No event found.",
      });
    }
    res.status(200).json({
      success: true,
      data: events,
      message: "All event retrieved successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "error while getting events",
      data: null,
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id, imageURL, link } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        error: "No such event",
        data: null,
      });
    }
    const event = await eventModel.findOneAndDelete({ _id: id });
    if (!event) {
      return res.status(404).json({
        success: false,
        error: "No such event",
        data: null,
      });
    }
    // if (event.image){
    //   console.log(event.image)
    //   deleteImage(event.image);
    // }
    res.status(200).json({
      success: true,
      data: event,
      message: "event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "error while deleting event",
      data: null,
    });
  }
};
const updateEvent = async (req, res) => {
  try {
    const {
      id,
      domainId,
      title,
      date,
      duration,
      description,
      startTime,
      endTime,
      link,
      platformType,
    } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        error: "No such event",
        data: null,
      });
    }
    let image;
    if (req.file) {
      image = req.file.location;
      // deleteImage(oldimageURL);
    }
    const event = await eventModel.findByIdAndUpdate(
      { _id: id },
      {
        link,
        platformType,
        startTime,
        endTime,
        domainId,
        title,
        date,
        duration,
        description,
        image,
      },
      { new: true }
    );
    if (!event) {
      return res.status(404).json({
        success: false,
        error: "No such event",
        data: null,
      });
    }
    return res.status(200).json({
      success: true,
      data: event,
      message: "event updated successfully",
    });
  } catch (error) {
    // if (req.file) deleteImage(req.file.location);
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "error while updating event",
      data: null,
    });
  }
};

const addStudentToEvent = async (req, res) => {
  try {
    const { id, studentId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid event id",
        data: null,
      });
    }
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid student id",
        data: null,
      });
    }

    const student = await userModel.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        error: "No such student",
        data: null,
      });
    }

    const event = await eventModel.findByIdAndUpdate(
      { _id: id },
      { $addToSet: { studentId } },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        error: "No such event",
        data: null,
      });
    }

    await sendEventParticipationEmail(
      student._id,
      student.userName,
      student.email,
      event
    );

    return res.status(200).json({
      success: true,
      data: event,
      message: "student added to event successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "error while adding student to event",
      data: null,
    });
  }
};

const removeStudentFromEvent = async (req, res) => {
  try {
    const { id, studentId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid event id",
        data: null,
      });
    }
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid student id",
        data: null,
      });
    }

    const student = await userModel.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        error: "No such student",
        data: null,
      });
    }

    const event = await eventModel.findByIdAndUpdate(
      { _id: id },
      { $pull: { studentId } },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        error: "No such event",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      data: event,
      message: "student removed from event successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "error while removing student from event",
      data: null,
    });
  }
};

export {
  createEvent,
  getEvents,
  deleteEvent,
  getEvent,
  updateEvent,
  getTeacherEvents,
  addStudentToEvent,
  removeStudentFromEvent,
};
