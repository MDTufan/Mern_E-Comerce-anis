const express=require("express");
const { seeduser } = require("../Controllers/seedcontroller");

const seedRouter=express.Router();


seedRouter.get("/",seeduser)

module.exports={seedRouter}