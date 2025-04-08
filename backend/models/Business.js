const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  businessType: { 
    type: String, 
    enum: ['Factory', 'Shop', 'Dairy Farm', 'School', 'Other'], 
    required: true 
  },
  superAdminUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update timestamp on save
businessSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Business', businessSchema);