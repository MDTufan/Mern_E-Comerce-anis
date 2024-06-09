
const mongoose = require('mongoose');
const { MONGOBD_URL } = require('../secret');


const connectDB= async ()=>{
    try{
        await mongoose.connect(MONGOBD_URL);
    
        console.log("connect to DB is successfull");
        mongoose.connection.on("error",(error)=>{
            console.error("db connect error", error);
        })

    }catch(error){
      console.error("could not connect to db ", error.toString());
    }


}


module.exports={connectDB}