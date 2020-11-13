const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        min:5,
        max:150
    },
    email:{
        type:String,
        required:true,
        min:5,
        max:150
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:1000
    },
    dateOfJoining:{
        type:Date,
    },
    designation:[{
        type:String,
        required:true
    }],
    reportingmanager:[{
        type:String,
        required:true
    }],
    Hr:[{
        type:String,
        required:true
    }],
    teamLead:[{
        type:String,
        required:true
    }],
    officeLocation:[{
        type:String,
        required:true
    }]

})

module.exports = mongoose.model('Employee', employeeSchema)