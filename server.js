require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.get("/_health", (req, res) => res.json({ status: "ok" }));


// ✅ CORS middleware
app.use(cors({
  origin: 'http://127.0.0.1:8080',                  // frontend URL
  methods: ['GET','POST','PUT','DELETE','OPTIONS'], // allow all methods
  allowedHeaders: ['Content-Type','Authorization'], // headers frontend may send
  credentials: true
}));

// ✅ Handle preflight OPTIONS requests
app.options('*', cors({
  origin: 'http://127.0.0.1:8080',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}));

// Parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes'));
app.use('/api/budget', require('./routes/budgetRoutes'));

// Start server
const PORT = process.env.PORT || 5000;

app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend is running successfully!' });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
