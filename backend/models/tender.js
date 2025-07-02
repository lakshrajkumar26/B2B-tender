const mongoose = require("mongoose");

const TenderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  deadline: { type: Date, required: true },
  budget: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Company" }, // reference to company
}, {
  timestamps: true
});

module.exports = mongoose.model("Tender", TenderSchema);
