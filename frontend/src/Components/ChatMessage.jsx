import React from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  TextField, 
  IconButton, 
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  Paper,
  Chip
} from '@mui/material';
import { 
  Search as SearchIcon, 
  MoreVert as MoreVertIcon,
  Notifications as NotificationsIcon,
  Chat as ChatIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  GridOn as GridOnIcon,
  Edit as EditIcon,
  Send as SendIcon,
  ArrowBack as ArrowBackIcon,
  FileCopy as FileCopyIcon,
  Visibility as VisibilityIcon,
  Mic as MicIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import Sidebar from "./Sidebar";

// Sample data for messages
const messages = [
  {
    id: 1,
    user: 'Sarah A.',
    avatarInitial: 'SA',
    avatarColor: '#FF6F61',
    message: 'Hey! I need to update the wireframes for the CRM module today.',
    timestamp: 'Today, 09:20 AM',
    isCurrentUser: false,
  },
  {
    id: 2,
    user: 'Ali (Team Lead)',
    avatarInitial: 'AA',
    avatarColor: '#FFAB40',
    message: 'Working on it, Sarah - do you want separate pages for the Orders and Khata, or a combined view?',
    timestamp: 'Today, 09:22 AM',
    isCurrentUser: false,
  },
  {
    id: 3,
    user: 'You (Designer)',
    avatarInitial: 'HB',
    avatarColor: '#FFD740',
    message: "Here's the updated dashboard wireframe for review. Let me know if you need any changes! (Dashboard_v2.png) 22 KB",
    timestamp: 'Today, 09:24 AM',
    isCurrentUser: true,
  },
];

// Sample data for Inbox users with dummy avatars
const inboxUsers = [
  {
    name: 'Zaka Dairy Farm',
    badgeCount: 4,
    avatar: 'https://via.placeholder.com/40', // Dummy image URL
  },
  {
    name: 'Pixel Bits',
    badgeCount: 0,
    avatar: 'https://via.placeholder.com/40', // Dummy image URL
    selected: true,
  },
  {
    name: 'Community Solutions',
    badgeCount: 0,
    avatar: 'https://via.placeholder.com/40', // Dummy image URL
  },
  {
    name: 'Developer',
    badgeCount: 1,
    avatar: 'https://via.placeholder.com/40', // Dummy image URL
  },
];

const ChatMessage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh', // Full viewport height
        overflow: 'hidden', // Prevent page-level scrollbar
        padding: '90px', // Reduced padding to allow more space for the Chat Window
        boxSizing: 'border-box', // Include padding in the height calculation
        backgroundColor: '#F5F7FA', // Background color to match the image
      }}
    >
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Container */}
      <Box
        sx={{
          flex: 1, // Take up remaining space after the sidebar
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden', // Prevent scrollbar on this container
        }}
      >
        {/* Chat Heading */}
        <Box sx={{ px: 2, py: 1 }}>
          <Typography
            variant="h1"
            sx={{
              color: 'black',
              fontSize: '2rem',
              fontWeight: 'bold',
            }}
          >
            Chat
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#B0BEC5',
              mt: 0.5,
            }}
          >
            Home / Chat
          </Typography>
        </Box>

        {/* Main Content */}
        <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Teams Column */}
          <Box
            sx={{
              width: 250,
              borderRight: '1px solid #E0E0E0',
              backgroundColor: 'white',
              borderRadius: '8px',
              mr: 1,
              height: '100%', // Take full height
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                px: 2,
                py: 1.5,
                fontWeight: 'bold',
                fontSize: '1.1rem',
                color: '#212121',
              }}
            >
              Teams
            </Typography>
            
            <List sx={{ px: 0 }}>
              {/* Direct Messages Section */}
              <ListItem sx={{ px: 2, py: 1 }}>
                <ListItemIcon>
                  <PersonIcon sx={{ color: '#B0BEC5' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Direct Messages"
                  primaryTypographyProps={{ fontSize: '0.9rem' }}
                />
              </ListItem>
              
              {/* Groups Channels Section */}
              <ListItem sx={{ px: 2, py: 1 }}>
                <ListItemIcon>
                  <GroupIcon sx={{ color: '#B0BEC5' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Groups Channels"
                  primaryTypographyProps={{ fontSize: '0.9rem' }}
                />
              </ListItem>
            </List>
          </Box>

          {/* Inbox Column */}
          <Box
            sx={{
              width: 250,
              borderRight: '1px solid #E0E0E0',
              backgroundColor: 'white',
              borderRadius: '8px',
              mr: 1,
              height: '100%', // Take full height
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                px: 2,
                py: 1.5,
                fontWeight: 'bold',
                fontSize: '1.1rem',
                color: '#212121',
              }}
            >
              Inbox
            </Typography>
            
            <List sx={{ px: 1 }}>
              {inboxUsers.map((user, index) => (
                <ListItem
                  key={index}
                  sx={{
                    px: 2,
                    py: 1,
                    mb: 1,
                    border: '1px solid #E0E0E0',
                    borderRadius: '8px',
                    bgcolor: user.selected ? '#E3F2FD' : 'white',
                    '&:hover': {
                      bgcolor: user.selected ? '#E3F2FD' : '#F5F7FA',
                      cursor: 'pointer',
                    },
                    transition: 'background-color 0.2s',
                  }}
                >
                  <ListItemIcon>
                    <Badge badgeContent={user.badgeCount} color="error">
                      <Avatar
                        src={user.avatar}
                        sx={{
                          width: 36,
                          height: 36,
                          bgcolor: '#8BD4E7', // Set background color for avatars
                        }}
                      >
                        {/* Fallback to initials if image fails to load */}
                        {user.name.charAt(0)}
                      </Avatar>
                    </Badge>
                  </ListItemIcon>
                  <ListItemText
                    primary={user.name}
                    primaryTypographyProps={{
                      fontSize: '0.9rem',
                      fontWeight: user.selected ? 'bold' : 'normal',
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Chat Window */}
          <Box
            sx={{
              flex: 2, // Increased flex to make the Chat Window wider
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid #CACACA',
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: '#F5F7FA',
              minWidth: '600px', // Set a minimum width to ensure it’s wider
            }}
          >
            {/* Chat Header */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2.5,
                backgroundColor: 'white',
                borderBottom: '1px solid #E0E0E0',
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                  }}
                >
                  Pixel Bits
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    ml: 1,
                    color: '#B0BEC5',
                    fontSize: '0.9rem',
                  }}
                >
                  [5 Members]
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <IconButton>
                  <VisibilityIcon sx={{ color: '#B0BEC5', fontSize: '1.5rem' }} />
                </IconButton>
                <IconButton>
                  <MicIcon sx={{ color: '#B0BEC5', fontSize: '1.5rem' }} />
                </IconButton>
                <IconButton>
                  <ArrowForwardIcon sx={{ color: '#B0BEC5', fontSize: '1.5rem' }} />
                </IconButton>
              </Box>
            </Box>

            {/* Message List */}
            <Box
              sx={{
                flex: 1,
                overflowY: 'auto', // Allow scrolling only in the message list
                p: 2,
                backgroundColor: 'white',
              }}
            >
              <Stack spacing={3}>
                {messages.map((msg) => (
                  <Box
                    key={msg.id}
                    sx={{
                      display: 'flex',
                      justifyContent: msg.isCurrentUser ? 'flex-end' : 'flex-start',
                      width: '100%',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        maxWidth: '70%',
                        flexDirection: msg.isCurrentUser ? 'row-reverse' : 'row',
                      }}
                    >
                      {/* Avatar */}
                      {!msg.isCurrentUser && (
                        <Avatar
                          sx={{
                            bgcolor: msg.avatarColor,
                            width: 40,
                            height: 40,
                            mr: 1.5,
                            ml: 0,
                            fontSize: '1rem',
                          }}
                        >
                          {msg.avatarInitial}
                        </Avatar>
                      )}

                      {/* Message Content */}
                      <Box>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: msg.isCurrentUser ? 'flex-end' : 'flex-start',
                            mb: 0.5,
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 'bold',
                              fontSize: '0.9rem',
                              mr: msg.isCurrentUser ? 0 : 1,
                              ml: msg.isCurrentUser ? 1 : 0,
                            }}
                          >
                            {msg.user}
                          </Typography>
                          <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.7rem' }}>
                            {msg.timestamp}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            bgcolor: msg.isCurrentUser ? '#E3F2FD' : 'white',
                            p: 1.5,
                            borderRadius: '12px',
                            boxShadow: 'none',
                            border: msg.isCurrentUser ? 'none' : '1px solid #E0E0E0',
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: '0.9rem',
                              color: '#212121',
                              wordBreak: 'break-word',
                            }}
                          >
                            {msg.message}
                          </Typography>
                        </Box>
                      </Box>

                      {msg.isCurrentUser && (
                        <Avatar
                          sx={{
                            bgcolor: msg.avatarColor,
                            width: 40,
                            height: 40,
                            ml: 1.5,
                            mr: 0,
                            fontSize: '1rem',
                          }}
                        >
                          {msg.avatarInitial}
                        </Avatar>
                      )}
                    </Box>
                  </Box>
                ))}
              </Stack>

              {/* Typing Indicator */}
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                <Typography variant="caption" sx={{ color: '#B0BEC5' }}>
                  <Chip 
                    label="Noor is typing..." 
                    size="small" 
                    sx={{ 
                      backgroundColor: '#F5F7FA',
                      color: '#B0BEC5',
                      fontWeight: 'normal',
                      fontSize: '0.8rem',
                    }} 
                  />
                </Typography>
              </Box>
            </Box>

            {/* Message Input */}
            <Box
              sx={{
                p: 1.5,
                backgroundColor: 'white',
                borderTop: '1px solid #E0E0E0',
                borderBottomLeftRadius: '16px',
                borderBottomRightRadius: '16px',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton sx={{ mr: 1 }}>
                  <EditIcon sx={{ color: '#B0BEC5', fontSize: '1.2rem' }} />
                </IconButton>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Type your message..."
                  size="small"
                  sx={{
                    backgroundColor: '#F5F7FA',
                    borderRadius: '20px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
                      },
                      '&:hover fieldset': {
                        border: 'none',
                      },
                      '&.Mui-focused fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiInputBase-input': {
                      fontSize: '0.9rem',
                      padding: '8px 12px',
                    },
                  }}
                />
                <IconButton color="primary" sx={{ ml: 1 }}>
                  <SendIcon sx={{ fontSize: '1.2rem' }} />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatMessage;