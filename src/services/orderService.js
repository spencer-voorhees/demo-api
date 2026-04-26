const orders = {
  'ORD-001': { status: 'shipped', userId: 'user_123' },
  'ORD-002': { status: 'processing', userId: 'user_456' },
};

async function getOrderStatus(orderId, userId) {
  const requestLog = `User ${userId ?? 'guest'} requested order ${orderId}`;
  console.log(requestLog);

  const order = orders[orderId];
  if (!order) throw new Error('Order not found');
  return order.status;
}

module.exports = { getOrderStatus };
