const router = require('express').Router()
const Employee = require('../models/employeeModels')
const bcrypt = require('bcryptjs') 
const jwt = require('jsonwebtoken')
const verify = require('../middleware/token')
const {registerValidationn, loginValidation} = require('../validation/validation')


router.post('/employeeRegister', async (req,res)=>{

    const {error} = registerValidationn(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const emailExist = await Employee.findOne({email:req.body.email})
    if(emailExist) return res.status(400).send("Email already Exists")

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const employee = new Employee({
        fullname:req.body.fullname,
        email: req.body.email,
        password: hashedPassword,
        dateOfJoining: req.body.dateOfJoining,
        designation:req.body.designation,
        reportingmanager:req.body.reportingmanager,
        Hr:req.body.Hr,
        teamLead:req.body.teamLead,
        officeLocation:req.body.officeLocation    
    })
    try{
        const savedEmployee = await employee.save()
        res.send(savedEmployee)
    }catch(err){
        res.status(400).send(err)
    }
})

router.post('/employeelogin', async (req,res)=>{

    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const employee = await Employee.findOne({email:req.body.email})
    if (!employee) return res.status(400).send('Email or Password is wrong')

    const validPassword = await bcrypt.compare(req.body.password, employee.password)
    if(!validPassword) return res.status(400).send('Invalid password')

    const token = jwt.sign({_id:employee._id}, process.env.Token_SECRET) 
    res.header('employeeToken', token).send(token)

    res.send("Logged In")

})

router.get('./logout',verify,(req,res)=>{
    req.employee.deleteToken(req.token,(err,user)=>{
        if(err) return res.status(400).send(err);
        res.send('Logged out');
    })
})

module.exports = router