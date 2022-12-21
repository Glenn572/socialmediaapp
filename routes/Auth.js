const router = require("express").Router();
const User = require("../models/Usermodel");
const bcrypt = require("bcrypt");
const cookieParser=require('cookie-parser')
const {tokenGenerator} =require('../token/token')

//Cookie Middleware
router.use(cookieParser())
//Register
router.post("/reg", async (req, res) => {
  try {
    //Generate hash password
    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //Generate new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      desc: req.body.desc,
      city: req.body.city,
      from: req.body.from,
      relationship: req.body.relationship,
    });
    //saving user data
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      const validPassword = bcrypt.compare(
        req.body.password,
        existingUser.password
      );
      if(validPassword){
      const token=tokenGenerator(existingUser.email)
      res.cookie('jwt',token,{
        httpOnly:true
      }).status(200).json(existingUser)
    }
     else{
        res.send(404).json("password is wrong");
      }
    } else {
      res.status(404).json("user not found");
    }
  } catch (error) {
    res.status(500).json("500 Internal Server Error");
  }
});

//Logout
router.post('/logout',async(req,res)=>{
    res.clearCookie('jwt',{
      secure:true
    }).status(200).json("Successfully Logged Out")
})

module.exports = router;
