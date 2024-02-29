import axios from "axios";
import "dotenv/config.js";

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
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Layla at ofok",
          email: process.env.MAIL_USERNAME,
        },
        to: [
          {
            name: `${firstName} ${lastName}`,
            email: email,
          },
        ],
        subject: "Welcome to ofok",
        htmlContent: body,
      },
      { headers: { "api-key": process.env.BREVO_API_KEY } }
    );

    console.log(`Email sent successfully to ${firstName} at ${email}!`);
    console.log(`Email Message Id: ${response.data.messageId}`);
  } catch (error) {
    console.error(error.message);
    console.error(JSON.stringify((error.response ?? {}).data));
  }
};
