const nodemailer = require("nodemailer");
const { SMTP_USERNAME, SMTP_PASSWORD } = require("../secret");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user:  SMTP_USERNAME,
      pass: SMTP_PASSWORD,
    },
  });



  const sendEmailWidhtNodemiler= async(EmaliData)=>{
    try{
        const mailoption={
            from: SMTP_USERNAME, // sender address
            to:EmaliData.email, // list of receivers
            subject: EmaliData.subject, // Subject line
           
            html: EmaliData.html, // html body
    
        }
        const info =await transporter.sendMail(mailoption)
        console.log("message email transfer", info.response)
    }catch(error){
      console.error("send maill error",error)
      throw error;
    }
  }

  module.exports ={sendEmailWidhtNodemiler}