import { sendContactFormEmail } from "../utils/sendingEmails.js";

export const sendContactForm = async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Please fill all the fields",
        data: null,
      });
    }

    if (firstName.length < 2) {
      return res.status(400).json({
        success: false,
        error: "First name is too short",
        data: null,
      });
    }

    if (firstName.length > 50) {
      return res.status(400).json({
        success: false,
        error: "First name is too long",
        data: null,
      });
    }

    if (lastName.length < 2) {
      return res.status(400).json({
        success: false,
        error: "Last name is too short",
        data: null,
      });
    }

    if (lastName.length > 50) {
      return res.status(400).json({
        success: false,
        error: "Last name is too long",
        data: null,
      });
    }

    // validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email",
        data: null,
      });
    }

    if (message.length < 10) {
      return res.status(400).json({
        success: false,
        error: "Message is too short",
        data: null,
      });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        success: false,
        error: "Message is too long",
        data: null,
      });
    }

    await sendContactFormEmail(firstName, lastName, email, message);

    return res.status(200).json({
      success: true,
      data: null,
      message: "Message sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "error while sending the email",
      data: null,
    });
  }
};
