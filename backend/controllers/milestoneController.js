const Milestone = require('../models/Milestone');
const Project = require('../models/Project');
const User = require('../models/User');
const ProjectMembership = require('../models/ProjectMembership');
const mongoose = require('mongoose');

// Create a new milestone
exports.createMilestone = async (req, res) => {
  const { projectId, name, description, dueDate, status, assignedTo } = req.body;
  const userId = req.user.id; // From auth middleware

  try {
    // Validate input
    if (!projectId || !name) {
      return res.status(400).json({ message: 'Project ID and name are required' });
    }
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }
    if (status && !['pending', 'in_progress', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    if (assignedTo && !Array.isArray(assignedTo)) {
      return res.status(400).json({ message: 'AssignedTo must be an array' });
    }
    if (assignedTo) {
      for (const id of assignedTo) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: `Invalid user ID in assignedTo: ${id}` });
        }
      }
    }

    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is a member of the project
    const userMembership = await ProjectMembership.findOne({ projectId, userId });
    if (!userMembership) {
      return res.status(403).json({ message: 'You are not a member of this project' });
    }

    // Validate assignedTo users are project members
    if (assignedTo && assignedTo.length > 0) {
      const memberships = await ProjectMembership.find({
        projectId,
        userId: { $in: assignedTo },
      });
      const validUserIds = memberships.map((m) => m.userId.toString());
      for (const id of assignedTo) {
        if (!validUserIds.includes(id)) {
          return res.status(400).json({ message: `User ${id} is not a member of the project` });
        }
      }
    }

    // Create milestone
    const milestone = new Milestone({
      projectId,
      name,
      description,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      status: status || 'pending',
      assignedTo: assignedTo || [],
    });
    await milestone.save();

    // Populate references
    const populatedMilestone = await Milestone.findById(milestone._id)
      .populate('projectId', 'name businessId')
      .populate('assignedTo', 'fullName email');

    res.status(201).json(populatedMilestone);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get milestones
exports.getMilestones = async (req, res) => {
  const { projectId } = req.query;
  const userId = req.user.id; // From auth middleware

  try {
    // Validate input
    if (!projectId) {
      return res.status(400).json({ message: 'Project ID is required' });
    }
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }

    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is a member of the project
    const userMembership = await ProjectMembership.findOne({ projectId, userId });
    if (!userMembership) {
      return res.status(403).json({ message: 'You are not a member of this project' });
    }

    // Fetch milestones
    const milestones = await Milestone.find({ projectId })
      .populate('projectId', 'name businessId')
      .populate('assignedTo', 'fullName email')
      .sort({ createdAt: -1 }); // Newest first

    res.json(milestones);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a milestone
exports.updateMilestone = async (req, res) => {
  const { id } = req.params;
  const { name, description, dueDate, status, assignedTo } = req.body;
  const userId = req.user.id; // From auth middleware

  try {
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid milestone ID' });
    }

    // Find milestone
    const milestone = await Milestone.findById(id);
    if (!milestone) {
      return res.status(404).json({ message: 'Milestone not found' });
    }

    // Check if user is a member of the project
    const userMembership = await ProjectMembership.findOne({ projectId: milestone.projectId, userId });
    if (!userMembership) {
      return res.status(403).json({ message: 'You are not a member of this project' });
    }

    // Validate assignedTo users are project members
    if (assignedTo && Array.isArray(assignedTo)) {
      for (const id of assignedTo) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: `Invalid user ID in assignedTo: ${id}` });
        }
      }
      const memberships = await ProjectMembership.find({
        projectId: milestone.projectId,
        userId: { $in: assignedTo },
      });
      const validUserIds = memberships.map((m) => m.userId.toString());
      for (const id of assignedTo) {
        if (!validUserIds.includes(id)) {
          return res.status(400).json({ message: `User ${id} is not a member of the project` });
        }
      }
    }

    // Validate status
    if (status && !['pending', 'in_progress', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    // Update milestone
    milestone.name = name || milestone.name;
    milestone.description = description !== undefined ? description : milestone.description;
    milestone.dueDate = dueDate ? new Date(dueDate) : milestone.dueDate;
    milestone.status = status || milestone.status;
    milestone.assignedTo = assignedTo !== undefined ? assignedTo : milestone.assignedTo;

    await milestone.save();

    // Populate references
    const populatedMilestone = await Milestone.findById(id)
      .populate('projectId', 'name businessId')
      .populate('assignedTo', 'fullName email');

    res.json(populatedMilestone);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a milestone
exports.deleteMilestone = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; // From auth middleware

  try {
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid milestone ID' });
    }

    // Find milestone
    const milestone = await Milestone.findById(id);
    if (!milestone) {
      return res.status(404).json({ message: 'Milestone not found' });
    }

    // Check if user is a member of the project
    const userMembership = await ProjectMembership.findOne({ projectId: milestone.projectId, userId });
    if (!userMembership) {
      return res.status(403).json({ message: 'You are not a member of this project' });
    }

    // Delete milestone
    await Milestone.findByIdAndDelete(id);

    res.json({ message: 'Milestone deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};