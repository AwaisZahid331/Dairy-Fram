const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authCheck');
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

// Debug: Log middleware and controllers to verify
console.log('auth:', typeof auth);
console.log('createProject:', typeof createProject);
console.log('getProjects:', typeof getProjects);
console.log('getProjectById:', typeof getProjectById);
console.log('updateProject:', typeof updateProject);
console.log('deleteProject:', typeof deleteProject);

// @route   POST /api/projects
// @desc    Create a new project
// @access  Private
router.post('/', auth, createProject);

// @route   GET /api/projects
// @desc    Get all projects (optionally filter by businessId, teamId, or status)
// @access  Private
router.get('/', auth, getProjects);

// @route   GET /api/projects/:id
// @desc    Get a project by ID
// @access  Private
router.get('/:id', auth, getProjectById);

// @route   PUT /api/projects/:id
// @desc    Update a project
// @access  Private
router.put('/:id', auth, updateProject);

// @route   DELETE /api/projects/:id
// @desc    Delete a project
// @access  Private
router.delete('/:id', auth, deleteProject);

module.exports = router;