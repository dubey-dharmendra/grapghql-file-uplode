// const mongoose from"mongoose");

import nodemailer from "nodemailer";

const sendEmail = async (user, g_otp) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICES,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: process.env.EMAIL_SUBJECT,
    text: `${process.env.EMAIL_MESSAGE}${user.email}&code=${g_otp}`,
  };
  const info = await transporter.sendMail(mailOptions);
  if (info.messageId) {
    return info.messageId;
  } else {
    return new Error("Email not sent");
  }
};

// exports.emailVerify = async (req, res) => {
//   const options = { email: req.body.email, otp: req.body.otp };
//   await memcached.memcacheGet(options, req, res);
// };

export default sendEmail;
