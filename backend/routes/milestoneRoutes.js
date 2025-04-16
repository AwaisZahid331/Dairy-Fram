const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authCheck');
const {
  createMilestone,
  getMilestones,
  updateMilestone,
  deleteMilestone,
} = require('../controllers/milestoneController');

// Debug: Log middleware and controllers to verify
console.log('auth:', typeof auth);
console.log('createMilestone:', typeof createMilestone);
console.log('getMilestones:', typeof getMilestones);
console.log('updateMilestone:', typeof updateMilestone);
console.log('deleteMilestone:', typeof deleteMilestone);

// @route   POST /api/milestones
// @desc    Create a new milestone
// @access  Private
router.post('/', auth, createMilestone);

// @route   GET /api/milestones
// @desc    Get milestones (filter by projectId)
// @access  Private
router.get('/', auth, getMilestones);

// @route   PUT /api/milestones/:id
// @desc    Update a milestone
// @access  Private
router.put('/:id', auth, updateMilestone);

// @route   DELETE /api/milestones/:id
// @desc    Delete a milestone
// @access  Private
router.delete('/:id', auth, deleteMilestone);

module.exports = router;