const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authCheck');
const {
  createProjectMembership,
  getProjectMemberships,
  getProjectMembershipById,
  updateProjectMembership,
  deleteProjectMembership,
} = require('../controllers/projectMembershipController');

// Debug: Log middleware and controllers to verify
console.log('auth:', typeof auth);
console.log('createProjectMembership:', typeof createProjectMembership);
console.log('getProjectMemberships:', typeof getProjectMemberships);
console.log('getProjectMembershipById:', typeof getProjectMembershipById);
console.log('updateProjectMembership:', typeof updateProjectMembership);
console.log('deleteProjectMembership:', typeof deleteProjectMembership);

// @route   POST /api/project-memberships
// @desc    Create a new project membership
// @access  Private
router.post('/', auth, createProjectMembership);

// @route   GET /api/project-memberships
// @desc    Get all project memberships (optionally filter by projectId, userId, or roleId)
// @access  Private
router.get('/', auth, getProjectMemberships);

// @route   GET /api/project-memberships/:id
// @desc    Get a project membership by ID
// @access  Private
router.get('/:id', auth, getProjectMembershipById);

// @route   PUT /api/project-memberships/:id
// @desc    Update a project membership
// @access  Private
router.put('/:id', auth, updateProjectMembership);

// @route   DELETE /api/project-memberships/:id
// @desc    Delete a project membership
// @access  Private
router.delete('/:id', auth, deleteProjectMembership);

module.exports = router;