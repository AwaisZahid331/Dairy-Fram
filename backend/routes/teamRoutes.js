const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authCheck');
const {
  createTeam,
  getTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
} = require('../controllers/teamController');

// Debug: Log middleware and controllers to verify
console.log('auth:', typeof auth);
console.log('createTeam:', typeof createTeam);
console.log('getTeams:', typeof getTeams);
console.log('getTeamById:', typeof getTeamById);
console.log('updateTeam:', typeof updateTeam);
console.log('deleteTeam:', typeof deleteTeam);

// @route   POST /api/teams
// @desc    Create a new team
// @access  Private
router.post('/', auth, createTeam);

// @route   GET /api/teams
// @desc    Get all teams (optionally filter by businessId)
// @access  Private
router.get('/', auth, getTeams);

// @route   GET /api/teams/:id
// @desc    Get a team by ID
// @access  Private
router.get('/:id', auth, getTeamById);

// @route   PUT /api/teams/:id
// @desc    Update a team
// @access  Private
router.put('/:id', auth, updateTeam);

// @route   DELETE /api/teams/:id
// @desc    Delete a team
// @access  Private
router.delete('/:id', auth, deleteTeam);

module.exports = router;