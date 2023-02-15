// const Admin = require('Admin')
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');

const authAdmin = async (req, res, next) => {
    let admintoken;
    if (req.headers.authorization) {
        try {
            admintoken = req.headers.authorization || req.body.token

            const decoded = jwt.verify(admintoken, process.env.JWT_SECRET_KEY)
            let admin = await Admin.findOne({ _id: decoded._id })
            if (!admin) {
                throw new Error("Admin Not Found")

            }
            req.admin = admin;
            next()

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }
    if (!admintoken) {
        return res.status(400).json({ msg: "Invalid authentication." })
    }

}

module.exports = {
    authAdmin
}