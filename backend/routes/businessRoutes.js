const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const {
  createBusiness,
  getBusinesses,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
} = require('../controllers/businessController');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalName)}`);
  },
});

// File filter for images
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalName).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only JPEG and PNG images are allowed'));
  }
};

// Multer upload configuration
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter,
});

// Middleware to check for admin or superadmin role
const isAdminOrSuperadmin = (req, res, next) => {
  if (!req.user || !['admin', 'superadmin'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Admin or superadmin access required' });
  }
  next();
};

// @route   POST /api/businesses
// @desc    Create a new business
// @access  Private (Admin or Superadmin)
router.post('/', auth, isAdminOrSuperadmin, upload.single('image'), createBusiness);

// @route   GET /api/businesses
// @desc    Get all businesses
// @access  Private
router.get('/', auth, getBusinesses);

// @route   GET /api/businesses/:id
// @desc    Get a single business by ID
// @access  Private
router.get('/:id', auth, getBusinessById);

// @route   PUT /api/businesses/:id
// @desc    Update a business
// @access  Private
router.put('/:id', auth, upload.single('image'), updateBusiness);

// @route   DELETE /api/businesses/:id
// @desc    Delete a business
// @access  Private
router.delete('/:id', auth, deleteBusiness);

module.exports = router;