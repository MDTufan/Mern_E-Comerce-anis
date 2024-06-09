const { users } = require("../Models/userModel")


const getUser=(req,res,next)=>{

try{
    
    res.status(200).json({
            
        message:"User were Return",
        users
    })       
  

}catch(error){
    next(error)
}

}


module.exports={getUser}