
const admin = require('../../models/adminModel')
const User = require('../../models/userModel')
const adminHelpers = require('../../Heplers/adminHeplers')
const product = require('../../app')
const jwt = require('jsonwebtoken')
const pickAndDrop = require('../../models/pickAndDrop')
const { cloudinary } = require('../../utils/cloudinary');
const { rmSync } = require('fs')
const Product = require('../../models/adminProduct')
const Driver = require('../../models/driverModel')
const adminLogin = async (req, res) => {
    const validation = {
        adminLog: false,
        invalidAdmin: false,
        passErr: false
    }
    const adminDetail = req.body
    console.log(adminDetail);
    try {
        const adminValidation = await admin.findOne({ name: adminDetail.name })
        console.log(adminValidation);
        if (adminValidation) {
            if (adminDetail.password === adminValidation.password) {
                adminValidation.adminLog = true
                const admintoken = jwt.sign({
                    admin: adminValidation.name,
                    password: adminValidation
                }, 'secret12345')
                let errMessage = "Logged in "
                res.json({ data: errMessage, admintoken })
            } else {
                console.log("Password Incorrect");
                adminValidation.passErr = true

                res.json({ status: "passwordWrong" })
            }
        } else if (!adminValidation) {
            validation.invalidAdmin = true
            res.json({ status: "Invalid admin" })
        }
    }
    catch (error) {
        res.status(400).json({ error: error.messsage })
        console.log(error);
    }

}

const userInfo = async (req, res) => {
    const info = await User.find()
    if (info) {
        return res.json({ mssg: "Find it!", details: info })
    } else {
        return res.status(400).json({ mssg: "No Users" })
    }
}

const blockUser = async (req, res) => {

    const id = req.params.id;
    console.log(req.params.id)
    try {
        if (id) {
            const user = await User.findByIdAndUpdate({ _id: id }, { blockStatus: true })

            err.Message = "you were Blocked"
            res.json({ mssg: "you were Blocked", details: user })
        } else {
            return res.status(400).json({ errMssg: "Your were Blocked" })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ mssg: err.message })
    }
}
const unblockUser = async (req, res) => {
    const id = req.params.id;
    try {
        if (id) {
            const user = await User.findOneAndUpdate({ _id: id }, { blockStatus: false })
            return res.json({ mssg: "Unblock Updated", details: user });
        } else {
            return res.status(400).json({ mssg: "Not Updated" })
        }
    } catch (err) {
        return res.status(500).json({ mssg: err.message })
    }
}
const allDrivers = async (req, res) => {
    const info = await Driver.find()

    if (info) {
        return res.json({ mssg: "got all drivers", details: info })
    } else {
        return res.json({ mssg: 'No Data' })
    }
}
const blockDriver = async (req, res) => {
    console.log('gggg');
    const id = req.params.id;
    console.log("ithanu put", req.params.id)
    try {
        if (id) {
            const user = await Driver.findByIdAndUpdate({ _id: id }, { blockStatus: true })
            console.log('succes');
            res.json({ mssg: "you were Blocked", details: user })
        } else {
            return res.status(400).json({ errMssg: "Your were Blocked" })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ mssg: err.message })
    }
}
const UnblockDriver = async (req, res) => {
    console.log('kope');
    const id = req.params.id;
    console.log("ithanu put", req.params.id)
    try {
        if (id) {
            const user = await Driver.findOneAndUpdate({ _id: id }, { blockStatus: false })
            console.log('user');

            return res.json({ mssg: "you were Blocked", details: user })
        } else {
            return res.status(400).json({ errMssg: "Not Updated" })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ mssg: err.message })
    }
}
const driverApprovel = async (req, res) => {
    await Driver.findByIdAndUpdate(req.params.id, { approved: true }, (err, driver) => {
        if (err) {
            return res.status(500).send(err);
        }

        return res.status(200).send({ success: true });
    });
};

// Reject a driver
const driverRejection = async (req, res) => {
    Driver.findByIdAndUpdate(req.params.id, { approved: false }, (err, driver) => {
        if (err) {
            return res.status(500).send(err);
        }

        return res.status(200).send({ success: true });
    });
};

const getDriverCount = async (req, res) => {
    await Driver.find({ blockStatus: false }).count()
        .then((response) => {
            res.json({ response }).status(200)
        })
        .catch((err) => {
            console.log(err).status(400)
        })
}
const ordersCount = async (req, res) => {
    await pickAndDrop.find({}).count()
        .then((response) => {
            res.json({ response }).status(200)
        })
        .catch((err) => {
            console.log(err);
        })
}
const usersCount = async (req, res) => {
    await User.find({ blockStatus: false }).count()
        .then((response) => {
            res.json({ response }).status(200)
        })
}

const adminCarWash = (req, res) => {
    const product = req.body
    console.log(product);
    adminHelpers.adminCarWash(product)


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


const multipleimage = async (req, res) => {
    console.log("pari", req.body.data);
    try {
        const fileStr = req.body.data;
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'aqhb3bms',
        });


        return res.json({ status: 'ok', imageData: uploadedResponse });

    }
    catch (err) {

    }
}

const insertValues = async (req, res) => {
    console.log(req.body.data);
    const { firstImage, secondImage, thirdImage, fourthImage, materials, washname, price } = req.body.data
    try {
        const insertData = await Product.create({ firstImage, secondImage, thirdImage, fourthImage, materials, washname, price })
    }
    catch (err) {
        console.log(err);
    }
}
module.exports = {
    adminLogin,
    userInfo,
    blockUser,
    unblockUser,
    adminCarWash,
    pickDetails,
    multipleimage,
    insertValues,
    getDriverCount,
    driverApprovel,
    driverRejection,
    ordersCount,
    allDrivers,
    blockDriver,
    UnblockDriver,
    usersCount
}

