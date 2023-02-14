const express = require('express')
const { allDrivers } = require('../controllers/admin/adminController')
const router = express.Router( )   
const  {SignupDriver, loginDriver, changeProfilePhoto, DriverProfile,pick,drop,cancelorder,pickDetails} = require('../controllers/DriverController')
const {authDriver} =require('../auth/driverAuth') 

//login
router.post('/login',loginDriver)
//signup    
router.post('/signupDriver',SignupDriver)
router.get('/pickDetails',pickDetails)
router.post('/getDriver',DriverProfile)
router.post('/photo-change',changeProfilePhoto)
router.post('/pick/:id',authDriver,pick)
router.post('/drop/:id',authDriver,drop)
// router.post('/success/:id',success)
router.delete('/delete/:id',cancelorder)



module.exports = router