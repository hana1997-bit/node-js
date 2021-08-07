
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
 const Transporter = nodemailer.createTransport({
    service:'gmail',
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
    // html: "<b>Hello world?</b>", // html body
  };
  Transporter.sendMail(mailoption , (err,info)=>{
      if(err){
          console.log(err);
      }
      else{
          console.log('email send ' + info.response);
      }
  })
