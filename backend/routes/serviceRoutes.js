const express = require("express");
const router = express.Router();

const ServiceInquiry = require("../models/ServiceInquiry");

router.post("/", async (req, res) => {
  try {
    const inquiry = new ServiceInquiry(req.body);

    await inquiry.save();

    res.status(201).json({
      success: true,
      message: "Service inquiry submitted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;