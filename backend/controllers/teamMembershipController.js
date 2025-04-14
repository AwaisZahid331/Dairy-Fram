const TeamMembership = require('../models/TeamMembership');
const Team = require('../models/Team');
const User = require('../models/User');
const Role = require('../models/Role');
const mongoose = require('mongoose');

// Create a new team membership
exports.createTeamMembership = async (req, res) => {
  const { teamId, userId, roleId } = req.body;

  try {
    // Validate input
    if (!teamId || !userId || !roleId) {
      return res.status(400).json({ message: 'Team ID, user ID, and role ID are required' });
    }

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(teamId)) {
      return res.status(400).json({ message: 'Invalid team ID' });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    if (!mongoose.Types.ObjectId.isValid(roleId)) {
      return res.status(400).json({ message: 'Invalid role ID' });
    }

    // Check if team exists
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
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
    const existingMembership = await TeamMembership.findOne({ teamId, userId });
    if (existingMembership) {
      return res.status(400).json({ message: 'User is already a member of this team' });
    }

    // Create and save team membership
    const teamMembership = new TeamMembership({
      teamId,
      userId,
      roleId,
    });
    await teamMembership.save();

    // Populate references for response
    const populatedMembership = await TeamMembership.findById(teamMembership._id)
      .populate('teamId', 'name')
      .populate('userId', 'fullName email')
      .populate('roleId', 'name scope');

    res.status(201).json(populatedMembership);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all team memberships (optionally filter by teamId, userId, or roleId)
exports.getTeamMemberships = async (req, res) => {
  try {
    const { teamId, userId, roleId } = req.query;

    // Build query
    const query = {};
    if (teamId) {
      if (!mongoose.Types.ObjectId.isValid(teamId)) {
        return res.status(400).json({ message: 'Invalid team ID' });
      }
      query.teamId = teamId;
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

    // Fetch memberships and populate references
    const memberships = await TeamMembership.find(query)
      .populate('teamId', 'name')
      .populate('userId', 'fullName email')
      .populate('roleId', 'name scope');

    res.json(memberships);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a team membership by ID
exports.getTeamMembershipById = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid team membership ID' });
    }

    // Find membership and populate references
    const membership = await TeamMembership.findById(id)
      .populate('teamId', 'name')
      .populate('userId', 'fullName email')
      .populate('roleId', 'name scope');

    if (!membership) {
      return res.status(404).json({ message: 'Team membership not found' });
    }

    res.json(membership);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a team membership
exports.updateTeamMembership = async (req, res) => {
  const { id } = req.params;
  const { teamId, userId, roleId } = req.body;

  try {
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid team membership ID' });
    }

    // Validate input
    if (!teamId && !userId && !roleId) {
      return res.status(400).json({ message: 'At least one field (teamId, userId, or roleId) required' });
    }

    // Build update data
    const updateData = {};
    if (teamId) {
      if (!mongoose.Types.ObjectId.isValid(teamId)) {
        return res.status(400).json({ message: 'Invalid team ID' });
      }
      const team = await Team.findById(teamId);
      if (!team) {
        return res.status(404).json({ message: 'Team not found' });
      }
      updateData.teamId = teamId;
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

    // Check for duplicate membership
    if (teamId && userId) {
      const existingMembership = await TeamMembership.findOne({
        teamId,
        userId,
        _id: { $ne: id },
      });
      if (existingMembership) {
        return res.status(400).json({ message: 'User is already a member of this team' });
      }
    }

    // Update membership
    const membership = await TeamMembership.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    )
      .populate('teamId', 'name')
      .populate('userId', 'fullName email')
      .populate('roleId', 'name scope');

    if (!membership) {
      return res.status(404).json({ message: 'Team membership not found' });
    }

    res.json(membership);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a team membership
exports.deleteTeamMembership = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid team membership ID' });
    }

    // Find and delete membership
    const membership = await TeamMembership.findByIdAndDelete(id);
    if (!membership) {
      return res.status(404).json({ message: 'Team membership not found' });
    }

    res.json({ message: 'Team membership deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};