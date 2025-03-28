const nodemailer = require("nodemailer");
const config = require("config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: config.get("smtp_host"),
  port: config.get("smtp_port"),
  secure: false,
  auth: {
    user: config.get("smtp_user"),
    pass: config.get("smtp_password"),
  },
});

module.exports = transporter;
