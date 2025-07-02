const express = require("express");
const router = express.Router();
const Tender = require("../models/tender");
const auth = require("../middleware/auth");

// 🔸 Create a Tender (Protected)
router.post("/", async (req, res) => {
  try {
    const newTender = new Tender({
      title: req.body.title,
      description: req.body.description,
      deadline: req.body.deadline,
      budget: req.body.budget,
      createdBy: req.userInfo.id, // from auth middleware
    });

    const saved = await newTender.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔸 Get All Tenders (Public, with pagination)
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

// 🔸 Get One Tender by ID (Public)
router.get("/:id", async (req, res) => {
  try {
    const tender = await Tender.findById(req.params.id);
    if (!tender) return res.status(404).json({ message: "Tender not found" });
    res.status(200).json(tender);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔸 Get All Tenders of a Company
router.get("/company/:companyId", async (req, res) => {
  try {
    const tenders = await Tender.find({ createdBy: req.params.companyId });
    res.status(200).json(tenders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔸 Update a Tender (Protected)
router.put("/:id", async (req, res) => {
  try {
    const tender = await Tender.findById(req.params.id);
    if (!tender) return res.status(404).json({ message: "Tender not found" });

    // Only owner can update
    if (tender.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    const updated = await Tender.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔸 Delete a Tender (Protected)
router.delete("/:id", async (req, res) => {
  try {
    const tender = await Tender.findById(req.params.id);
    if (!tender) return res.status(404).json({ message: "Tender not found" });

    if (tender.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await Tender.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Tender deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
