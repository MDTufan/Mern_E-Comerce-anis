const jwt = require('jsonwebtoken');

const JSonWebToKen=(payload, serectKey,expiresIn)=>{

 if (typeof payload !== "object" || !payload){
    throw new Error("payload must be Non Empty Object");
 }
 if (typeof serectKey !== "string" || serectKey == ""){
    throw new Error("payload must be Non Empty string");
 }

   
try{
    const token = jwt.sign(payload, serectKey,{expiresIn});

    return token;
}catch(error){
    console.error("this is json error",error);
    throw error;
}


}

module.exports={JSonWebToKen}