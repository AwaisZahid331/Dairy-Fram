const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { auth, isAdmin } = require('../middleware/auth');

// Admin signup (only for initial setup)
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    admin = new Admin({ email, password });
    await admin.save();

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ token, admin: { id: admin._id, email, role: admin.role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, admin: { id: admin._id, email, role: admin.role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected admin route example
router.get('/dashboard', auth, isAdmin, (req, res) => {
  res.json({ message: 'Welcome to admin dashboard' });
});

module.exports = router;