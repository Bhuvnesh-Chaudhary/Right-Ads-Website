const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
{
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  service: {
    type: String,
    required: true
  },
  brief: {
    type: String,
    required: true
  }
},
{
  timestamps: true
}
);

module.exports = mongoose.model(
  "ServiceInquiry",
  serviceSchema
);