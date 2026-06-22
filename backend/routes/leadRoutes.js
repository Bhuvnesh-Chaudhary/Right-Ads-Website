const express = require('express');
const router = express.Router();
const Lead = require('../models/lead');


// ✅ CAREER FORM
router.post('/apply', async (req, res) => {
    try {
        const newLead = new Lead({
            ...req.body,
            formType: 'career'
        });

        await newLead.save();
        res.json({ message: "Career application received" });

    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err });
    }
});


// ✅ SERVICE FORM
router.post('/submit', async (req, res) => {
    try {
        const newLead = new Lead({
            ...req.body,
            formType: 'service-inquiry'
        });

        await newLead.save();
        res.json({ message: "Service request received" });

    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err });
    }
});


// ✅ PROPOSAL FORM
router.post('/proposal', async (req, res) => {
    try {
        const newLead = new Lead({
            ...req.body,
            formType: 'proposal'
        });

        await newLead.save();
        res.json({ message: "Proposal received" });

    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err });
    }
});

module.exports = router;