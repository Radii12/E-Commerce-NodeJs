const nodemailer=require("nodemailer")
const emailTemp= require ("../utils/emailTemplet.js");


module.exports=async function sendOrEmail(option){


    const transporter = nodemailer.createTransport({
    service:"gmail",
      secure: true,
      auth: {
        user: "mrady8084@gmail.com",
        pass: "zfxz cbhz tade ciby"
      }
    });
    
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: 'mrady8084@gmail.com', // sender address
          to: option.email, // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Hello world?", // plain text body
          html: emailTemp(option.url), // html body
        });
    
}