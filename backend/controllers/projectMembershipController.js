const ProjectMembership = require('../models/ProjectMembership');
const Project = require('../models/Project');
const User = require('../models/User');
const Role = require('../models/Role');
const TeamMembership = require('../models/TeamMembership');
const mongoose = require('mongoose');

// Create a new project membership
exports.createProjectMembership = async (req, res) => {
  const { projectId, userId, roleId } = req.body;

  try {
    // Validate input
    if (!projectId || !userId || !roleId) {
      return res.status(400).json({ message: 'Project ID, user ID, and role ID are required' });
    }

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    if (!mongoose.Types.ObjectId.isValid(roleId)) {
      return res.status(400).json({ message: 'Invalid role ID' });
    }

    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
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

    // Check if user is a member of the project's team
    const teamMembership = await TeamMembership.findOne({
      teamId: project.teamId,
      userId,
    });
    if (!teamMembership) {
      return res.status(400).json({ message: 'User is not a member of the project’s team' });
    }

    // Check for duplicate membership
    const existingMembership = await ProjectMembership.findOne({ projectId, userId });
    if (existingMembership) {
      return res.status(400).json({ message: 'User is already a member of this project' });
    }

    // Create and save project membership
    const projectMembership = new ProjectMembership({
      projectId,
      userId,
      roleId,
    });
    await projectMembership.save();

    // Populate references for response
    const populatedMembership = await ProjectMembership.findById(projectMembership._id)
      .populate('projectId', 'projectName')
      .populate('userId', 'fullName email')
      .populate('roleId', 'name scope');

    res.status(201).json(populatedMembership);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all project memberships (optionally filter by projectId, userId, or roleId)
exports.getProjectMemberships = async (req, res) => {
  try {
    const { projectId, userId, roleId } = req.query;

    // Build query
    const query = {};
    if (projectId) {
      if (!mongoose.Types.ObjectId.isValid(projectId)) {
        return res.status(400).json({ message: 'Invalid project ID' });
      }
      query.projectId = projectId;
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
    const memberships = await ProjectMembership.find(query)
      .populate('projectId', 'projectName')
      .populate('userId', 'fullName email')
      .populate('roleId', 'name scope');

    res.json(memberships);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a project membership by ID
exports.getProjectMembershipById = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid project membership ID' });
    }

    // Find membership and populate references
    const membership = await ProjectMembership.findById(id)
      .populate('projectId', 'projectName')
      .populate('userId', 'fullName email')
      .populate('roleId', 'name scope');

    if (!membership) {
      return res.status(404).json({ message: 'Project membership not found' });
    }

    res.json(membership);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a project membership
exports.updateProjectMembership = async (req, res) => {
  const { id } = req.params;
  const { projectId, userId, roleId } = req.body;

  try {
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid project membership ID' });
    }

    // Validate input
    if (!projectId && !userId && !roleId) {
      return res.status(400).json({ message: 'At least one field (projectId, userId, or roleId) required' });
    }

    // Build update data
    const updateData = {};
    if (projectId) {
      if (!mongoose.Types.ObjectId.isValid(projectId)) {
        return res.status(400).json({ message: 'Invalid project ID' });
      }
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      updateData.projectId = projectId;
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

    // If updating projectId or userId, ensure user is in the project's team
    if (projectId || userId) {
      const membership = await ProjectMembership.findById(id);
      if (!membership) {
        return res.status(404).json({ message: 'Project membership not found' });
      }
      const targetProjectId = projectId || membership.projectId;
      const targetUserId = userId || membership.userId;
      
      const project = await Project.findById(targetProjectId);
      if (!project) {
        return res.status(404).json({ message: 'Target project not found' });
      }

      const teamMembership = await TeamMembership.findOne({
        teamId: project.teamId,
        userId: targetUserId,
      });
      if (!teamMembership) {
        return res.status(400).json({ message: 'User is not a member of the target project’s team' });
      }

      // Check for duplicate membership
      const existingMembership = await ProjectMembership.findOne({
        projectId: targetProjectId,
        userId: targetUserId,
        _id: { $ne: id },
      });
      if (existingMembership) {
        return res.status(400).json({ message: 'User is already a member of this project' });
      }
    }

    // Update membership
    const membership = await ProjectMembership.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    )
      .populate('projectId', 'projectName')
      .populate('userId', 'fullName email')
      .populate('roleId', 'name scope');

    if (!membership) {
      return res.status(404).json({ message: 'Project membership not found' });
    }

    res.json(membership);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a project membership
exports.deleteProjectMembership = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid project membership ID' });
    }

    // Find and delete membership
    const membership = await ProjectMembership.findByIdAndDelete(id);
    if (!membership) {
      return res.status(404).json({ message: 'Project membership not found' });
    }

    res.json({ message: 'Project membership deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};