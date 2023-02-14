const Driver = require("../models/driverModel");

const authDriver = async (req, res, next) => {
    let drivertoken;
    if (req.headers.authorization) {
        try {
            drivertoken = req.headers.authorization

            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            let driver=await Driver.findOne({_id:decoded._id})
                if(!driver){
                    throw new Error("User Not Found")
           
                }
                req.driver = driver;
                next()
            
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
    if (!drivertoken) {
        return res.status(400).json({msg: "Invalid authentication."})
    }

}

module.exports = {
authDriver
}