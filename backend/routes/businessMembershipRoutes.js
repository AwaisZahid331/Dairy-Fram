const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authCheck');
const {
  createBusinessMembership,
  getBusinessMemberships,
  getBusinessMembershipById,
  updateBusinessMembership,
  deleteBusinessMembership,
} = require('../controllers/businessMembershipController');

// Debug: Log middleware and controllers to verify
console.log('auth:', typeof auth);
console.log('createBusinessMembership:', typeof createBusinessMembership);
console.log('getBusinessMemberships:', typeof getBusinessMemberships);
console.log('getBusinessMembershipById:', typeof getBusinessMembershipById);
console.log('updateBusinessMembership:', typeof updateBusinessMembership);
console.log('deleteBusinessMembership:', typeof deleteBusinessMembership);

// @route   POST /api/business-memberships
// @desc    Create a new business membership
// @access  Private
router.post('/', auth, createBusinessMembership);

// @route   GET /api/business-memberships
// @desc    Get all business memberships (optionally filter by businessId, userId, roleId, or status)
// @access  Private
router.get('/', auth, getBusinessMemberships);

// @route   GET /api/business-memberships/:id
// @desc    Get a business membership by ID
// @access  Private
router.get('/:id', auth, getBusinessMembershipById);

// @route   PUT /api/business-memberships/:id
// @desc    Update a business membership
// @access  Private
router.put('/:id', auth, updateBusinessMembership);

// @route   DELETE /api/business-memberships/:id
// @desc    Delete a business membership
// @access  Private
router.delete('/:id', auth, deleteBusinessMembership);

module.exports = router;