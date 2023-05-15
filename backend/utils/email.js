const nodemailer = require("nodemailer");  

const sendMail = async options =>{
    // 1 generate transporter
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, 
    port: process.env.EMAIL_PORT,  
    auth: {
      user: process.env.EMAIL_USERNAME,  
      pass: process.env.EMAIL_PASSWORD, 
    },
  });

//   2 define the email option
  const mailOptions = { 
    from: 'Challelign Tilahun  👻" <admin@gmail.com>', // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message, // plain text body
    // html: "<b>Hello world?</b>", // html body
  }

//  3 actually send the email
//   await transporter.sendMail(mailOptions);
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  
}

module.exports = sendMail;
