const express = require('express');
const ordersRouter = require('./routes/orders');
const searchRouter = require('./routes/search');

const app = express();
app.use(express.json());
app.use('/api/orders', ordersRouter);
app.use('/api/search', searchRouter);

const PORT = process.env.PORT || 3001;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`API running on port ${PORT}`));
}

module.exports = app;
