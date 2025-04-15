const Project = require('../models/Project');
const Business = require('../models/Business');
const Team = require('../models/Team');
const mongoose = require('mongoose');

// Create a new project
exports.createProject = async (req, res) => {
  const { businessId, teamId, projectName, description, status } = req.body;

  try {
    // Validate input
    if (!businessId || !teamId || !projectName) {
      return res.status(400).json({ message: 'Business ID, team ID, and project name are required' });
    }

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(businessId)) {
      return res.status(400).json({ message: 'Invalid business ID' });
    }
    if (!mongoose.Types.ObjectId.isValid(teamId)) {
      return res.status(400).json({ message: 'Invalid team ID' });
    }

    // Validate status if provided
    if (status && !['pending', 'in_progress', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Must be pending, in_progress, or completed' });
    }

    // Check if business exists
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    // Check if team exists
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Check if team belongs to the business
    if (team.businessId.toString() !== businessId.toString()) {
      return res.status(400).json({ message: 'Team does not belong to the specified business' });
    }

    // Check for duplicate project name within business (optional)
    const existingProject = await Project.findOne({ businessId, projectName });
    if (existingProject) {
      return res.status(400).json({ message: `Project '${projectName}' already exists in this business` });
    }

    // Create and save project
    const project = new Project({
      businessId,
      teamId,
      projectName,
      description,
      status: status || 'pending', // Default to pending
    });
    await project.save();

    // Populate references for response
    const populatedProject = await Project.findById(project._id)
      .populate('businessId', 'name')
      .populate('teamId', 'name');

    res.status(201).json(populatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//2 Get all projects (optionally filter by businessId, teamId, or status)
exports.getProjects = async (req, res) => {
  try {
    const { businessId, teamId, status } = req.query;

    // Build query
    const query = {};
    if (businessId) {
      if (!mongoose.Types.ObjectId.isValid(businessId)) {
        return res.status(400).json({ message: 'Invalid business ID' });
      }
      query.businessId = businessId;
    }
    if (teamId) {
      if (!mongoose.Types.ObjectId.isValid(teamId)) {
        return res.status(400).json({ message: 'Invalid team ID' });
      }
      query.teamId = teamId;
    }
    if (status) {
      if (!['pending', 'in_progress', 'completed'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status. Must be pending, in_progress, or completed' });
      }
      query.status = status;
    }

    // Fetch projects and populate references
    const projects = await Project.find(query)
      .populate('businessId', 'name')
      .populate('teamId', 'name');

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 3 Get a project by ID
exports.getProjectById = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }

    // Find project and populate references
    const project = await Project.findById(id)
      .populate('businessId', 'name')
      .populate('teamId', 'name');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 4 Update a project
exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const { businessId, teamId, projectName, description, status } = req.body;

  try {
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }

    // Validate input
    if (!businessId && !teamId && !projectName && !description && !status) {
      return res.status(400).json({ message: 'At least one field is required' });
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
    if (projectName) updateData.projectName = projectName;
    if (description !== undefined) updateData.description = description;
    if (status) {
      if (!['pending', 'in_progress', 'completed'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status. Must be pending, in_progress, or completed' });
      }
      updateData.status = status;
    }

    // If updating businessId and teamId, ensure team belongs to the business
    if (businessId && teamId) {
      const team = await Team.findById(teamId);
      if (team.businessId.toString() !== businessId.toString()) {
        return res.status(400).json({ message: 'Team does not belong to the specified business' });
      }
    } else if (teamId) {
      // If only teamId is updated, check against project's current businessId
      const project = await Project.findById(id);
      if (project) {
        const team = await Team.findById(teamId);
        if (team.businessId.toString() !== project.businessId.toString()) {
          return res.status(400).json({ message: 'Team does not belong to the project’s business' });
        }
      }
    }

    // Check for duplicate project name within business
    if (projectName && (businessId || !businessId)) {
      const project = await Project.findById(id);
      if (project) {
        const query = { projectName, _id: { $ne: id } };
        if (businessId) {
          query.businessId = businessId;
        } else {
          query.businessId = project.businessId;
        }
        const existingProject = await Project.findOne(query);
        if (existingProject) {
          return res.status(400).json({ message: `Project '${projectName}' already exists in this business` });
        }
      }
    }

    // Update project
    const project = await Project.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    )
      .populate('businessId', 'name')
      .populate('teamId', 'name');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 5 Delete a project
exports.deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }

    // Find and delete project
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};