const express = require('express')
const User = require("../models/User")
const router = express.Router()
const { body, validationResult } = require('express-validator');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// jwtSecret is any random string to pass as a parameter in a auth token
const jwtSecret = "Mynameishuchimannarutofoodeliv$#"
router.post("/createuser", [
body('email').isEmail(),
body('name', 'Must be more than 3 characters long').isLength({ min: 4 }),
// password must be at least 5 chars long
body('password', 'Incorrect Password').isLength({ min: 5 })],
async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(11);
    let secPassword = await bcrypt.hash(req.body.password, salt)

    try {
       await User.create({
            name: req.body.name,
            password:secPassword,
            email: req.body.email,
            location: req.body.location
        }) 
    res.json({success:true}); // json response

    } catch(error){
        console.log(error)
        res.json({success:false});
    }
})

router.post("/loginuser", [
body('email').isEmail(),
body('password', 'Incorrect Password').isLength({ min: 5 })],
async(req,res)=>{ 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
        try {
          let userData = await User.findOne({email});
          if(!userData){
            return res.status(400).json({ errors: "Try logging with correct credentials" });
          }
          // comaparing password of user request at login page with the password saved at the database in hash at the time of signup
          const pwdCompare = await bcrypt.compare(req.body.password,userData.password)

          if(!pwdCompare){
            return res.status(400).json({ errors: "Incorrect Password" });
          }
          const data = {
            user:{
              id: userData.id
            }
          }
          // generation of authtoken  data->payload and 3rd parameter is jwtSecret(secretKey) and first parameter is header of jwtSign
          const authToken = jwt.sign(data, jwtSecret)
          return res.json({ success: true, authToken: authToken});

        } catch(error){
            console.log(error)
            res.json({success:false});
        }
    })
module.exports = router;