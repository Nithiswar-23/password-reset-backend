const express = require("express");
const router = express.Router();
const User = require("../models/User");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");


// ✅ REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});


// ✅ FORGOT PASSWORD
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 10 * 60 * 1000;

    await user.save();

    const link = `http://localhost:3000/reset-password/${token}`;

    // OPTIONAL EMAIL (can fail if not configured)
    try {
      await sendEmail(email, link);
    } catch (err) {
      console.log("Email not sent (ok for testing)");
    }

    // ✅ IMPORTANT: return link for testing
    res.json({
      msg: "Reset link generated",
      resetLink: link,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});


// ✅ VERIFY TOKEN
router.get("/reset-password/:token", async (req, res) => {
  try {
    const user = await User.findOne({
      resetToken: req.params.token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    res.json({ msg: "Token valid" });

  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});


// ✅ RESET PASSWORD
router.post("/reset-password/:token", async (req, res) => {
  try {
    const user = await User.findOne({
      resetToken: req.params.token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: "Token expired" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.json({ msg: "Password updated successfully" });

  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});


module.exports = router;