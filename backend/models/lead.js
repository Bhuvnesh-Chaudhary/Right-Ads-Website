const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
    // Common fields
    fullName: String,
    email: String,
    
    // Career specific
    jobType: String,
    targetPost: String,
    portfolioLink: String,
    
    // Proposal/Service specific
    phone: String,
    service: String,
    brief: String,
    
    // Ye batayega ki form kahan se aaya hai
    formType: { type: String, required: true }, // 'career' ya 'proposal'
    
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', LeadSchema);