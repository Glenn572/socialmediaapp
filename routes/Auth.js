const router = require("express").Router();
const User = require("../models/Usermodel");
const bcrypt = require("bcrypt");

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
      desc:req.body.desc,
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
    !existingUser && res.status(404).json("user not found");

    const validPassword = bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    !validPassword && res.status(404).json("password is wrong");

    res.status(200).json(existingUser);
  } catch (error) {
    res.status(500).json("500 Internal Server Error");
  }
});

module.exports = router;
