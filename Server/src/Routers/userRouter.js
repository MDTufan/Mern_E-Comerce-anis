const express=require("express");
const { getUser } = require("../Controllers/userController");

const userRouter=express.Router();



userRouter.get("/",getUser);


module.exports={userRouter}