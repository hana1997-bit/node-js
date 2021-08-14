const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const transporter = require('../utils/transporter')
router.post('/sendmailV2', async (req, res) => {
    try {
        //  1.0 create transporter
        
        // 2.0 create mail option
        // 2.1 read template path
           const template_path = path.resolve('./mail_template' , 'register_notification.html');
        //    console.log(template_path);
        // 2.2 read template
        const template = fs.readFileSync(template_path , {encoding : 'utf-8'});
        //  console.log(template);
        // 2.3 render template
        const mailparameters ={
            name : 'test1'
        }
        const render = ejs.render(template , mailparameters)
        const mailoption = {
            from: process.env.MAIL, // sender address
            to: "idoudihana06@gmail.com, testforhamza@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            html: render, // html body
        };
        // 3.0 send mail
        const info = await Transporter.sendMail(mailoption)
        res.json({ message: 'check your mail' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
});


module.exports = router;