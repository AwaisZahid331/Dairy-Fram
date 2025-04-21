const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  type: { 
    type: String, 
    enum: ['Factory', 'Shop', 'Dairy Farm', 'School', 'Data Engineer', 'Other'], 
    required: true 
  },
  description: { type: String, required: true, trim: true },
  image: { type: String, required: false }, // Stores file path (e.g., /uploads/logo.png)
  superAdminUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

businessSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Business', businessSchema);