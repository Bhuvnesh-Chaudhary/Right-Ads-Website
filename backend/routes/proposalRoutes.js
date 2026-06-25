const express = require("express");
const router = express.Router();

const Proposal = require("../models/Proposal");

router.post("/", async (req, res) => {
  try {
    const proposal = new Proposal(req.body);

    await proposal.save();

    res.status(201).json({
      success: true,
      message: "Proposal submitted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;