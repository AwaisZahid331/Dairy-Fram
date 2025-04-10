const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Flexible, no enum for scalability
  scope: { type: String, enum: ['business', 'team', 'project'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

roleSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Role', roleSchema);