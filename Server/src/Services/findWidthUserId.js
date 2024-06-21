const createError = require('http-errors');
const User = require("../Models/userSchama");
const { default: mongoose } = require('mongoose');




const findWidthUserid= async(Model,id,option={})=>{

    try{

        const item =await Model.findById(id,option);

       if(!item) {throw createError(404,`${Model.modelName}item dose not exit width ihis id..`)};

        return item;

    }catch(error){
        if(error instanceof mongoose.Error){
          throw (createError(404,"Invalid User id"))
            
        }
        throw error
    }

}

module.exports={findWidthUserid}