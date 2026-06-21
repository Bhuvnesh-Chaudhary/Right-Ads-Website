const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

// 1. POST Route: Lead Submit karne ke liye
// Asli URL: http://localhost:5000/api/leads/submit
router.post("/submit", async (req, res) => {
    try {
        const lead = await Lead.create(req.body);
        res.status(201).json({
            success: true,
            message: "Lead Saved Successfully",
            data: lead
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// 2. GET Route: Saare leads dekhne ke liye
// Asli URL: http://localhost:5000/api/leads/
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

// 3. 💬 WhatsApp Click Track karne ke liye endpoint
// Asli URL: http://localhost:5000/api/leads/track-whatsapp
router.post("/track-whatsapp", async (req, res) => {
    try {
        // Hum log khud se ek fake client format bana kar database mein bhej rahe hain
        const whatsappLog = await Lead.create({
            name: "WhatsApp Visitor",
            email: "whatsapp-click@rightads.com",
            service: "Direct WhatsApp Inquiry",
            brief: "User clicked on the WhatsApp button to chat with the agency." 
            // Note: Agar tumhare Mongoose schema mein 'message' field nahi hai toh use 'brief' likhna variable ke according.
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

// 🌟 CRITICAL FIX: Yeh hamesha pure file ke SABSE END MEIN aayega!
module.exports = router;