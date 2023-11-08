const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "engineerhut.net",
  port: 465,
  secure: true,
  auth: {
    user: "zubaerahmed@engineerhut.net", // for development phase
    pass: "uihjbnygv",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail({ subject, to, text, html }) {
  if (!to) return console.log("sendMail() called with no valid email");
  console.log("sending to ", to);
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"EngineerHut" <zubaerahmed@engineerhut.net>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

module.exports = { sendMail };
