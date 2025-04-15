const Permission = require('../models/Permission');
const RolePermission = require('../models/RolePermission');
const mongoose = require('mongoose');

// Create a new permission
exports.createPermission = async (req, res) => {
  const { name, description } = req.body;

  try {
    // Validate input
    if (!name) {
      return res.status(400).json({ message: 'Permission name is required' });
    }

    // Check for duplicate permission name
    const existingPermission = await Permission.findOne({ name });
    if (existingPermission) {
      return res.status(400).json({ message: `Permission '${name}' already exists` });
    }

    // Create and save permission
    const permission = new Permission({
      name,
      description,
    });
    await permission.save();

    res.status(201).json(permission);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all permissions
exports.getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a permission by ID
exports.getPermissionById = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid permission ID' });
    }

    // Find permission
    const permission = await Permission.findById(id);
    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }

    res.json(permission);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a permission
exports.updatePermission = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid permission ID' });
    }

    // Validate input
    if (!name && !description) {
      return res.status(400).json({ message: 'At least one field (name or description) required' });
    }

    // Check for duplicate permission name
    if (name) {
      const existingPermission = await Permission.findOne({ name, _id: { $ne: id } });
      if (existingPermission) {
        return res.status(400).json({ message: `Permission '${name}' already exists` });
      }
    }

    // Build update data
    const updateData = {};
    if (name) updateData.name = name;
    if (description !== undefined) updateData.description = description; // Allow empty string

    // Update permission
    const permission = await Permission.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }

    res.json(permission);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a permission
exports.deletePermission = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid permission ID' });
    }

    // Check if permission is linked to any role
    const linkedRolePermission = await RolePermission.findOne({ permissionId: id });
    if (linkedRolePermission) {
      return res.status(400).json({ message: 'Cannot delete permission linked to a role' });
    }

    // Find and delete permission
    const permission = await Permission.findByIdAndDelete(id);
    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }

    res.json({ message: 'Permission deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};