const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  createBusiness,
  getBusinesses,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
} = require('../controllers/businessController');

// @route   POST /api/businesses
// @desc    Create a new business
// @access  Private
router.post('/', auth, createBusiness);

// @route   GET /api/businesses
// @desc    Get all businesses
// @access  Private
router.get('/', auth, getBusinesses);

// @route   GET /api/businesses/:id
// @desc    Get a single business by ID
// @access  Private
router.get('/:id', auth, getBusinessById);

// @route   PUT /api/businesses/:id
// @desc    Update a business
// @access  Private
router.put('/:id', auth, updateBusiness);

// @route   DELETE /api/businesses/:id
// @desc    Delete a business
// @access  Private
router.delete('/:id', auth, deleteBusiness);

module.exports = router;