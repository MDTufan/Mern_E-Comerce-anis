require('dotenv').config()

const SERVER_PORT=process.env.SERVER_PORT || 3002;
const MONGOBD_URL = process.env.MONGOBD_URL || 'mongodb://localhost:27017/E-Comerce-Anis';




module.exports={
    SERVER_PORT,
    MONGOBD_URL
}