const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authCheck');
const {
  createPermission,
  getPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
} = require('../controllers/permissionController');

// Debug: Log middleware and controllers to verify
console.log('auth:', typeof auth);
console.log('createPermission:', typeof createPermission);
console.log('getPermissions:', typeof getPermissions);
console.log('getPermissionById:', typeof getPermissionById);
console.log('updatePermission:', typeof updatePermission);
console.log('deletePermission:', typeof deletePermission);

// @route   POST /api/permissions
// @desc    Create a new permission
// @access  Private
router.post('/', auth, createPermission);

// @route   GET /api/permissions
// @desc    Get all permissions
// @access  Private
router.get('/', auth, getPermissions);

// @route   GET /api/permissions/:id
// @desc    Get a permission by ID
// @access  Private
router.get('/:id', auth, getPermissionById);

// @route   PUT /api/permissions/:id
// @desc    Update a permission
// @access  Private
router.put('/:id', auth, updatePermission);

// @route   DELETE /api/permissions/:id
// @desc    Delete a permission
// @access  Private
router.delete('/:id', auth, deletePermission);

module.exports = router;