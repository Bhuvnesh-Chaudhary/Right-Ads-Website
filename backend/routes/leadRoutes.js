const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

// 1. POST Route: Lead Submit karne ke liye
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

// 2. GET Route: Saare leads dekhne ke liye (Isse upar kar diya)
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

// 🌟 CRITICAL: Yeh hamesha sabse end mein aayega!
module.exports = router;

// 💬 WhatsApp Click Track karne ke liye endpoint
router.post("/track-whatsapp", async (req, res) => {
    try {
        // Hum log khud se ek fake client format bana kar database mein bhej rahe hain
        const whatsappLog = await Lead.create({
            name: "WhatsApp Visitor",
            email: "whatsapp-click@rightads.com",
            service: "Direct WhatsApp Inquiry",
            message: "User clicked on the WhatsApp button to chat with the agency."
        });

        res.status(201).json({
            success: true,
            message: "WhatsApp Click Logged Successfully",
            data: whatsappLog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});