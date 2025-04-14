const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authCheck');
const {
  createTeamMembership,
  getTeamMemberships,
  getTeamMembershipById,
  updateTeamMembership,
  deleteTeamMembership,
} = require('../controllers/teamMembershipController');

// Debug: Log middleware and controllers to verify
console.log('auth:', typeof auth);
console.log('createTeamMembership:', typeof createTeamMembership);
console.log('getTeamMemberships:', typeof getTeamMemberships);
console.log('getTeamMembershipById:', typeof getTeamMembershipById);
console.log('updateTeamMembership:', typeof updateTeamMembership);
console.log('deleteTeamMembership:', typeof deleteTeamMembership);

// @route   POST /api/team-memberships
// @desc    Create a new team membership
// @access  Private
router.post('/', auth, createTeamMembership);

// @route   GET /api/team-memberships
// @desc    Get all team memberships (optionally filter by teamId, userId, or roleId)
// @access  Private
router.get('/', auth, getTeamMemberships);

// @route   GET /api/team-memberships/:id
// @desc    Get a team membership by ID
// @access  Private
router.get('/:id', auth, getTeamMembershipById);

// @route   PUT /api/team-memberships/:id
// @desc    Update a team membership
// @access  Private
router.put('/:id', auth, updateTeamMembership);

// @route   DELETE /api/team-memberships/:id
// @desc    Delete a team membership
// @access  Private
router.delete('/:id', auth, deleteTeamMembership);

module.exports = router;