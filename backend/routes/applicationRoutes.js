const express = require('express');
const router = express.Router();
const Application = require('../models/application');
const verifySession = require('../middleware/auth');

// Submit a proposal for a tender
router.post('/submit', verifySession, async (req, res) => {
  try {
    const { tenderId, proposalText } = req.body;
    const companyId = req.userInfo.id; // Assuming companyId is the logged-in user's id
    if (!tenderId || !proposalText) {
      return res.status(400).json({ error: 'tenderId and proposalText are required' });
    }
    const application = await Application.create({
      tenderId,
      companyId,
      proposalText
    });
    res.status(201).json({ message: 'Proposal submitted', application });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit proposal', details: err.message });
  }
});

// Get all applications for a specific tender
router.get('/tender/:tenderId', verifySession, async (req, res) => {
  try {
    const { tenderId } = req.params;
    const applications = await Application.find({ tenderId }).populate('companyId', 'name industry');
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applications', details: err.message });
  }
});

module.exports = router; 