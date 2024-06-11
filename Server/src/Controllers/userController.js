const createError = require('http-errors')
const User = require("../Models/userSchama");
const { successRespon } = require("../ResponHander/responhander");
const { default: mongoose } = require('mongoose');

const getUser= async (req,res,next)=>{

try{
    
    const search=req.query.search || "" ;
    const page=Number(req.query.page) || 1 ;
    const limit=Number(req.query.limit) || 5 ;
    const searchRegx= new RegExp('.*' + search + '.*',"i" );

    const filter={
        isAdmin : { $ne : true},
        $or : [
            {name:{$regex:searchRegx}},
            {email:{$regex:searchRegx}},
            {phone:{$regex:searchRegx}},
        ]
    }

    const options={password:0};


    const users= await User.find( filter,options)
    .limit(limit)
    .skip((page-1)*limit);

    const count = await User.find(filter).countDocuments();

    if(!users) throw createError(404,"No User Found");

        
 return successRespon(res,{
    statuscode:200,
    message:"User were Return successfull",
    payload:{
        users,
        pagination:{
            totalpage:Math.ceil(count / limit),
            ccurrentpage: page,
            previouspage: page - 1 > 0 ? page - 1 : null,
            nextpage: page + 1 < Math.ceil(count / limit)? page + 1 : null,

        }
    }
  })

}catch(error){
    next(error)
}

}


const getUserbyid= async (req,res,next)=>{

    try{
        
       const id = req.params.id;
       const option={password:0};

       const user =await User.findById(id,option);

       if(!user) {throw createError(404,"User dose not exit width ihis id..")};
            
     return successRespon(res,{
        statuscode:200,
        message:"User were Return successfull",
        payload:{
            user,
            
        }
      })
    
    }catch(error){
        if(error instanceof mongoose.Error){
            next(createError(404,"Invalid User id"))
            return;
        }
        next(error)

    }
    
    }

module.exports={getUser,getUserbyid}