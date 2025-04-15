const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authCheck');
const {
  createRolePermission,
  getRolePermissions,
  getRolePermissionById,
  updateRolePermission,
  deleteRolePermission,
} = require('../controllers/rolePermissionController');

// Debug: Log middleware and controllers to verify
console.log('auth:', typeof auth);
console.log('createRolePermission:', typeof createRolePermission);
console.log('getRolePermissions:', typeof getRolePermissions);
console.log('getRolePermissionById:', typeof getRolePermissionById);
console.log('updateRolePermission:', typeof updateRolePermission);
console.log('deleteRolePermission:', typeof deleteRolePermission);

// @route   POST /api/role-permissions
// @desc    Create a new role permission
// @access  Private
router.post('/', auth, createRolePermission);

// @route   GET /api/role-permissions
// @desc    Get all role permissions (optionally filter by roleId or permissionId)
// @access  Private
router.get('/', auth, getRolePermissions);

// @route   GET /api/role-permissions/:id
// @desc    Get a role permission by ID
// @access  Private
router.get('/:id', auth, getRolePermissionById);

// @route   PUT /api/role-permissions/:id
// @desc    Update a role permission
// @access  Private
router.put('/:id', auth, updateRolePermission);

// @route   DELETE /api/role-permissions/:id
// @desc    Delete a role permission
// @access  Private
router.delete('/:id', auth, deleteRolePermission);

module.exports = router;