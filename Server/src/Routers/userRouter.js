const express=require("express");
const { getUser, getUserbyid } = require("../Controllers/userController");

const userRouter=express.Router();



userRouter.get("/",getUser);
userRouter.get("/:id",getUserbyid);


module.exports={userRouter}