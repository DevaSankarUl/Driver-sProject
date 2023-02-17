const express = require('express')
const dotenv = require('dotenv')
const app = express()
const db = require('./database/connection')
const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')
const driverRouter = require('./routes/DriverRouter')
const Stripe = require('./controllers/stripe')
const { errorHandler } = require('./utils/error');
const path = require('path');

const cookieParser = require('cookie-parser')

const cors = require('cors')
// dotenv.config({path:"config.env"})
const PORT = process.env.PORT

//middleware
app.use(express.json({ limit: '50mb', extended: true, parameterLimit: 50000 }))

app.use(cors())
app.use(cookieParser())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
db.connectToDb((err) => {
    if (!err) {
        app.listen(PORT, () => {
            console.log(`listening to port ${PORT}`);
        })
    }
})
// app.use('/api/workouts',workoutRoutes)                                  
app.use('/api/user', userRouter)
app.use('/api/admin', adminRouter)
app.use('/api/Driver', driverRouter)
app.use(errorHandler);
app.use(express.static(path.join(__dirname, '../frontend/my-project/build/')));
// for sever

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/my-project/build/index.html'));
}); 


app.listen(PORT, () => {
    console.log('listening to port', PORT);
})
