const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use('/api/admin', require('./routes/admin'));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/businesses', require('./routes/businessRoutes'));
app.use('/api/business-memberships', require('./routes/businessMembershipRoutes'));
app.use('/api/teams', require('./routes/teamRoutes')); 
app.use('/api/team-memberships', require('./routes/teamMembershipRoutes'));
app.use('/api/roles', require('./routes/roleRoutes'));
app.use('/api/role-permissions', require('./routes/rolePermissionRoutes'));
app.use('/api/permissions', require('./routes/permissionRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/project-memberships', require('./routes/projectMembershipRoutes'));
app.use('/api/chat-messages', require('./routes/chatMessageRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ✅`);
});