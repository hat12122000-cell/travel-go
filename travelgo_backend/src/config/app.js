// src/config/app.js
const express = require('express');
const cors    = require('cors');

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log mỗi request
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Đăng ký routes
app.use('/api/destinations', require('../modules/destinations/destination.route'));
app.use('/api/foods',        require('../modules/foods/food.route'));
app.use('/api/drinks',       require('../modules/drinks/drink.route'));
app.use('/api/contacts',     require('../modules/contacts/contact.route'));

// Route kiểm tra server
app.get('/api', (req, res) => {
  res.json({ message: '🌏 Travel Go API is running!', version: '1.0.0' });
});

// Error handler — phải đặt cuối cùng
app.use(require('../middleware/errorHandler'));

module.exports = app;