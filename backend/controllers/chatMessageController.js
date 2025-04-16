const ChatMessage = require('../models/ChatMessage');
const Business = require('../models/Business');
const User = require('../models/User');
const Team = require('../models/Team');
const BusinessMembership = require('../models/BusinessMembership');
const TeamMembership = require('../models/TeamMembership');
const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');

// Send a new chat message
exports.sendMessage = async (req, res) => {
  const { businessId, receiverId, teamId, content, type } = req.body;
  const senderId = req.user.id; // From auth middleware
  const attachment = req.file ? req.file.path : null;

  try {
    // Validate input
    if (!businessId || !type) {
      if (attachment) {
        try {
          await fs.unlink(attachment);
        } catch (err) {
          console.error(`Failed to delete attachment ${attachment}:`, err);
        }
      }
      return res.status(400).json({ message: 'Business ID and type are required' });
    }
    if (!['one-to-one', 'group'].includes(type)) {
      if (attachment) {
        try {
          await fs.unlink(attachment);
        } catch (err) {
          console.error(`Failed to delete attachment ${attachment}:`, err);
        }
      }
      return res.status(400).json({ message: 'Type must be one-to-one or group' });
    }
    if (!content && !attachment) {
      if (attachment) {
        try {
          await fs.unlink(attachment);
        } catch (err) {
          console.error(`Failed to delete attachment ${attachment}:`, err);
        }
      }
      return res.status(400).json({ message: 'Content or attachment is required' });
    }

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(businessId)) {
      if (attachment) {
        try {
          await fs.unlink(attachment);
        } catch (err) {
          console.error(`Failed to delete attachment ${attachment}:`, err);
        }
      }
      return res.status(400).json({ message: 'Invalid business ID' });
    }
    if (!mongoose.Types.ObjectId.isValid(senderId)) {
      if (attachment) {
        try {
          await fs.unlink(attachment);
        } catch (err) {
          console.error(`Failed to delete attachment ${attachment}:`, err);
        }
      }
      return res.status(400).json({ message: 'Invalid sender ID' });
    }

    // Check if business exists
    const business = await Business.findById(businessId);
    if (!business) {
      if (attachment) {
        try {
          await fs.unlink(attachment);
        } catch (err) {
          console.error(`Failed to delete attachment ${attachment}:`, err);
        }
      }
      return res.status(404).json({ message: 'Business not found' });
    }

    // Check if sender is a member of the business
    const senderMembership = await BusinessMembership.findOne({ businessId, userId: senderId });
    if (!senderMembership) {
      if (attachment) {
        try {
          await fs.unlink(attachment);
        } catch (err) {
          console.error(`Failed to delete attachment ${attachment}:`, err);
        }
      }
      return res.status(403).json({ message: 'Sender is not a member of the business' });
    }

    // Handle one-to-one chat
    if (type === 'one-to-one') {
      if (!receiverId) {
        if (attachment) {
          try {
            await fs.unlink(attachment);
          } catch (err) {
            console.error(`Failed to delete attachment ${attachment}:`, err);
          }
        }
        return res.status(400).json({ message: 'Receiver ID is required for one-to-one chat' });
      }
      if (!mongoose.Types.ObjectId.isValid(receiverId)) {
        if (attachment) {
          try {
            await fs.unlink(attachment);
          } catch (err) {
            console.error(`Failed to delete attachment ${attachment}:`, err);
          }
        }
        return res.status(400).json({ message: 'Invalid receiver ID' });
      }
      if (teamId) {
        if (attachment) {
          try {
            await fs.unlink(attachment);
          } catch (err) {
            console.error(`Failed to delete attachment ${attachment}:`, err);
          }
        }
        return res.status(400).json({ message: 'Team ID should be null for one-to-one chat' });
      }

      // Check if receiver exists
      const receiver = await User.findById(receiverId);
      if (!receiver) {
        if (attachment) {
          try {
            await fs.unlink(attachment);
          } catch (err) {
            console.error(`Failed to delete attachment ${attachment}:`, err);
          }
        }
        return res.status(404).json({ message: 'Receiver not found' });
      }

      // Check if receiver is a member of the business
      const receiverMembership = await BusinessMembership.findOne({ businessId, userId: receiverId });
      if (!receiverMembership) {
        if (attachment) {
          try {
            await fs.unlink(attachment);
          } catch (err) {
            console.error(`Failed to delete attachment ${attachment}:`, err);
          }
        }
        return res.status(403).json({ message: 'Receiver is not a member of the business' });
      }
    }

    // Handle group chat
    if (type === 'group') {
      if (!teamId) {
        if (attachment) {
          try {
            await fs.unlink(attachment);
          } catch (err) {
            console.error(`Failed to delete attachment ${attachment}:`, err);
          }
        }
        return res.status(400).json({ message: 'Team ID is required for group chat' });
      }
      if (receiverId) {
        if (attachment) {
          try {
            await fs.unlink(attachment);
          } catch (err) {
            console.error(`Failed to delete attachment ${attachment}:`, err);
          }
        }
        return res.status(400).json({ message: 'Receiver ID should be null for group chat' });
      }
      if (!mongoose.Types.ObjectId.isValid(teamId)) {
        if (attachment) {
          try {
            await fs.unlink(attachment);
          } catch (err) {
            console.error(`Failed to delete attachment ${attachment}:`, err);
          }
        }
        return res.status(400).json({ message: 'Invalid team ID' });
      }

      // Check if team exists and belongs to the business
      const team = await Team.findById(teamId);
      if (!team) {
        if (attachment) {
          try {
            await fs.unlink(attachment);
          } catch (err) {
            console.error(`Failed to delete attachment ${attachment}:`, err);
          }
        }
        return res.status(404).json({ message: 'Team not found' });
      }
      if (team.businessId.toString() !== businessId.toString()) {
        if (attachment) {
          try {
            await fs.unlink(attachment);
          } catch (err) {
            console.error(`Failed to delete attachment ${attachment}:`, err);
          }
        }
        return res.status(400).json({ message: 'Team does not belong to the specified business' });
      }

      // Check if sender is a member of the team
      const teamMembership = await TeamMembership.findOne({ teamId, userId: senderId });
      if (!teamMembership) {
        if (attachment) {
          try {
            await fs.unlink(attachment);
          } catch (err) {
            console.error(`Failed to delete attachment ${attachment}:`, err);
          }
        }
        return res.status(403).json({ message: 'Sender is not a member of the team' });
      }
    }

    // Create and save message
    const message = new ChatMessage({
      businessId,
      senderId,
      receiverId: type === 'one-to-one' ? receiverId : null,
      teamId: type === 'group' ? teamId : null,
      content: content || null,
      attachment,
      type,
    });
    await message.save();

    // Populate references for response
    const populatedMessage = await ChatMessage.findById(message._id)
      .populate('businessId', 'name')
      .populate('senderId', 'fullName email')
      .populate('receiverId', 'fullName email')
      .populate('teamId', 'name');

    res.status(201).json(populatedMessage);
  } catch (error) {
    if (attachment) {
      try {
        await fs.unlink(attachment);
      } catch (err) {
        console.error(`Failed to delete attachment ${attachment}:`, err);
      }
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get chat messages (filter by businessId, teamId, or receiverId)
exports.getMessages = async (req, res) => {
  const userId = req.user.id; // From auth middleware
  const { businessId, teamId, receiverId } = req.query;

  try {
    // Validate input
    if (!businessId) {
      return res.status(400).json({ message: 'Business ID is required' });
    }
    if (!mongoose.Types.ObjectId.isValid(businessId)) {
      return res.status(400).json({ message: 'Invalid business ID' });
    }

    // Check if user is a member of the business
    const businessMembership = await BusinessMembership.findOne({ businessId, userId });
    if (!businessMembership) {
      return res.status(403).json({ message: 'You are not a member of this business' });
    }

    // Build query
    const query = { businessId };
    if (teamId) {
      if (!mongoose.Types.ObjectId.isValid(teamId)) {
        return res.status(400).json({ message: 'Invalid team ID' });
      }
      query.teamId = teamId;
      query.type = 'group';

      // Check if user is a member of the team
      const teamMembership = await TeamMembership.findOne({ teamId, userId });
      if (!teamMembership) {
        return res.status(403).json({ message: 'You are not a member of this team' });
      }
    }
    if (receiverId) {
      if (!mongoose.Types.ObjectId.isValid(receiverId)) {
        return res.status(400).json({ message: 'Invalid receiver ID' });
      }
      query.type = 'one-to-one';
      query.$or = [
        { senderId: userId, receiverId },
        { senderId: receiverId, receiverId: userId },
      ];
    }
    if (!teamId && !receiverId) {
      // Fetch both one-to-one messages involving the user and group messages for teams the user is in
      const userTeams = await TeamMembership.find({ userId }).select('teamId');
      const teamIds = userTeams.map((tm) => tm.teamId);
      query.$or = [
        { type: 'one-to-one', $or: [{ senderId: userId }, { receiverId: userId }] },
        { type: 'group', teamId: { $in: teamIds } },
      ];
    }

    // Fetch messages and populate references
    const messages = await ChatMessage.find(query)
      .populate('businessId', 'name')
      .populate('senderId', 'fullName email')
      .populate('receiverId', 'fullName email')
      .populate('teamId', 'name')
      .sort({ sentAt: -1 }); // Newest first

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a chat message
exports.deleteMessage = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; // From auth middleware

  try {
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid message ID' });
    }

    // Find message
    const message = await ChatMessage.findById(id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Check if user is the sender
    if (message.senderId.toString() !== userId) {
      return res.status(403).json({ message: 'You can only delete your own messages' });
    }

    // Delete attachment file if exists
    if (message.attachment) {
      try {
        await fs.unlink(message.attachment);
      } catch (err) {
        console.error(`Failed to delete attachment ${message.attachment}:`, err);
      }
    }

    // Delete message
    await ChatMessage.findByIdAndDelete(id);

    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all messages within a business
exports.getAllBusinessMessages = async (req, res) => {
  const { businessId } = req.params;
  const userId = req.user.id; // From auth middleware

  try {
    // Validate businessId
    if (!mongoose.Types.ObjectId.isValid(businessId)) {
      return res.status(400).json({ message: 'Invalid business ID' });
    }

    // Check if business exists
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    // Check if user is a member of the business
    const businessMembership = await BusinessMembership.findOne({ businessId, userId });
    if (!businessMembership) {
      return res.status(403).json({ message: 'You are not a member of this business' });
    }

    // Fetch all messages for the business
    const messages = await ChatMessage.find({ businessId })
      .populate('businessId', 'name')
      .populate('senderId', 'fullName email')
      .populate('receiverId', 'fullName email')
      .populate('teamId', 'name')
      .sort({ sentAt: -1 }); // Newest first

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
