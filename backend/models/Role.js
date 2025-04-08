const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  roleName: { 
    type: String, 
    enum: ['Super Admin', 'Admin', 'Partner', 'Manager', 'Employee', 'Client', 'Team Lead', 'Team Member', 'Tester'], 
    required: true 
  },
  scope: { type: String, enum: ['business', 'team', 'project'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update timestamp on save
roleSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Role', roleSchema);