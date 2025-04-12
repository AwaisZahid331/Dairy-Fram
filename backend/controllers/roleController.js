const Role = require('../models/Role');

// Create a new role
exports.createRole = async (req, res) => {
  const { name, scope } = req.body;

  try {
    // Validate input
    if (!name || !scope) {
      return res.status(400).json({ message: 'Name and scope are required' });
    }

    // Validate scope
    const validScopes = ['business', 'team', 'project'];
    if (!validScopes.includes(scope)) {
      return res.status(400).json({ message: `Invalid scope. Must be one of: ${validScopes.join(', ')}` });
    }

    // Check for duplicate role name within scope
    const existingRole = await Role.findOne({ name, scope });
    if (existingRole) {
      return res.status(400).json({ message: `Role '${name}' already exists for scope '${scope}'` });
    }

    // Create and save role
    const role = new Role({
      name,
      scope,
    });
    await role.save();

    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all roles
exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a role
exports.deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete role
    const role = await Role.findByIdAndDelete(id);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    res.json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a role
exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const { name, scope } = req.body;

  try {
    // Validate input
    if (!name && !scope) {
      return res.status(400).json({ message: 'At least one field (name or scope) required' });
    }

    // Validate scope if provided
    if (scope) {
      const validScopes = ['business', 'team', 'project'];
      if (!validScopes.includes(scope)) {
        return res.status(400).json({ message: `Invalid scope. Must be one of: ${validScopes.join(', ')}` });
      }
    }

    // Find and update role
    const updateData = {};
    if (name) updateData.name = name;
    if (scope) updateData.scope = scope;

    const role = await Role.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    res.json(role);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};