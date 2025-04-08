const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Nullable for group chats
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }, // Nullable for direct chats
  messageContent: { type: String, required: true },
  sentAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatMessage', chatMessageSchema);