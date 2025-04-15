const RolePermission = require('../models/RolePermission');
const Role = require('../models/Role');
const Permission = require('../models/Permission');
const mongoose = require('mongoose');

// Create a new role permission
exports.createRolePermission = async (req, res) => {
  const { roleId, permissionId } = req.body;

  try {
    // Validate input
    if (!roleId || !permissionId) {
      return res.status(400).json({ message: 'Role ID and permission ID are required' });
    }

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(roleId)) {
      return res.status(400).json({ message: 'Invalid role ID' });
    }
    if (!mongoose.Types.ObjectId.isValid(permissionId)) {
      return res.status(400).json({ message: 'Invalid permission ID' });
    }

    // Check if role exists
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    // Check if permission exists
    const permission = await Permission.findById(permissionId);
    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }

    // Check for duplicate role-permission
    const existingRolePermission = await RolePermission.findOne({ roleId, permissionId });
    if (existingRolePermission) {
      return res.status(400).json({ message: 'This role already has this permission' });
    }

    // Create and save role permission
    const rolePermission = new RolePermission({
      roleId,
      permissionId,
    });
    await rolePermission.save();

    // Populate references for response
    const populatedRolePermission = await RolePermission.findById(rolePermission._id)
      .populate('roleId', 'name scope')
      .populate('permissionId', 'name description');

    res.status(201).json(populatedRolePermission);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all role permissions (optionally filter by roleId or permissionId)
exports.getRolePermissions = async (req, res) => {
  try {
    const { roleId, permissionId } = req.query;

    // Build query
    const query = {};
    if (roleId) {
      if (!mongoose.Types.ObjectId.isValid(roleId)) {
        return res.status(400).json({ message: 'Invalid role ID' });
      }
      query.roleId = roleId;
    }
    if (permissionId) {
      if (!mongoose.Types.ObjectId.isValid(permissionId)) {
        return res.status(400).json({ message: 'Invalid permission ID' });
      }
      query.permissionId = permissionId;
    }

    // Fetch role permissions and populate references
    const rolePermissions = await RolePermission.find(query)
      .populate('roleId', 'name scope')
      .populate('permissionId', 'name description');

    res.json(rolePermissions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a role permission by ID
exports.getRolePermissionById = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid role permission ID' });
    }

    // Find role permission and populate references
    const rolePermission = await RolePermission.findById(id)
      .populate('roleId', 'name scope')
      .populate('permissionId', 'name description');

    if (!rolePermission) {
      return res.status(404).json({ message: 'Role permission not found' });
    }

    res.json(rolePermission);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a role permission
exports.updateRolePermission = async (req, res) => {
  const { id } = req.params;
  const { roleId, permissionId } = req.body;

  try {
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid role permission ID' });
    }

    // Validate input
    if (!roleId && !permissionId) {
      return res.status(400).json({ message: 'At least one field (roleId or permissionId) required' });
    }

    // Build update data
    const updateData = {};
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
    if (permissionId) {
      if (!mongoose.Types.ObjectId.isValid(permissionId)) {
        return res.status(400).json({ message: 'Invalid permission ID' });
      }
      const permission = await Permission.findById(permissionId);
      if (!permission) {
        return res.status(404).json({ message: 'Permission not found' });
      }
      updateData.permissionId = permissionId;
    }

    // Check for duplicate role-permission
    if (roleId && permissionId) {
      const existingRolePermission = await RolePermission.findOne({
        roleId,
        permissionId,
        _id: { $ne: id },
      });
      if (existingRolePermission) {
        return res.status(400).json({ message: 'This role already has this permission' });
      }
    }

    // Update role permission
    const rolePermission = await RolePermission.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    )
      .populate('roleId', 'name scope')
      .populate('permissionId', 'name description');

    if (!rolePermission) {
      return res.status(404).json({ message: 'Role permission not found' });
    }

    res.json(rolePermission);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a role permission
exports.deleteRolePermission = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid role permission ID' });
    }

    // Find and delete role permission
    const rolePermission = await RolePermission.findByIdAndDelete(id);
    if (!rolePermission) {
      return res.status(404).json({ message: 'Role permission not found' });
    }

    res.json({ message: 'Role permission deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};