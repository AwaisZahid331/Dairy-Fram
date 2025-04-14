const Team = require('../models/Team');
const Business = require('../models/Business');
const mongoose = require('mongoose');

// Create a new team
exports.createTeam = async (req, res) => {
  const { businessId, name } = req.body;

  try {
    // Validate input
    if (!businessId || !name) {
      return res.status(400).json({ message: 'Business ID and name are required' });
    }

    // Validate businessId
    if (!mongoose.Types.ObjectId.isValid(businessId)) {
      return res.status(400).json({ message: 'Invalid business ID' });
    }

    // Check if business exists
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    // Check for duplicate team name within business
    const existingTeam = await Team.findOne({ businessId, name });
    if (existingTeam) {
      return res.status(400).json({ message: `Team '${name}' already exists for this business` });
    }

    // Create and save team
    const team = new Team({
      businessId,
      name,
    });
    await team.save();

    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all teams (optionally filter by businessId)
exports.getTeams = async (req, res) => {
  try {
    const { businessId } = req.query;

    // Build query
    const query = {};
    if (businessId) {
      if (!mongoose.Types.ObjectId.isValid(businessId)) {
        return res.status(400).json({ message: 'Invalid business ID' });
      }
      query.businessId = businessId;
    }

    // Fetch teams and populate businessId
    const teams = await Team.find(query).populate('businessId', 'name');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a team by ID
exports.getTeamById = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid team ID' });
    }

    // Find team and populate businessId
    const team = await Team.findById(id).populate('businessId', 'name');
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    res.json(team);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a team
exports.updateTeam = async (req, res) => {
  const { id } = req.params;
  const { name, businessId } = req.body;

  try {
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid team ID' });
    }

    // Validate input
    if (!name && !businessId) {
      return res.status(400).json({ message: 'At least one field (name or businessId) required' });
    }

    // Build update data
    const updateData = {};
    if (name) updateData.name = name;
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

    // Check for duplicate team name within business
    if (name && businessId) {
      const existingTeam = await Team.findOne({ businessId, name, _id: { $ne: id } });
      if (existingTeam) {
        return res.status(400).json({ message: `Team '${name}' already exists for this business` });
      }
    } else if (name) {
      const team = await Team.findById(id);
      if (team) {
        const existingTeam = await Team.findOne({ businessId: team.businessId, name, _id: { $ne: id } });
        if (existingTeam) {
          return res.status(400).json({ message: `Team '${name}' already exists for this business` });
        }
      }
    }

    // Update team
    const team = await Team.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    ).populate('businessId', 'name');

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    res.json(team);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a team
exports.deleteTeam = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid team ID' });
    }

    // Find and delete team
    const team = await Team.findByIdAndDelete(id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    res.json({ message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};