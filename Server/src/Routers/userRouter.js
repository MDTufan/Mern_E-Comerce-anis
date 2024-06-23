const express=require("express");
const { getUser, getUserbyid, getDeletebyid, getpostUser, } = require("../Controllers/userController");

const userRouter=express.Router();




userRouter.get("/",getUser);
userRouter.get("/:id",getUserbyid);
userRouter.delete("/:id",getDeletebyid);
userRouter.post("/register",getpostUser);


module.exports={userRouter}