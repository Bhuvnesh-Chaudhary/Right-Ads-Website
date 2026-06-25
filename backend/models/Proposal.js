const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema(
{
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  service: {
    type: String,
    required: true
  },
  brief: {
    type: String
  }
},
{
  timestamps: true
}
);

module.exports = mongoose.model("Proposal", proposalSchema);