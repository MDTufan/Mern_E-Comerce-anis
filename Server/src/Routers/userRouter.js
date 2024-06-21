const express=require("express");
const { getUser, getUserbyid, getDeletebyid } = require("../Controllers/userController");

const userRouter=express.Router();



userRouter.get("/",getUser);
userRouter.get("/:id",getUserbyid);
userRouter.delete("/:id",getDeletebyid);


module.exports={userRouter}