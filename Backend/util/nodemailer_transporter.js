const nodemailer = require("nodemailer");

// Create a transporter
const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE, // e.g., 'gmail'
  auth: {
    user: process.env.MAIL_USER, // Your Gmail address
    pass: process.env.MAIL_PASSWORD, // Use App Password, not your real password
  },
});

module.exports = transporter;
