const express = require("express");
const router = express.Router();

const Career = require("../models/Career");

router.post("/", async (req, res) => {
  try {
    const career = new Career(req.body);

    await career.save();

    res.status(201).json({
      success: true,
      message: "Career form submitted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;