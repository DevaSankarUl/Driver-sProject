const express = require('express')
const services = require('../controllers/admin/adminController')
const router = express.Router()
const { authAdmin } = require('../auth/adminAuth')

router.post('/adminLog', services.adminLogin)
router.get('/userInfo', services.userInfo)
router.put('/block/:id', services.blockUser)
router.put('/unblock/:id', services.unblockUser)
router.post('/carwash', services.adminCarWash)
router.get('/pickDetails', services.pickDetails)
router.put("/approve/:id", services.driverApprovel)
router.put("/reject/:id", services.driverRejection)
// router.post('/pick/:id',pick)
router.put('/driver/unblock/:id', services.UnblockDriver)
router.put('/driver/block/:id', services.blockDriver)
router.post('/uploadDocuments', services.multipleimage)
router.post('/insertValues', services.insertValues)
router.get('/driverStatus', services.allDrivers)
router.get('/getdriverApprovecount', services.getDriverCount)
router.get('/getorderCount', services.ordersCount)
router.get('/getUserCount', services.usersCount)
module.exports = router