const createError = require('http-errors')
const User = require("../Models/userSchama");
const { successRespon } = require("../ResponHander/responhander");

const { findWidthUserid } = require('../Services/findWidthUserId');
const { deleteimage } = require('../Helper/deleteImage');
const { JSonWebToKen } = require('../Helper/jsonWebToken');
const { Activesion_KeY, Cline_URL } = require('../secret');
const { sendEmailWidhtNodemiler } = require('../Helper/Email');

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


       const user = await findWidthUserid(User,id,option);
       
            
     return successRespon(res,{
        statuscode:200,
        message:"User were Return successfull",
        payload:{
            user,
            
        }
      })
    
    }catch(error){
       
        next(error)

    }
    
    }
const getDeletebyid= async (req,res,next)=>{

    try{
        
       const id = req.params.id;
       const option={password:0};


       const user = await findWidthUserid(User,id,option);
       
       const userImagePath=user.images;

       deleteimage(userImagePath)
            

      await User.findByIdAndDelete({
        _id:id,
        isAdmin:false
    });

     return successRespon(res,{
        statuscode:200,
        message:"User were delete successfull",
        payload:{
           
            
        }
      })
    
    }catch(error){
       
        next(error)

    }
    
    }

    const getpostUser= async (req,res,next)=>{

        try{
            
          const {name, email,password,phone,addresss}=req.body;

           const UserExits=await User.exists({email:email}) ;
           
           if(UserExits){

            throw createError(409,"User alredy exsit.Plase sing in..")
           }


        
          const token = JSonWebToKen({name, email,password,phone,addresss},Activesion_KeY,"10m");


          //preper Email

         const EmaliData={
            email,
            subject:"Account Acctivion Email",
            html:
            `<h2>Hello ${name} !</h2>
            <p> plase Click Here To <a href="${Cline_URL}/api/user/activte/${token}">acctive Your Account</a> </p>
            `
          }
    
          try{
           await sendEmailWidhtNodemiler(EmaliData)
          }catch(error){
            next(createError(500,"send to Fild send email..."))
            return;
          }
         
         return successRespon(res,{
            statuscode:200,
            message:` plase go to you ${email} for conpliting your register prossce`,
            payload:{
                token
                
            }
          })
        
        }catch(error){
           
            next(error)
    
        }
        
        }





module.exports={getUser,getUserbyid,getDeletebyid,getpostUser}