const express = require("express");
const router = express.Router();

const Lead = require("../models/Lead");

router.post("/submit", async (req, res) => {
    try {
        const lead = await Lead.create(req.body);

        res.status(201).json({
            success: true,
            message: "Lead Saved",
            data: lead
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
router.get("/", async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: leads.length,
            data: leads
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});