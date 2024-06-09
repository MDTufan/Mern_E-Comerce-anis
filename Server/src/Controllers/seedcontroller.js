const User = require("../Models/userSchama");
const { data } = require("../data");


const seeduser = async (req,res,next)=>{
    
    try{
        await User.deleteMany({});

        const user = await User.insertMany(data.users);

        return res.status(201).json(user)

    }catch(error){
        next(error)
    }

}

module.exports={seeduser}