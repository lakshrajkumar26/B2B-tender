const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  tenderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tender",
    required: true
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true
  },
  proposalText: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Application", applicationSchema);
