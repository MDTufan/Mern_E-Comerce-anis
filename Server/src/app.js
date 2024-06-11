const bodyParser = require('body-parser')

const express = require("express");
const createError = require('http-errors')
const app = express();


const { userRouter} = require('./Routers/userRouter');



// midderwer
const morgan = require('morgan');
const { seedRouter } = require('./Routers/seedRouter');
const { errorRespon } = require('./ResponHander/responhander');


app.use(morgan("dev"));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended:true }));




app.use("/api/user",userRouter)
app.use("/api/seed",seedRouter)



// error handling

app.use((req, res, next )=>{
    next(createError(404,"Route Not Found")) ;
})

app.use((err,req,res,next)=>{

   return errorRespon(res,
    {   statuscode:err.status,
        message:err.message
    })
})




module.exports=app;