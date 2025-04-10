const mongoose = require('mongoose');

const rolePermissionSchema = new mongoose.Schema({
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  permissionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Permission', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

rolePermissionSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('RolePermission', rolePermissionSchema);