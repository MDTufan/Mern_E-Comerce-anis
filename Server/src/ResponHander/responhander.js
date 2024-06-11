

const errorRespon =(res,{statuscode=500,message="internal server Error"})=>{

    return res.status(statuscode).json({
        success:false,
        message:message
    })
}

const successRespon =(res,{statuscode=200,message="successfull",payload={}})=>{

    return res.status(statuscode).json({
        success:true,
        message:message,
        payload,
    })
}


module.exports={errorRespon,successRespon }