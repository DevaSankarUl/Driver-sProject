const User = require('../models/userModel')
const pickAndDrop = require('../models/pickAndDrop')
const Driver = require('../models/driverModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const jwt_decode = require('jwt-decode')
const { CLIENT_URL } = process.env
const Product = require('../models/adminProduct')
const Chat = require('../models/chatModel')


const loginUser = async (req, res) => {
    const validation = {
        userLog: false,
        passErr: false,
        invalidUser: false,
        blockStatus: false
    }

    const userDetails = req.body
    console.log(req.body);
    try {
        const userValidation = await User.findOne({ email: userDetails.email, blockStatus: false })
        console.log(userValidation);

        if (userValidation) {
            // console.log('one');
            const isMatch = await bcrypt.compare(userDetails.password, userValidation.password)
            if (isMatch) {

                // console.log('two');
                validation.userLog = true
                const token = jwt.sign({
                    expiresIn: '8m',
                    user: userValidation.name,
                    email: userValidation.email,
                    userid: userValidation._id,
                    phoneNo: userValidation.phoneNo
                }, 'secret123456')

                let errMessage = "Logged in"
                res.json({ token, data: errMessage })
                console.log("user logged in");

            } else {
                validation.passErr = true
                let errMessage = "Password Incorrect"
                console.log("password Incorrect ")
                res.status(400).json({ status: "Password Wrong", data: errMessage })
                // if(!isMatch) return res.status.json({mssg:"password is Incorrect"})
            }

        } else {
            validation.invalidUser = true || validation.blockStatus == true
            let errMessage = "Invalid User"
            res.status(400).json({ status: "No Such User Exists", data: errMessage })
        }

    } catch (error) {
        res.status(400).json({ error: error.message })
        console.log("Error Message")
    }


}
const getUser = async (req, res) => {
    const id = req.params.id
    try {
        const details = await User.findById({ _id: id })
        res.status(200).json(details)
    } catch (err) {

    }
}
const SignupUser = async (req, res) => {

    const { name, mobileNo, email, password } = req.body.values
    // console.log(req.body.values);
    try {
        // console.log(name,email,password)
        const user = await User.findOne({ email })
        if (user) {
            data = "Existing user"
            res.json({ mssg: data })
        } else {
            console.log('myre');
            const passwordHash = await bcrypt.hash(password, 12)
            const blockStatus = true
            const userData = await User.create({ name: name, email: email, phoneNo: mobileNo, password: passwordHash, blockStatus: false })
            console.log(userData);
            res.json({ status: "Email Created" })
            console.log("Signup Success");
        }
    }
    catch (err) {
        console.log(err);
        res.json({ err: err.message })
        console.log("hey")
    }
}
const pickDetails = async (req, res) => {

    const order = req.body.values
    console.log('o', order);
    const orderData = new pickAndDrop({
        pick: order.pick,
        Destination: order.Destination,
        carType: order.carType,
        date: order.date,
        time: order.time,
        status: 'pick'
    })
    orderData.save().then(() => {
        console.log("ordered Successfully");
        res.status(200).json({ mssg: "ordered by user" })
    }).catch((err) => {
        console.log(err);
        res.status(400).json({ mssg: err.message })
    })

}
const carwashbook = async (req, res) => {
    try {
        const product = await Product.find()
        res.status(200).json({ data: product })
        // console.log("Ithanu sambhavam",product);
    } catch (err) {
        res.status(400).json({ error: err.message })
    }

}
const orderData = async (req, res) => {
    try {
        const orders = req.params.id
        console.log(orders);
        const email = jwt_decode(orders)
        console.log("email kop", email.userid);
        // const order = Order.findOne()
    } catch (err) {
        console.log(err);
    }
}

const payment = async (req, res) => {
    try {
        res.status(200).json({ success })
    } catch (err) {
        res.status(400).json({ err });
    }
}
const chat = async (req, res) => {
    // console.log(req.params.id);
    const id = req.params.id
    try {
        const singleChat = await Driver.findById(id)
        res.send(singleChat)
    }
    catch (err) {
        console.log(err);
    }
}

const allUsers = async (req, res) => {
    const keyword = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } }
            ]
        } : {}
    const users = await User.find(keyword)
    res.send(users)
}

const access = async (req, res) => {
    const { userId } = req.body
    if (!userId) {
        console.log('userId params not send with request');
        return res.sendStatus(400)
    }
    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],

    })
        .populate('users', '-password').populate('latestMessage')
    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender'

    })
    if (isChat.length > 0) {
        res.send(isChat[0])
    } else {
        var chatData = {
            chatName: 'sender',
            isGroupChat: false,
            users: [req.user._id, userId]
        }
        try {
            const createdchat = await Chat.create(chatData)
            const FullChat = await Chat.findone({ _id: createdchat._id }).populate('users', '-password')
            res.status(200).send(FullChat)

        } catch (err) {
            res.status(400)
            throw new Error(err.message)
        }
    }

}


module.exports = {
    SignupUser,
    loginUser,
    pickDetails,
    carwashbook,
    getUser,
    chat,
    allUsers,
    access,
    payment
    // orderData
    // fetchChat
}