const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema(
{
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    required: true
  },
  targetPost: {
    type: String,
    required: true
  },
  portfolioLink: {
    type: String
  }
},
{
  timestamps: true
}
);

module.exports = mongoose.model("Career", careerSchema);