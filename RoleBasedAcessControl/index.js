const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const recordsRoutes = require('./routes/records');
const authController = require('./controllers/authController');
const recordsController = require('./controllers/recordsController');
const rbacMiddleware = require('./middleware/middleware');

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/records', rbacMiddleware.checkRole('user'), recordsRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});