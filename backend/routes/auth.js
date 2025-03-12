const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require('../middlewares/fetchuser');
const config = require("../config");

//sign in user / Create User Route
router.post(
  "/signIn",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success=false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, msg:"Invalid Credentials!",errors: errors.array() });
    }
    try {
      const { name, email, password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        res.status(400).json({success,msg : "User Already Exists"});
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        //payload contains user data that like id/email that ensures that correct user is having the access
        const payload = { userId: newUser._id };
        const token = jwt.sign(payload,config.JWT_SECRET, {});
        res.json({ success:true, msg: "Sign-in successful", token });
      }
    } catch (err) {
      res
        .status(400)
        .json({ success,msg: "Some Error Occured", error: err.message });
    }
  }
);

//Login Route
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .notEmpty()
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success=false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({success,msg:"Wrong Credentials!"});
      } 
      else {
        //Matching password with Hash using bCrypt's compare() function
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({success,msg:"Wrong Credentials!"});
        }

        //payload contains user data that like id/email that ensures that correct user is having the access
        const payload = { userId: user._id };
        const token = jwt.sign(payload,config.JWT_SECRET, {
        });
        res.json({ success:true,msg: "Login successful", token });
      }
    } catch (err) {
      res
        .status(400)
        .json({ success,msg: "Some Error Occured", error: err.message });
    }
  }
);


//Get User Details
router.post(
    "/fetchuser",fetchuser,async (req, res) => {
        try {
            const user = await User.findById(req.user).select("-password"); // Exclude password
            res.json({success:true,user});
          } catch (err) {
            res
              .status(400)
              .json({ success,msg: "Some Error Occured", error: err.message });
          }
    });
module.exports = router;
