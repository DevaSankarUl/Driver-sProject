const Driver = require('../models/driverModel')
const pickAndDrop = require('../models/pickAndDrop')
const jwt = require('jsonwebtoken')
// const token


const SignupDriver = async (req, res) => {
    const { name, email, mobileNo, LiscenceNo, password, confirm_Password } = req.body.values


    const drive = req.body.values
    // console.log(drive);
    try {

        const driverData = await Driver.findOne({ email: email || mobileNo })
        if (driverData) {
            // console.log(driverData);
            data = "Email Already Exists"
            res.json({ mssg: data })

        } else {
            const driverDatas = await Driver.create({ name, email, mobileNo, LiscenceNo, password, blockStatus: false })
            res.status(200).json({ status: "Email Created " })
            console.log("Driver Signup Success");
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const loginDriver = async (req, res) => {
    const validation = {
        driverLog: false,
        passErr: false,
        invalidDriver: false,
        blockStatus: false
    }

    const DriverLogin = req.body.values
    console.log(DriverLogin)
    try {
        const driverValidation = await Driver.findOne({ email: DriverLogin.email, blockStatus: false })
        // if(!driverValidation){
        //     res.status(400).json({message:"You are banned"})
        // }
        if (driverValidation) {
            if (driverValidation.password === DriverLogin.password) {
                validation.driverLog = true
                let message = "LoggedIn"
                const token = jwt.sign({
                    expiresIn: '8m',
                    user: driverValidation.name,
                    email: driverValidation
                }, 'secret123')
                res.json({ token, data: message })

            } if (driverValidation.password != DriverLogin.password) {
                validation.passErr = true
                let errMessage = "password Incorrect"
                res.status(400).json({ data: errMessage })
            }
        }
        else {
            validation.invalidDriver = true || validation.blockStatus == true
            let errMessage = "Invalid User"
            res.status(400).json({ status: "No Such User Exists", data: errMessage })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
const DriverProfile = async (req, res) => {
    const email = req.driver.email
    try {
        const response = await Driver.findOne({ email: email })
        const driver = response
        console.log("response  is : ", driver);

        res.status(200).json({ driver })

    } catch (err) {
        res.status(400).json({ err: err.message });
    }
}
const changeProfilePhoto = async (req, res) => {
    try {

        const imageUrl = req.body.url
        console.log("imageUrl", imageUrl);
        const user = req.body.email.email.email
        console.log("user", user);
        const response = await Driver.updateOne({ email: user }, {
            $set: {
                image: imageUrl
            }
        })
        console.log(response);
        res.status(200).json({ data: response })

    } catch (error) {
        res.status(400).json({ error: error.message })

    }
}



const pick = async (req, res) => {
    const id = req.params.id;
    try {
        if (id) {
            const user = await pickAndDrop.findOneAndUpdate({ _id: id }, { status: 'drop' })
            console.log(id);
            return res.json({ mssg: "user picked" });
        } else {
            return res.status(400).json({ mssg: "Not Updated" })
        }
    } catch (err) {
        return res.status(500).json({ mssg: err.message })
    }
}
const drop = async (req, res) => {
    const id = req.params.id;
    console.log("drop id", id);
    try {
        if (id) {
            const user = await pickAndDrop.findOneAndUpdate({ _id: id }, { status: 'success' })

            return res.json({ mssg: "user Droped" });
        }
    } catch (err) {
        console.log(err);
    }
}
// const success =async(req,res)=>{
//     const id= req.params.id;
//     console.log("success id",id);
//     try{
//         if(id){
//             const user = await pickAndDrop.findOneAndUpdate({_id:id},{status:'success'})
//         }
//     }catch(err){
//         console.log(err);
//     }
// }

const cancelorder = async (req, res) => {
    const id = req.params.id;
    try {
        if (id) {
            const user = await pickAndDrop.findOneAndDelete({ _id: id })
            return res.json({ mssg: "order cancelled" });
        } else {
            return res.status(400).json({ mssg: "Not Updated" })
        }
    } catch (err) {
        return res.status(500).json({ mssg: err.message })
    }
}
const pickDetails = async (req, res) => {
    try {
        const getpick = await pickAndDrop.find({})
        if (getpick) {
            res.json({ getpick })

        } else {
            console.log("No such data");
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    SignupDriver,
    loginDriver,
    changeProfilePhoto,
    DriverProfile,
    cancelorder,
    pick,
    drop,
    pickDetails
    // success,
}