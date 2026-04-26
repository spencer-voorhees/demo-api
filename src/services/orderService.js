const orders = {
  'ORD-001': { status: 'shipped', userId: 'user_123' },
  'ORD-002': { status: 'processing', userId: 'user_456' },
};

async function getOrderStatus(orderId, userId) {
  // BUG: userId.toString() throws if userId is undefined (guest checkout)
  const requestLog = `User ${userId.toString()} requested order ${orderId}`;
  console.log(requestLog);

  const order = orders[orderId];
  if (!order) throw new Error('Order not found');
  return order.status;
}

module.exports = { getOrderStatus };
