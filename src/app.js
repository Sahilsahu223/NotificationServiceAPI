const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
app.use(express.json());

// ✅ Mount routes at root
app.use('/', notificationRoutes); // OR: app.use('/api', notificationRoutes);

app.get('/', (req, res) => {
  res.send('Notification Service Running');
});

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

