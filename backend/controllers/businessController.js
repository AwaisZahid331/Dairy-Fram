const Business = require('../models/Business');
const User = require('../models/User');

// Create a new business
exports.createBusiness = async (req, res) => {
  const { name, type, superAdminUserId } = req.body;

  try {
    // Validate input
    if (!name || !type || !superAdminUserId) {
      return res.status(400).json({ message: 'Name, type, and superAdminUserId are required' });
    }

    // Validate business type
    const validTypes = ['Factory', 'Shop', 'Dairy Farm', 'School', 'Data Engineer', 'Other'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ message: 'Invalid business type' });
    }

    // Check if superAdminUserId exists
    const user = await User.findById(superAdminUserId);
    if (!user) {
      return res.status(404).json({ message: 'Super admin user not found' });
    }

    // Create and save business
    const business = new Business({
      name,
      type,
      superAdminUserId,
    });
    await business.save();

    // Populate superAdminUserId for response
    const populatedBusiness = await Business.findById(business._id).populate('superAdminUserId', 'fullName email');
    res.status(201).json(populatedBusiness);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all businesses
exports.getBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find().populate('superAdminUserId', 'fullName email');
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a single business by ID
exports.getBusinessById = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id).populate('superAdminUserId', 'fullName email');
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    res.json(business);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a business
exports.updateBusiness = async (req, res) => {
  // Check if req.body is undefined or empty
  if (!req.body) {
    return res.status(400).json({ message: 'Request body is required' });
  }

  const { name, type } = req.body;

  try {
    // Find business
    const business = await Business.findById(req.params.id);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    // Update fields if provided
    if (name) business.name = name;
    if (type) {
      const validTypes = ['Factory', 'Shop', 'Dairy Farm', 'School', 'Data Engineer', 'Other'];
      if (!validTypes.includes(type)) {
        return res.status(400).json({ message: `Invalid business type. Must be one of: ${validTypes.join(', ')}` });
      }
      business.type = type;
    }

    await business.save();

    // Populate superAdminUserId for response
    const populatedBusiness = await Business.findById(business._id).populate('superAdminUserId', 'fullName email');
    res.json(populatedBusiness);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a business
exports.deleteBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    // Optional: Restrict deletion to superAdminUserId or admin
    if (business.superAdminUserId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized to delete this business' });
    }

    await business.deleteOne();
    res.json({ message: 'Business deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};