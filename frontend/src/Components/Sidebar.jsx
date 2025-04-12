import React, { useState } from "react";
import { Box, IconButton, Typography, TextField, Avatar, Badge, Menu, MenuItem } from "@mui/material";
import { Dashboard, People, Work, Chat, Settings, ExitToApp, Search, Notifications, ArrowDropDown } from "@mui/icons-material";
import GroupsIcon from '@mui/icons-material/Groups';
import { Link, useLocation } from "react-router-dom"; 
import logo from '../assets/logo.png'; 

const Sidebar = ({ notifications = [], onNotificationClick }) => {
  const location = useLocation(); 
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [chatAnchorEl, setChatAnchorEl] = useState(null);

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleChatClick = (event) => {
    setChatAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setNotificationAnchorEl(null);
    setChatAnchorEl(null);
  };

  // Function to calculate time ago
  const timeAgo = (timestamp) => {
    const now = new Date();
    const diffMs = now - new Date(timestamp);
    const diffMins = Math.floor(diffMs / (1000 * 60));
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} mins ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      {/* Top Navbar */}
      <Box
        sx={{
          width: "100%",
          height: { xs: "60px", md: "80px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: { xs: "0 10px", md: "0 30px" },
          bgcolor: "white",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: { xs: "40px", md: "55px" },
              height: { xs: "40px", md: "55px" },
              marginLeft: "-12px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img 
              src={logo} 
              alt="Logo" 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
            />
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: { xs: "none", sm: "none", md: "flex" },
            justifyContent: "center",
          }}
        >
          <TextField
            placeholder="Search"
            variant="outlined"
            size="large"
            InputProps={{
              endAdornment: (
                <Box
                  sx={{
                    backgroundColor: "#8BD4E7",
                    borderRadius: "50%",
                    padding: { xs: "6px", md: "8px" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    marginLeft: "15px",
                  }}
                >
                  <Search sx={{ color: "black", fontSize: { xs: "24px", md: "30px" } }} />
                </Box>
              ),
            }}
            sx={{
              width: { sm: "300px", md: "450px" },
              marginTop: "11px",
              marginLeft: { sm: "50px", md: "150px" },
              backgroundColor: "#FFFFFF",
              borderRadius: "50px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#E5E7EB", borderRadius: "50px" },
                "&:hover fieldset": { borderColor: "#D1D5DB", borderRadius: "50px" },
                "&.Mui-focused fieldset": { borderColor: "#3B82F6", borderRadius: "50px" },
                height: { xs: "50px", md: "60px" },
                borderRadius: "50px",
              },
              "& .MuiInputBase-input": {
                padding: { xs: "8px 12px", md: "12px 16px" },
                fontSize: { xs: "14px", md: "17px" },
              },
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, md: 2 },
            marginRight: { xs: "10px", md: "50px" },
          }}
        >
          <IconButton onClick={handleChatClick} sx={{ border: "1px solid #E5E7EB", borderRadius: "50%", padding: "6px" }}>
            <Badge badgeContent={notifications.length} color="error">
              <Chat sx={{ color: "#9CA3AF", fontSize: { xs: "1.2rem", md: "1.5rem" } }} />
            </Badge>
          </IconButton>

          <Menu
            anchorEl={chatAnchorEl}
            open={Boolean(chatAnchorEl)}
            onClose={handleClose}
            PaperProps={{ 
              sx: { 
                maxHeight: '300px', 
                width: '320px', 
                borderRadius: '12px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)', 
                bgcolor: '#fff' 
              } 
            }}
          >
            {notifications.length === 0 ? (
              <MenuItem sx={{ justifyContent: 'center', color: '#666', fontStyle: 'italic' }}>
                No new messages
              </MenuItem>
            ) : (
              notifications.map((notif, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    onNotificationClick(notif.chatName, notif.type);
                    handleClose();
                  }}
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1.5, 
                    py: 1.5, 
                    px: 2, 
                    borderBottom: index < notifications.length - 1 ? '1px solid #eee' : 'none',
                    '&:hover': { bgcolor: '#f5f7fa' }
                  }}
                >
                  <Avatar 
                    src={notif.avatar} 
                    sx={{ 
                      width: 32, 
                      height: 32, 
                      border: '2px solid #8BD4E7' 
                    }} 
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 'bold', 
                        color: '#333', 
                        fontSize: '0.95rem' 
                      }}
                    >
                      {notif.sender}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#555', 
                        fontSize: '0.9rem' 
                      }}
                    >
                      {notif.type === 'Direct Messages' 
                        ? notif.message.substring(0, 25) + '...' 
                        : `${notif.chatName} - ${notif.message.substring(0, 20)}...`}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: '#888', 
                        fontSize: '0.75rem', 
                        display: 'block', 
                        mt: 0.5 
                      }}
                    >
                      {notif.type === 'Direct Messages' ? 'Direct Message' : 'Group Chat'} • {timeAgo(notif.timestamp)}
                    </Typography>
                  </Box>
                </MenuItem>
              ))
            )}
          </Menu>

          <IconButton onClick={handleNotificationClick} sx={{ padding: "6px" }}>
            <Badge badgeContent={notifications.length} color="error">
              <Notifications
                sx={{
                  color: "#9CA3AF",
                  fontSize: { xs: "1.2rem", md: "1.5rem" },
                  border: "1px solid #28272F",
                  borderRadius: "10px",
                }}
              />
            </Badge>
          </IconButton>

          <Menu
            anchorEl={notificationAnchorEl}
            open={Boolean(notificationAnchorEl)}
            onClose={handleClose}
            PaperProps={{ 
              sx: { 
                maxHeight: '300px', 
                width: '350px', 
                borderRadius: '12px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)', 
                bgcolor: '#fff' 
              } 
            }}
          >
            {notifications.length === 0 ? (
              <MenuItem sx={{ justifyContent: 'center', color: '#666', fontStyle: 'italic' }}>
                No new notifications
              </MenuItem>
            ) : (
              notifications.map((notif, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    onNotificationClick(notif.chatName, notif.type);
                    handleClose();
                  }}
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1.5, 
                    py: 1.5, 
                    px: 2, 
                    borderBottom: index < notifications.length - 1 ? '1px solid #eee' : 'none',
                    '&:hover': { bgcolor: '#f5f7fa' }
                  }}
                >
                  <Avatar 
                    src={notif.avatar} 
                    sx={{ 
                      width: 32, 
                      height: 32, 
                      border: '2px solid #8BD4E7' 
                    }} 
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: '500', 
                        color: '#333', 
                        fontSize: '0.95rem' 
                      }}
                    >
                      {notif.action}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#555', 
                        fontSize: '0.9rem', 
                        mt: 0.25 
                      }}
                    >
                      {notif.chatName}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: '#888', 
                        fontSize: '0.75rem', 
                        display: 'block', 
                        mt: 0.5 
                      }}
                    >
                      {timeAgo(notif.timestamp)}
                    </Typography>
                  </Box>
                </MenuItem>
              ))
            )}
          </Menu>

          <Link to="#">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                border: "1px solid #E5E7EB",
                borderRadius: "20px",
                padding: "6px",
              }}
            >
              <Avatar
                sx={{ width: { xs: "24px", md: "32px" }, height: { xs: "24px", md: "32px" } }}
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="Profile"
              />
              <Box sx={{ display: { xs: "none", sm: "flex" }, flexDirection: "column" }}>
                <Typography sx={{ color: "#1F2937", fontSize: "14px", fontWeight: "500" }}>
                  Motive N.
                </Typography>
                <Typography sx={{ color: "#9CA3AF", fontSize: "12px" }}>
                  @motiveN
                </Typography>
              </Box>
              <ArrowDropDown sx={{ color: "#9CA3AF", fontSize: { xs: "16px", md: "20px" } }} />
            </Box>
          </Link>
        </Box>
      </Box>

      {/* Sidebar Section */}
      <Box
        sx={{
          width: { xs: "70px", sm: "90px", md: "100px" },
          height: "130vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            marginTop: { xs: "70px", md: "180px" },
            width: { xs: "50px", sm: "70px", md: "70px" },
            maxHeight: { xs: "69vh", md: "69vh" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: { xs: "10px 0", md: "7px 0" },
            bgcolor: "white",
            boxShadow: "2px 0 5px rgba(0, 0, 0, 0.12)",
            borderRadius: "30px",
            overflow: "hidden",
          }}
        >
          <Link to="/dashboard">
            <IconButton
              style={{
                borderRadius: "50%",
                backgroundColor: location.pathname === "/dashboard" ? "#8BD4E7" : "transparent",
                marginBottom: "0px",
              }}
            >
              <Dashboard sx={{ fontSize: { xs: "24px", md: "30px" }, color: location.pathname === "/dashboard" ? "black" : "#9CA3AF" }} />
            </IconButton>
          </Link>

          <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 2, md: 2.5 } }}>
            <Link to="/members">
              <IconButton
                style={{
                  backgroundColor: location.pathname === "/members" ? "#8BD4E7" : "transparent",
                  borderRadius: "50%",
                }}
              >
                <People sx={{ fontSize: { xs: "24px", md: "30px" }, color: location.pathname === "/members" ? "black" : "#9CA3AF" }} />
              </IconButton>
            </Link>
            <Link to="/groupmembers">
              <IconButton
                style={{
                  backgroundColor: location.pathname === "/groupmembers" ? "#8BD4E7" : "transparent",
                  borderRadius: "50%",
                }}
              >
                <GroupsIcon sx={{ fontSize: { xs: "24px", md: "30px" }, color: location.pathname === "/groupmembers" ? "black" : "#9CA3AF" }} />
              </IconButton>
            </Link>
            <Link to="/frammembers">
              <IconButton
                style={{
                  backgroundColor: location.pathname === "/frammembers" ? "#8BD4E7" : "transparent",
                  borderRadius: "50%",
                }}
              >
                <Work sx={{ fontSize: { xs: "24px", md: "30px" }, color: location.pathname === "/frammembers" ? "black" : "#9CA3AF" }} />
              </IconButton>
            </Link>
            <Link to="/chatmessage">
              <IconButton
                style={{
                  backgroundColor: location.pathname === "/chatmessage" ? "#8BD4E7" : "transparent",
                  borderRadius: "50%",
                }}
              >
                <Badge badgeContent={notifications.length} color="error">
                  <Chat sx={{ fontSize: { xs: "24px", md: "30px" }, color: location.pathname === "/chatmessage" ? "black" : "#9CA3AF" }} />
                </Badge>
              </IconButton>
            </Link>
            <Link to="/settings">
              <IconButton
                style={{
                  backgroundColor: location.pathname === "/settings" ? "#8BD4E7" : "transparent",
                  borderRadius: "50%",
                }}
              >
                <Settings sx={{ fontSize: { xs: "24px", md: "30px" }, color: location.pathname === "/settings" ? "black" : "#9CA3AF" }} />
              </IconButton>
            </Link>
          </Box>
        </Box>

        <Link to="/loginPage">
          <IconButton>
            <Box
              sx={{
                width: { xs: "25px", md: "50px" },
                height: { xs: "25px", md: "50px" },
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "40px",
                border: "1px solid rgb(194, 189, 189)",
              }}
            >
              <ExitToApp sx={{ color: "#EF4444", fontSize: { xs: "1.8rem", md: "2.2rem" } }} />
            </Box>
          </IconButton>
        </Link>
      </Box>
    </Box>
  );
};

export default Sidebar;