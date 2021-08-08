
const nodemailer = require("nodemailer");
const express = require('express');
const { route } = require("./todosAPI");
const router = express.Router();

router.post('/sendmailtext', async (req, res) => {


  try {
    const Transporter = nodemailer.createTransport({
      service: 'gmail',
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "hanaidoudi88@gmail.com", // generated ethereal user
        pass: "11941213@99392255", // generated ethereal password
      }
    });

    // send mail with defined transport object
    const mailoption = {
      from: 'hanaidoudi88@gmail.com', // sender address
      to: "idoudihana06@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?" // plain text body
    };
    const info = await Transporter.sendMail(mailoption)
    res.json({ message: 'mail send successfully' });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'mail failed' })
  }
})

module.exports = router;