const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true }, // I add this For restrictions
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, //This is Null for group chat
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }, // This is Null for direct chat
  content: { type: String, required: true },
  type: { type: String, enum: ['one-to-one', 'group'], required: true },
  sentAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatMessage', chatMessageSchema);