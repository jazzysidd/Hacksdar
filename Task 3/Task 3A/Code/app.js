const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const PORT = 1100

// Routes
const employeeRoute = require('./Routes/employeeRoutes')

dotenv.config()

// Database Connection 
mongoose.connect(process.env.MONGOURI,{ useNewUrlParser: true ,useUnifiedTopology: true},()=>{
    console.log("Connected to database")
})

// Middleware
app.use(express.json())

// Route Middleware
app.use('/user', employeeRoute)



app.listen(PORT, ()=>{
    console.log("server running on", PORT)
})