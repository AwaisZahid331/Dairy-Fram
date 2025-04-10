const mongoose = require('mongoose');

const businessMembershipSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  status: { type: String, enum: ['active', 'inactive', 'pending'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

businessMembershipSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('BusinessMembership', businessMembershipSchema);