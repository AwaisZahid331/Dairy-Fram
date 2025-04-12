import React from 'react';
import { Box, Typography, Tabs, Tab, Table, TableHead, TableBody, TableRow, TableCell, Chip, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';

const MemberRoles = () => {
  // Data for Members & Roles table
  const membersData = [
    {
      name: 'ZA',
      fullName: 'Zia ud din',
      email: 'ziauddin@emailinator.com',
      role: 'Super Admin',
      roleColor: '#AB47BC',
      team: '-',
      status: 'ACTIVE',
      statusColor: '#4CAF50',
      actions: [],
    },
    {
      name: 'AS',
      fullName: 'Ahmed Safdar',
      email: 'ahmedsafdar@emailinator.com',
      role: 'Admin',
      roleColor: '#1976D2',
      team: 'Haji Zaka Team',
      status: 'PENDING',
      statusColor: '#F44336',
      actions: ['Change Role', 'Remove'],
    },
    {
      name: 'HA',
      fullName: 'Huzafa Ameer',
      email: 'huzafaameer@emailinator.com',
      role: 'Client',
      roleColor: '#FFB300',
      team: 'Sales Team',
      status: 'ACTIVE',
      statusColor: '#4CAF50',
      actions: ['Remove', 'Resend Invite'],
    },
  ];

  // Handle actions
  const handleChangeRole = (email) => {
    console.log(`Change role for ${email}`);
  };

  const handleRemove = (email) => {
    console.log(`Remove user ${email}`);
  };

  const handleResendInvite = (email) => {
    console.log(`Resend invite to ${email}`);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          marginLeft: { xs: '0px', md: '100px' },
          marginTop: { xs: '60px', md: '80px' },
          padding: { xs: '10px', sm: '20px', md: '50px' },
          backgroundColor: '#F5F7FA',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h1"
            sx={{
              color: 'black',
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontWeight: 'bold',
            }}
          >
            Settings
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'black',
              mt: 0.5,
              fontSize: { xs: '0.8rem', md: '0.875rem' },
            }}
          >
            <Link
              to="/"
              style={{
                color: 'black',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Home
            </Link>{' '}
            /{' '}
            <Link
              to="/group/zaka-dairy-farm"
              style={{
                color: 'black',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Zaka Dairy Farm
            </Link>{' '}
            /{' '}
            <span style={{ color: 'black' }}>Settings</span>
          </Typography>
        </Box>

        {/* Tabs */}
        <Tabs
          value={1} // Members & Roles tab is active
          sx={{
            mb: 3,
            '& .MuiTabs-indicator': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <Tab
            label="General Info"
            component={Link}
            to="/settings"
            sx={{
              textTransform: 'none',
              fontSize: { xs: '0.9rem', md: '1rem' },
              fontWeight: 'normal',
              color: '#B0BEC5',
              backgroundColor: 'transparent',
              borderRadius: '24px',
              padding: '6px 16px',
              border: '1px solid #000000',
              marginRight: '8px',
              '&:hover': {
                backgroundColor: '#E0E0E0',
              },
            }}
          />
          <Tab
            label="Members & Roles"
            sx={{
              textTransform: 'none',
              fontSize: { xs: '0.9rem', md: '1rem' },
              fontWeight: 'bold',
              color: 'black',
              backgroundColor: '#8BD4E7',
              borderRadius: '24px',
              padding: '6px 16px',
              border: '1px solid #000000',
              marginRight: '8px',
              '&:hover': {
                backgroundColor: '#8BD4E7',
              },
              '&.Mui-selected': {
                color: 'black',
              },
            }}
          />
          {['Notifications', 'Permissions', 'Danger Zone'].map((label, index) => (
            <Tab
              key={label}
              label={label}
              sx={{
                textTransform: 'none',
                fontSize: { xs: '0.9rem', md: '1rem' },
                fontWeight: 'normal',
                color: '#B0BEC5',
                backgroundColor: 'transparent',
                borderRadius: '24px',
                padding: '6px 16px',
                border: '1px solid #000000',
                marginRight: '8px',
                '&:hover': {
                  backgroundColor: '#E0E0E0',
                },
              }}
            />
          ))}
        </Tabs>

        {/* Members & Roles Table */}
        <Box
          sx={{
            backgroundColor: '#FFFFFF',
            border: '2px solid #8BD4E7',
            borderRadius: '12px',
            p: 2,
            width: { xs: '100%', md: '1450px' },
            mx: 0,
            mt: 2,
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                {['Name', 'Email', 'Role', 'Team(s)', 'Status', 'Actions'].map((header) => (
                  <TableCell
                    key={header}
                    sx={{
                      backgroundColor: '#8BD4E7',
                      fontWeight: 'bold',
                      fontSize: { xs: '0.9rem', md: '1rem' },
                      color: 'black',
                      borderBottom: '1px solid #CACACA',
                      padding: '10px',
                      textAlign: header === 'Actions' ? 'center' : 'left',
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {membersData.map((member, index) => (
                <TableRow key={index}>
                  {/* Name */}
                  <TableCell sx={{ padding: '10px', borderBottom: '1px solid #CACACA' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          backgroundColor: '#E0E0E0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.9rem',
                          fontWeight: 'bold',
                          color: 'black',
                          mr: 1,
                        }}
                      >
                        {member.name}
                      </Box>
                      <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                        {member.fullName}
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* Email */}
                  <TableCell sx={{ padding: '10px', borderBottom: '1px solid #CACACA' }}>
                    <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                      {member.email}
                    </Typography>
                  </TableCell>

                  {/* Role */}
                  <TableCell sx={{ padding: '10px', borderBottom: '1px solid #CACACA' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: member.roleColor,
                          mr: 1,
                        }}
                      />
                      <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                        {member.role}
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* Team(s) */}
                  <TableCell sx={{ padding: '10px', borderBottom: '1px solid #CACACA' }}>
                    <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                      {member.team}
                    </Typography>
                  </TableCell>

                  {/* Status */}
                  <TableCell sx={{ padding: '10px', borderBottom: '1px solid #CACACA' }}>
                    <Chip
                      label={member.status}
                      sx={{
                        backgroundColor: member.statusColor,
                        color: 'white',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        borderRadius: '12px',
                        height: '24px',
                      }}
                    />
                  </TableCell>

                  {/* Actions */}
                  <TableCell sx={{ padding: '10px', borderBottom: '1px solid #CACACA', textAlign: 'center' }}>
                    {member.actions.length > 0 ? (
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        {member.actions.includes('Change Role') && (
                          <IconButton onClick={() => handleChangeRole(member.email)}>
                            <ChangeCircleIcon sx={{ fontSize: '1.2rem', color: '#1976D2' }} />
                          </IconButton>
                        )}
                        {member.actions.includes('Remove') && (
                          <IconButton onClick={() => handleRemove(member.email)}>
                            <DeleteIcon sx={{ fontSize: '1.2rem', color: '#F44336' }} />
                          </IconButton>
                        )}
                        {member.actions.includes('Resend Invite') && (
                          <IconButton onClick={() => handleResendInvite(member.email)}>
                            <ReplayIcon sx={{ fontSize: '1.2rem', color: '#4CAF50' }} />
                          </IconButton>
                        )}
                      </Box>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
};

export default MemberRoles;