const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authCheck');
const multer = require('multer');
const fs = require('fs').promises;
const path = require('path');
const {
  sendMessage,
  getMessages,
  deleteMessage,
  getAllBusinessMessages,
} = require('../controllers/chatMessageController');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
fs.mkdir(uploadDir, { recursive: true }).catch((err) => {
  console.error('Error creating uploads directory:', err);
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split('.').pop();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
  },
});
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG, JPEG, PNG, and PDF files are allowed'), false);
  }
};
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, 
});

// Debug: Log middleware and controllers to verify
console.log('auth:', typeof auth);
console.log('upload:', typeof upload);
console.log('sendMessage:', typeof sendMessage);
console.log('getMessages:', typeof getMessages);
console.log('deleteMessage:', typeof deleteMessage);
console.log('getAllBusinessMessages:', typeof getAllBusinessMessages);

// @route   POST /api/chat-messages
// @desc    Send a new chat message (with optional file)
// @access  Private
router.post('/', auth, upload.single('attachment'), sendMessage);

// @route   GET /api/chat-messages
// @desc    Get chat messages (filter by businessId, teamId, or receiverId)
// @access  Private
router.get('/', auth, getMessages);

// @route   DELETE /api/chat-messages/:id
// @desc    Delete a chat message
// @access  Private
router.delete('/:id', auth, deleteMessage);

// @route   GET /api/chat-messages/business/:businessId
// @desc    Get all messages within a business
// @access  Private
router.get('/business/:businessId', auth, getAllBusinessMessages);

module.exports = router;