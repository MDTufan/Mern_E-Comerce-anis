require('dotenv').config()
// const usersimage=require()
const SERVER_PORT=process.env.SERVER_PORT || 3002;

const MONGOBD_URL = process.env.MONGOBD_URL || 'mongodb://localhost:27017/MERN_Anis';
const USERIMAG = process.env.USERIMAG || "../Public/images/users/35.JPG";



module.exports={
    SERVER_PORT,
    MONGOBD_URL,
    USERIMAG
}