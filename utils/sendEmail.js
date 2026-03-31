const nodemailer = require("nodemailer");

const sendEmail = async (email, link) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Password Reset",
    html: `<h3>Reset your password</h3>
           <a href="${link}">${link}</a>`,
  });
};

module.exports = sendEmail;