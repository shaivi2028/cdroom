const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const problemRoutes = require('./routes/problemRoutes'); // Import once
const authRoutes = require('./routes/authRoutes');

const app = express();
connectDB();

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/problems', problemRoutes);

app.get('/', (req, res) => {
  res.send('Code Room API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

