const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth, isAdmin } = require('../middleware/authCheck');

// @route   PUT /api/admin/set-role
// @desc    Set user role (admin only)
// @access  Private (admin)
router.put('/set-role', auth, isAdmin, async (req, res) => {
  const { email, role } = req.body;

  try {
    // Validate input
    if (!email || !role) {
      return res.status(400).json({ message: 'Email and role are required' });
    }

    // Validate role
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Find and update user
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { role } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Role updated', user: { id: user._id, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;