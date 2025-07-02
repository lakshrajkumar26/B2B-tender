const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    industry: {
      type: String,
      enum: ["IT","retail","finance"],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    logo: {
      type: String,
      trim: true
    },
    services: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// Capitalize model name for convention
const Company = mongoose.model("Company", companySchema);

module.exports = Company;
