const express = require("express");
const router = express.Router();
const Tender = require("../models/tender");
const Company = require("../models/company");

router.post("/", async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.userInfo.id });
    if (!company) {
      return res.status(400).json({ error: "No company profile found for this user." });
    }
    const newTender = new Tender({
      title: req.body.title,
      description: req.body.description,
      deadline: req.body.deadline,
      budget: req.body.budget,
      createdBy: company._id,
    });
    const saved = await newTender.save();
    res.status(201).json(saved);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const tenders = await Tender.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
    res.status(200).json(tenders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tender = await Tender.findById(req.params.id);
    if (!tender) return res.status(404).json({ message: "Tender not found" });
    res.status(200).json(tender);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/company/:companyId", async (req, res) => {
  try {
    const tenders = await Tender.find({ createdBy: req.params.companyId });
    res.status(200).json(tenders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Tender.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Tender not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const tender = await Tender.findByIdAndDelete(req.params.id);
    if (!tender) return res.status(404).json({ message: "Tender not found" });
    res.status(200).json({ message: "Tender deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

