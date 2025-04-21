const Business = require('../models/Business');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');

// Create a new business
exports.createBusiness = async (req, res) => {
  const { name, type, description, superAdminUserId } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    // Check if user is admin or superadmin
    if (!req.user || !['admin', 'superadmin'].includes(req.user.role)) {
      if (req.file) {
        fs.unlinkSync(path.join(__dirname, '..', 'uploads', req.file.filename));
      }
      return res.status(403).json({ message: 'Only admins or superadmins can create businesses' });
    }

    // Validate input
    if (!name || !type || !description || !superAdminUserId) {
      if (req.file) {
        fs.unlinkSync(path.join(__dirname, '..', 'uploads', req.file.filename));
      }
      return res.status(400).json({ message: 'Name, type, description, and superAdminUserId are required' });
    }

    // Validate business type
    const validTypes = ['Factory', 'Shop', 'Dairy Farm', 'School', 'Data Engineer', 'Other'];
    if (!validTypes.includes(type)) {
      if (req.file) {
        fs.unlinkSync(path.join(__dirname, '..', 'Uploads', req.file.filename));
      }
      return res.status(400).json({ message: `Invalid business type. Must be one of: ${validTypes.join(', ')}` });
    }

    // Check if superAdminUserId exists
    const user = await User.findById(superAdminUserId);
    if (!user) {
      if (req.file) {
        fs.unlinkSync(path.join(__dirname, '..', 'uploads', req.file.filename));
      }
      return res.status(404).json({ message: 'Super admin user not found' });
    }

    // Ensure superAdminUserId matches the authenticated user
    if (superAdminUserId !== req.user.id) {
      if (req.file) {
        fs.unlinkSync(path.join(__dirname, '..', 'uploads', req.file.filename));
      }
      return res.status(403).json({ message: 'You can only create businesses for yourself' });
    }

    // Create and save business
    const business = new Business({
      name,
      type,
      description,
      image,
      superAdminUserId,
    });
    await business.save();

    // Populate superAdminUserId for response
    const populatedBusiness = await Business.findById(business._id).populate('superAdminUserId', 'fullName email');
    res.status(201).json(populatedBusiness);
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(path.join(__dirname, '..', 'uploads', req.file.filename));
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all businesses
exports.getBusinesses = async (req, res) => {
  try {
    // Verify user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Debug: Log user ID and role
    console.log('Fetching businesses for user:', { id: req.user.id, role: req.user.role });

    // Find businesses for the logged-in user
    const businesses = await Business.find({ superAdminUserId: req.user.id })
      .populate('superAdminUserId', 'fullName email');

    // Debug: Log number of businesses found
    console.log('Found businesses:', businesses.length);

    res.json(businesses);
  } catch (error) {
    console.error('Error in getBusinesses:', error.message);
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
  const { name, type, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    // Find business
    const business = await Business.findById(req.params.id);
    if (!business) {
      if (req.file) {
        fs.unlinkSync(path.join(__dirname, '..', 'uploads', req.file.filename));
      }
      return res.status(404).json({ message: 'Business not found' });
    }

    // Update fields if provided
    if (name) business.name = name;
    if (type) {
      const validTypes = ['Factory', 'Shop', 'Dairy Farm', 'School', 'Data Engineer', 'Other'];
      if (!validTypes.includes(type)) {
        if (req.file) {
          fs.unlinkSync(path.join(__dirname, '..', 'Uploads', req.file.filename));
        }
        return res.status(400).json({ message: `Invalid business type. Must be one of: ${validTypes.join(', ')}` });
      }
      business.type = type;
    }
    if (description) business.description = description;
    if (image) {
      // Delete old image if exists
      if (business.image) {
        const oldImagePath = path.join(__dirname, '..', business.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      business.image = image;
    }

    await business.save();

    // Populate superAdminUserId for response
    const populatedBusiness = await Business.findById(business._id).populate('superAdminUserId', 'fullName email');
    res.json(populatedBusiness);
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(path.join(__dirname, '..', 'uploads', req.file.filename));
    }
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

    // Restrict deletion to superAdminUserId or admin
    if (business.superAdminUserId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized to delete this business' });
    }

    // Delete image if exists
    if (business.image) {
      const imagePath = path.join(__dirname, '..', business.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await business.deleteOne();
    res.json({ message: 'Business deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};