require('dotenv').config()
// const usersimage=require()
const SERVER_PORT=process.env.SERVER_PORT || 3002;

const MONGOBD_URL = process.env.MONGOBD_URL || 'mongodb://localhost:27017/MERN_Anis';
const USERIMAG = process.env.USERIMAG || "../Public/images/users/35.JPG";

const Activesion_KeY =process.env.Activesion_KeY || "tysffhjhuyxtz5434@%$hhx877";

const SMTP_USERNAME = process.env.SMTP_USERNAME || "";
const SMTP_PASSWORD =process.env.SMTP_PASSWORD || "";

const Cline_URL =process.env.Cline_URL || "http://localhost:3000";

module.exports={
    SERVER_PORT,
    MONGOBD_URL,
    USERIMAG,
    Activesion_KeY,
    SMTP_USERNAME,
    SMTP_PASSWORD,
    Cline_URL
}