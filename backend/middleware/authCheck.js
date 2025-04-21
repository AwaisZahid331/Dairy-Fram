const jwt = require('jsonwebtoken');

// Auth middleware: Verifies JWT token
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// isAdmin middleware: Checks for admin role
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// isAdminOrSuperadmin middleware: Checks for admin or superadmin role
const isAdminOrSuperadmin = (req, res, next) => {
  if (!req.user || !['admin', 'superadmin'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Admin or superadmin access required' });
  }
  next();
};

module.exports = { auth, isAdmin, isAdminOrSuperadmin };