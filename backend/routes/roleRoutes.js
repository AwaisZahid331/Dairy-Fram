const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/authCheck');
const { createRole, getRoles, deleteRole, updateRole } = require('../controllers/roleController');

// Debug: Log middleware and controllers to verify
console.log('auth:', typeof auth);
console.log('isAdmin:', typeof isAdmin);
console.log('createRole:', typeof createRole);
console.log('getRoles:', typeof getRoles);
console.log('deleteRole:', typeof deleteRole);
console.log('updateRole:', typeof updateRole);

// @route   POST /api/roles
// @desc    Create a new role
// @access  Private
router.post('/', auth, createRole);

// @route   GET /api/roles
// @desc    Get all roles
// @access  Private
router.get('/', auth, getRoles);

// @route   DELETE /api/roles/:id
// @desc    Delete a role
// @access  Private
router.delete('/:id', auth, deleteRole);

// @route   PUT /api/roles/:id
// @desc    Update a role
// @access  Private
router.put('/:id', auth, updateRole);

module.exports = router;