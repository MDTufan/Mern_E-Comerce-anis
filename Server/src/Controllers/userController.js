
const User = require("../Models/userSchama");
const { successRespon } = require("../ResponHander/responhander");

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


module.exports={getUser}