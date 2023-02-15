const express = require('express')
const router = express.Router()
const { SignupUser, loginUser, pickDetails, carwashbook, getUser, allUsers, chat, access } = require('../controllers/userController')
const payment = require('../controllers/stripe')
const { authUser } = require('../auth/userAuth')


//login
router.post('/login', loginUser)
router.get('/userDetail/:id', getUser)
//signup    
router.post('/signup', SignupUser)
// router.post('/activation',SignupUser.activateEmail)
router.post('/pickDetails', pickDetails, authUser)
router.post('/getProduct', carwashbook, authUser)
router.post('/create-checkout-session', payment)
// router.get('/chat',chat)
// router.get('/chating',allUsers)
// router.get('/access',access)
// router.get('/fetchChat',fetch)
// router.get('/order/:id',orderData)
module.exports = router