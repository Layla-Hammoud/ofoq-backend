import axios from "axios";
import "dotenv/config.js";

const sendEmail = async (to, subject, body, from = "Layla at ofok") => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: from,
          email: process.env.MAIL_USERNAME,
        },
        to,
        subject: subject,
        htmlContent: body,
      },
      { headers: { "api-key": process.env.BREVO_API_KEY } }
    );

    console.log("Email sent successfully");
    console.log(`Email Message Id: ${response.data.messageId}`);
  } catch (error) {
    console.error(error.message);
    console.error(JSON.stringify((error.response ?? {}).data));
  }
};

export const sendInvitationEmail = async (
  firstName,
  lastName,
  email,
  password
) => {
  const body = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Welcome to ofok</title>
      <style>
        body {
          text-align: center;
        }
      </style>
    </head>
    <body>
      <h1>Hi, ${firstName}</h1>
      <h4>
        We created an account for you with the below credentials, use them to sign in to your account
      </h4>
      <p>Email: <strong>${email}</strong></p>
      <br />
      <p>Password: <strong>${password}</strong></p>
      <h5>
        Thank you!
        <br />
        Layla
      </h5>
    </body>
  </html>`;

  await sendEmail(
    [
      {
        name: `${firstName} ${lastName}`,
        email,
      },
    ],
    "Welcome to ofok",
    body
  );
};

export const sendEventParticipationEmail = async (id, name, email, event) => {
  const body = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Event Invitation</title>
      <style>
        body {
          text-align: center;
        }
      </style>
    </head>
    <body>
      <h1>Hi, ${name}</h1>
      <h4>
        You have been invited to the event <strong>${event.title}</strong> on
        <strong>${event.date}</strong> from <strong>${event.startTime}</strong> to
        <strong>${event.endTime}</strong>
      </h4>
      
      <p>Event Description: ${event.description}</p>
      <p>Duration: ${event.duration} hours</p>
      <p>Platform: ${event.platformType}</p>
      <p>Link: <a href="${event.link}">${event.link}</a></p>

      <strong> To cancel your participation, please visit the link below:</strong>
      <a href=${process.env.FRONTEND_ORIGIN}/session/cancel-participation?eventId=${event._id}&studentId=${id}>Cancel Participation</a>

      <h5>
        Thank you!
        <br />
        Layla
      </h5>
    </body>
  </html>`;

  await sendEmail(
    [
      {
        name,
        email,
      },
    ],
    "Event Invitation",
    body
  );
};
