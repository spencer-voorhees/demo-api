const products = [
  { id: 1, name: 'Classic T-Shirt', category: 'tops' },
  { id: 2, name: 'Women\'s Blouse & Pants Set', category: 'tops' },
  { id: 3, name: 'Running Shorts', category: 'bottoms' },
  { id: 4, name: 'Denim Jeans', category: 'bottoms' },
  { id: 5, name: 'Summer Dress', category: 'dresses' },
];

function sanitizeQuery(raw) {
  let decoded;
  try {
    decoded = decodeURIComponent(raw);
  } catch (e) {
    decoded = raw;
  }
  // Escape characters that have special meaning in a RegExp
  return decoded.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function searchProducts(query) {
  if (!query || typeof query !== 'string') {
    return [];
  }

  const sanitized = sanitizeQuery(query.trim());
  if (sanitized.length === 0) {
    return [];
  }

  const pattern = new RegExp(sanitized, 'i');
  return products.filter(
    (p) => pattern.test(p.name) || pattern.test(p.category)
  );
}

module.exports = { searchProducts, sanitizeQuery };
