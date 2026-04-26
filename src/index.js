const express = require('express');
const ordersRouter = require('./routes/orders');

const app = express();
app.use(express.json());
app.use('/api/orders', ordersRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));

module.exports = app;
