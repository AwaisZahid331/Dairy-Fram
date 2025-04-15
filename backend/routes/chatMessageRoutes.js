const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authCheck');
const {
  sendMessage,
  getMessages,
  deleteMessage,
} = require('../controllers/chatMessageController');

// Debug: Log middleware and controllers to verify
console.log('auth:', typeof auth);
console.log('sendMessage:', typeof sendMessage);
console.log('getMessages:', typeof getMessages);
console.log('deleteMessage:', typeof deleteMessage);

// @route   POST /api/chat-messages
// @desc    Send a new chat message
// @access  Private
router.post('/', auth, sendMessage);

// @route   GET /api/chat-messages
// @desc    Get chat messages (filter by businessId, teamId, or receiverId)
// @access  Private
router.get('/', auth, getMessages);

// @route   DELETE /api/chat-messages/:id
// @desc    Delete a chat message
// @access  Private
router.delete('/:id', auth, deleteMessage);

module.exports = router;