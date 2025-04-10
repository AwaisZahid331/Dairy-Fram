const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  name: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

milestoneSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Milestone', milestoneSchema);