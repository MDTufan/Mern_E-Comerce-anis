const bodyParser = require('body-parser')

const express = require("express");
const createError = require('http-errors')
const app = express();


// midderwer
const morgan = require('morgan');

app.use(morgan("dev"));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended:true }));







app.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"This is home Page"
    })
});









// error handling

app.use((req, res, next )=>{
    next(createError(404,"Route Not Found")) ;
})

app.use((err,req,res,next)=>{

    return res.status(err.status || 500).json({
        success:false,
        message:err.message
    })
})




module.exports=app;