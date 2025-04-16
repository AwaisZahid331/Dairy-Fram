const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Null for group chat
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }, // Null for direct chat
  content: { type: String }, // Not required if attachment is provided
  attachment: { type: String }, // File path, e.g., uploads/filename.jpg
  type: { type: String, enum: ['one-to-one', 'group'], required: true },
  sentAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatMessage', chatMessageSchema);