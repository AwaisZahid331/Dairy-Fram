const BusinessMembership = require('../models/BusinessMembership');
const Business = require('../models/Business');
const User = require('../models/User');
const Role = require('../models/Role');
const mongoose = require('mongoose');

// Create a new business membership
exports.createBusinessMembership = async (req, res) => {
  const { businessId, userId, roleId, status } = req.body;

  try {
    // Validate input
    if (!businessId || !userId || !roleId) {
      return res.status(400).json({ message: 'Business ID, user ID, and role ID are required' });
    }

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(businessId)) {
      return res.status(400).json({ message: 'Invalid business ID' });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    if (!mongoose.Types.ObjectId.isValid(roleId)) {
      return res.status(400).json({ message: 'Invalid role ID' });
    }

    // Validate status if provided
    if (status && !['active', 'inactive', 'pending'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Must be active, inactive, or pending' });
    }

    // Check if business exists
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if role exists
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    // Check for duplicate membership
    const existingMembership = await BusinessMembership.findOne({ businessId, userId });
    if (existingMembership) {
      return res.status(400).json({ message: 'User is already a member of this business' });
    }

    // Create and save business membership
    const businessMembership = new BusinessMembership({
      businessId,
      userId,
      roleId,
      status: status || 'pending', // Default to pending if not provided
    });
    await businessMembership.save();

    // Populate references for response
    const populatedMembership = await BusinessMembership.findById(businessMembership._id)
      .populate('businessId', 'name')
      .populate('userId', 'fullName email')
      .populate('roleId', 'name scope');

    res.status(201).json(populatedMembership);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all business memberships (optionally filter by businessId, userId, roleId, or status)
exports.getBusinessMemberships = async (req, res) => {
  try {
    const { businessId, userId, roleId, status } = req.query;

    // Build query
    const query = {};
    if (businessId) {
      if (!mongoose.Types.ObjectId.isValid(businessId)) {
        return res.status(400).json({ message: 'Invalid business ID' });
      }
      query.businessId = businessId;
    }
    if (userId) {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }
      query.userId = userId;
    }
    if (roleId) {
      if (!mongoose.Types.ObjectId.isValid(roleId)) {
        return res.status(400).json({ message: 'Invalid role ID' });
      }
      query.roleId = roleId;
    }
    if (status) {
      if (!['active', 'inactive', 'pending'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status. Must be active, inactive, or pending' });
      }
      query.status = status;
    }

    // Fetch memberships and populate references
    const memberships = await BusinessMembership.find(query)
      .populate('businessId', 'name')
      .populate('userId', 'fullName email')
      .populate('roleId', 'name scope');

    res.json(memberships);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a business membership by ID
exports.getBusinessMembershipById = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid business membership ID' });
    }

    // Find membership and populate references
    const membership = await BusinessMembership.findById(id)
      .populate('businessId', 'name')
      .populate('userId', 'fullName email')
      .populate('roleId', 'name scope');

    if (!membership) {
      return res.status(404).json({ message: 'Business membership not found' });
    }

    res.json(membership);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a business membership
exports.updateBusinessMembership = async (req, res) => {
  const { id } = req.params;
  const { businessId, userId, roleId, status } = req.body;

  try {
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid business membership ID' });
    }

    // Validate input
    if (!businessId && !userId && !roleId && !status) {
      return res.status(400).json({ message: 'At least one field (businessId, userId, roleId, or status) required' });
    }

    // Build update data
    const updateData = {};
    if (businessId) {
      if (!mongoose.Types.ObjectId.isValid(businessId)) {
        return res.status(400).json({ message: 'Invalid business ID' });
      }
      const business = await Business.findById(businessId);
      if (!business) {
        return res.status(404).json({ message: 'Business not found' });
      }
      updateData.businessId = businessId;
    }
    if (userId) {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      updateData.userId = userId;
    }
    if (roleId) {
      if (!mongoose.Types.ObjectId.isValid(roleId)) {
        return res.status(400).json({ message: 'Invalid role ID' });
      }
      const role = await Role.findById(roleId);
      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }
      updateData.roleId = roleId;
    }
    if (status) {
      if (!['active', 'inactive', 'pending'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status. Must be active, inactive, or pending' });
      }
      updateData.status = status;
    }

    // Check for duplicate membership
    if (businessId && userId) {
      const existingMembership = await BusinessMembership.findOne({
        businessId,
        userId,
        _id: { $ne: id },
      });
      if (existingMembership) {
        return res.status(400).json({ message: 'User is already a member of this business' });
      }
    }

    // Update membership
    const membership = await BusinessMembership.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    )
      .populate('businessId', 'name')
      .populate('userId', 'fullName email')
      .populate('roleId', 'name scope');

    if (!membership) {
      return res.status(404).json({ message: 'Business membership not found' });
    }

    res.json(membership);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a business membership
exports.deleteBusinessMembership = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid business membership ID' });
    }

    // Find and delete membership
    const membership = await BusinessMembership.findByIdAndDelete(id);
    if (!membership) {
      return res.status(404).json({ message: 'Business membership not found' });
    }

    res.json({ message: 'Business membership deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};