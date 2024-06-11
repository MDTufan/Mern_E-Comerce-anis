const createError = require('http-errors');
const User = require("../Models/userSchama");
const { default: mongoose } = require('mongoose');




const findWidthUserid= async(id,option)=>{

    try{

        const user =await User.findById(id,option);

       if(!user) {throw createError(404,"User dose not exit width ihis id..")};

        return user;

    }catch(error){
        if(error instanceof mongoose.Error){
          throw (createError(404,"Invalid User id"))
            
        }
        throw error
    }

}

module.exports={findWidthUserid}