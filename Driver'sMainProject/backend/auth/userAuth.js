const jwt =require('jsonwebtoken')
const User = require('../models/userModel')

const authUser =async(req,res)=>{
    let token 
    if(req.headers.authorization){
        try {
            token = req.headers.authorization
                console.log("userAuth",token);
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            let user=await User.findOne({_id:decoded._id})
                if(!user){
                    throw new Error("User Not Found")
           
                }else{

                }

    }catch(err){
        console.log(err);
    }
    if(!token){
        return res.status(400).json({mssg:"Invalid Authentication "})
    }
}
}
module.exports ={
    authUser
}