const User = require("../models/User");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");


// =========================
// SIGNUP
// =========================

const signup = async (req, res) => {

  try {

    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {

      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });

    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};


// =========================
// LOGIN
// =========================

const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {

      return res.status(400).json({
        success: false,
        message: "Email and Password required",
      });

    }

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        success: false,
        message: "User not found",
      });

    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {

      return res.status(400).json({
        success: false,
        message: "Incorrect Password",
      });

    }

    const token = jwt.sign(

      {
        id: user._id,
        role: user.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }

    );

    res.status(200).json({

      success: true,

      message: "Login Successful",

      token,

      user: {

        id: user._id,

        fullName: user.fullName,

        email: user.email,

        role: user.role,

      },

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};


// =========================
// LOGOUT
// =========================

const logout = async (req, res) => {

  res.status(200).json({

    success: true,

    message: "Logged Out Successfully",

  });

};


module.exports = {

  signup,

  login,

  logout,

};