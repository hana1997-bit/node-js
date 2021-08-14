const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const Transporter = require('../utils/transporter')



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
        const render = ejs.render(template , mailparameters )
        const mailoption = {
            from: process.env.MAIL, // sender address
            to: "idoudihana06@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            // html: render, // html body
            attachments :[ 
            {   // utf-8 string as an attachment
                filename: 'text1.txt',
                content: 'bonjour bonjour'
            },
            {   // binary buffer as an attachment
                filename: 'text2.txt',
                content: new Buffer('hello world!','utf-8')
            },
            {   // filename and content type is derived from path
                path: './files/test.txt'
            },
            {   // stream as an attachment
                filename: 'text4.txt',
                content: fs.createReadStream('./files/file.txt')
            },
            {   // define custom content type for the attachment
                filename: 'text.pdf',
                content: 'hello world!',
                // contentType: 'text/plain's
            },
            {   // use URL as an attachment
                filename: 'license.txt',
                path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
            },
            {   // encoded string as an attachment
                filename: 'text1.txt',
                content: 'aGVsbG8gd29ybGQh',
                encoding: 'base64'
            },
            {
                // use pregenerated MIME node
                raw: 'Content-Type: text/plain\r\n' +
                     'Content-Disposition: attachment;\r\n' +
                     '\r\n' +
                     'Hello world!'
            }]
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