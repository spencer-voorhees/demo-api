const express = require('express');
const router = express.Router();
const { getOrderStatus } = require('../services/orderService');

// GET /api/orders/:id/status
router.get('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.headers['x-user-id'];

    // BUG: guest users (no userId header) cause unhandled null reference
    // when orderService tries to log the request, crashing with 500
    const status = await getOrderStatus(id, userId);
    res.json({ orderId: id, status });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
