const express = require('express');
const router = express.Router();
const { searchProducts } = require('../services/searchService');

// GET /api/search?q=<query>
router.get('/', (req, res) => {
  try {
    const raw = req.query.q;

    if (raw === undefined || raw === null) {
      return res.status(400).json({ error: 'Missing required query parameter: q' });
    }

    const results = searchProducts(raw);
    res.json({ results });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
