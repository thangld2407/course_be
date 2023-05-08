import nodemailer from "nodemailer";

const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_PORT = process.env.MAIL_PORT;
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASSWORD;
const MAIL_FROM = process.env.MAIL_FROM;

export default async function sendEmail(email, subject, html) {
  const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: false,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    },
  });
  transporter
    .verify()
    .then(() => console.log("Server is ready to take our messages"))
    .catch((e) => {
      return false;
    });

  var mailOptions = {
    from: MAIL_FROM || `no-reply <${MAIL_USER}>`,
    to: email,
    subject: subject,
    html: html,
  };
  await transporter.sendMail(mailOptions);
}
