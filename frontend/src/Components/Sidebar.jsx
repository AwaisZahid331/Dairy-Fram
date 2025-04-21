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
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Top Navbar */}
      <Box
        sx={{
          width: "100%",
          height: { xs: "56px", sm: "64px", md: "80px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: { xs: "0 8px", sm: "0 16px", md: "0 30px" },
          bgcolor: "white",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1200,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, md: 1 } }}>
          <Box
            sx={{
              width: { xs: "32px", sm: "40px", md: "55px" },
              height: { xs: "32px", sm: "40px", md: "55px" },
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img 
              src={logo} 
              alt="Logo" 
              style={{ width: "100%", height: "100%", objectFit: "contain" }} 
            />
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
          }}
        >
          <TextField
            placeholder="Search"
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: (
                <Box
                  sx={{
                    backgroundColor: "#8BD4E7",
                    borderRadius: "50%",
                    padding: { xs: "4px", md: "6px" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Search sx={{ color: "black", fontSize: { xs: "20px", md: "24px" } }} />
                </Box>
              ),
            }}
            sx={{
              width: { sm: "250px", md: "400px" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#E5E7EB", borderRadius: "50px" },
                "&:hover fieldset": { borderColor: "#D1D5DB" },
                "&.Mui-focused fieldset": { borderColor: "#3B82F6" },
                height: { xs: "40px", md: "48px" },
                borderRadius: "50px",
              },
              "& .MuiInputBase-input": {
                padding: { xs: "8px 12px", md: "10px 14px" },
                fontSize: { xs: "0.85rem", md: "1rem" },
              },
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, sm: 1, md: 1.5 },
            marginRight: { xs: "8px", sm: "12px", md: "16px" }, // Increased margin-right
          }}
        >
          <IconButton onClick={handleChatClick} sx={{ padding: "4px" }}>
            <Badge badgeContent={notifications.length} color="error">
              <Chat sx={{ color: "#9CA3AF", fontSize: { xs: "20px", md: "24px" } }} />
            </Badge>
          </IconButton>

          <Menu
            anchorEl={chatAnchorEl}
            open={Boolean(chatAnchorEl)}
            onClose={handleClose}
            PaperProps={{ 
              sx: { 
                maxHeight: "300px", 
                width: { xs: "90vw", sm: "300px", md: "320px" }, 
                maxWidth: "320px",
                borderRadius: "12px", 
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)", 
                bgcolor: "#fff" 
              } 
            }}
          >
            {notifications.length === 0 ? (
              <MenuItem sx={{ justifyContent: "center", color: "#666", fontStyle: "italic", fontSize: { xs: "0.8rem", md: "0.9rem" } }}>
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
                    display: "flex", 
                    alignItems: "center", 
                    gap: 1, 
                    py: 1, 
                    px: 1.5, 
                    borderBottom: index < notifications.length - 1 ? "1px solid #eee" : "none",
                    "&:hover": { bgcolor: "#f5f7fa" }
                  }}
                >
                  <Avatar 
                    src={notif.avatar} 
                    sx={{ 
                      width: { xs: 28, md: 32 }, 
                      height: { xs: 28, md: 32 }, 
                      border: "2px solid #8BD4E7" 
                    }} 
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: "bold", 
                        color: "#333", 
                        fontSize: { xs: "0.85rem", md: "0.95rem" } 
                      }}
                    >
                      {notif.sender}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: "#555", 
                        fontSize: { xs: "0.8rem", md: "0.9rem" } 
                      }}
                    >
                      {notif.type === "Direct Messages" 
                        ? notif.message.substring(0, 20) + "..." 
                        : `${notif.chatName} - ${notif.message.substring(0, 15)}...`}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: "#888", 
                        fontSize: { xs: "0.65rem", md: "0.75rem" }, 
                        display: "block", 
                        mt: 0.5 
                      }}
                    >
                      {notif.type === "Direct Messages" ? "Direct Message" : "Group Chat"} • {timeAgo(notif.timestamp)}
                    </Typography>
                  </Box>
                </MenuItem>
              ))
            )}
          </Menu>

          <IconButton onClick={handleNotificationClick} sx={{ padding: "4px" }}>
            <Badge badgeContent={notifications.length} color="error">
              <Notifications
                sx={{
                  color: "#9CA3AF",
                  fontSize: { xs: "20px", md: "24px" },
                  border: "1px solid #28272F",
                  borderRadius: "8px",
                  p: "2px",
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
                maxHeight: "300px", 
                width: { xs: "90vw", sm: "320px", md: "350px" }, 
                maxWidth: "350px",
                borderRadius: "12px", 
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)", 
                bgcolor: "#fff" 
              } 
            }}
          >
            {notifications.length === 0 ? (
              <MenuItem sx={{ justifyContent: "center", color: "#666", fontStyle: "italic", fontSize: { xs: "0.8rem", md: "0.9rem" } }}>
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
                    display: "flex", 
                    alignItems: "center", 
                    gap: 1, 
                    py: 1, 
                    px: 1.5, 
                    borderBottom: index < notifications.length - 1 ? "1px solid #eee" : "none",
                    "&:hover": { bgcolor: "#f5f7fa" }
                  }}
                >
                  <Avatar 
                    src={notif.avatar} 
                    sx={{ 
                      width: { xs: 28, md: 32 }, 
                      height: { xs: 28, md: 32 }, 
                      border: "2px solid #8BD4E7" 
                    }} 
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: "500", 
                        color: "#333", 
                        fontSize: { xs: "0.85rem", md: "0.95rem" } 
                      }}
                    >
                      {notif.action}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: "#555", 
                        fontSize: { xs: "0.8rem", md: "0.9rem" }, 
                        mt: 0.25 
                      }}
                    >
                      {notif.chatName}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: "#888", 
                        fontSize: { xs: "0.65rem", md: "0.75rem" }, 
                        display: "block", 
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
                gap: 0.5,
                border: "1px solid #E5E7EB",
                borderRadius: "16px",
                padding: { xs: "4px", md: "6px" },
              }}
            >
              <Avatar
                sx={{ width: { xs: "20px", sm: "24px", md: "32px" }, height: { xs: "20px", sm: "24px", md: "32px" } }}
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="Profile"
              />
              <Box sx={{ display: { xs: "none", sm: "flex" }, flexDirection: "column" }}>
                <Typography sx={{ color: "#1F2937", fontSize: { xs: "0.75rem", md: "0.875rem" }, fontWeight: "500" }}>
                  Motive N.
                </Typography>
                <Typography sx={{ color: "#9CA3AF", fontSize: { xs: "0.65rem", md: "0.75rem" } }}>
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
          height: { xs: "auto", md: "100vh" },
          position: "fixed",
          top: { xs: "50%", md: 0 },
          transform: { xs: "translateY(-50%)", md: "none" },
          left: 0,
          zIndex: 1100,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: { xs: "center", md: "flex-start" },
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            marginTop: { xs: "0", md: "100px" },
            width: { xs: "60px", sm: "70px", md: "80px" },
            maxHeight: { xs: "50vh", md: "70vh" }, // Increased height on mobile
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: { xs: "8px 0", sm: "10px 0", md: "12px 0" }, // Adjusted padding
            bgcolor: "white",
            boxShadow: "2px 0 5px rgba(0, 0, 0, 0.12)",
            borderRadius: "30px",
            overflow: "hidden",
          }}
        >
          <Link to="/dashboard">
            <IconButton
              sx={{
                borderRadius: "50%",
                bgcolor: location.pathname === "/dashboard" ? "#8BD4E7" : "transparent",
                mb: { xs: 0.5, md: 1 },
                p: { xs: "6px", md: "8px" },
              }}
            >
              <Dashboard sx={{ fontSize: { xs: "20px", md: "28px" }, color: location.pathname === "/dashboard" ? "black" : "#9CA3AF" }} />
            </IconButton>
          </Link>

          <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 0.5, md: 1 } }}>
            <Link to="/members">
              <IconButton
                sx={{
                  bgcolor: location.pathname === "/members" ? "#8BD4E7" : "transparent",
                  borderRadius: "50%",
                  p: { xs: "6px", md: "8px" },
                }}
              >
                <People sx={{ fontSize: { xs: "20px", md: "28px" }, color: location.pathname === "/members" ? "black" : "#9CA3AF" }} />
              </IconButton>
            </Link>
            <Link to="/groupmembers">
              <IconButton
                sx={{
                  bgcolor: location.pathname === "/groupmembers" ? "#8BD4E7" : "transparent",
                  borderRadius: "50%",
                  p: { xs: "6px", md: "8px" },
                }}
              >
                <GroupsIcon sx={{ fontSize: { xs: "20px", md: "28px" }, color: location.pathname === "/groupmembers" ? "black" : "#9CA3AF" }} />
              </IconButton>
            </Link>
            <Link to="/frammembers">
              <IconButton
                sx={{
                  bgcolor: location.pathname === "/frammembers" ? "#8BD4E7" : "transparent",
                  borderRadius: "50%",
                  p: { xs: "6px", md: "8px" },
                }}
              >
                <Work sx={{ fontSize: { xs: "20px", md: "28px" }, color: location.pathname === "/frammembers" ? "black" : "#9CA3AF" }} />
              </IconButton>
            </Link>
            <Link to="/chatmessage">
              <IconButton
                sx={{
                  bgcolor: location.pathname === "/chatmessage" ? "#8BD4E7" : "transparent",
                  borderRadius: "50%",
                  p: { xs: "6px", md: "8px" },
                }}
              >
                <Badge badgeContent={notifications.length} color="error">
                  <Chat sx={{ fontSize: { xs: "20px", md: "28px" }, color: location.pathname === "/chatmessage" ? "black" : "#9CA3AF" }} />
                </Badge>
              </IconButton>
            </Link>
            <Link to="/settings">
              <IconButton
                sx={{
                  bgcolor: location.pathname === "/settings" ? "#8BD4E7" : "transparent",
                  borderRadius: "50%",
                  p: { xs: "6px", md: "8px" },
                }}
              >
                <Settings sx={{ fontSize: { xs: "20px", md: "28px" }, color: location.pathname === "/settings" ? "black" : "#9CA3AF" }} />
              </IconButton>
            </Link>
          </Box>
        </Box>

        <Link to="/loginPage">
          <IconButton sx={{ mt: { xs: 1, md: 2 } }}>
            <Box
              sx={{
                width: { xs: "30px", sm: "40px", md: "50px" },
                height: { xs: "30px", sm: "40px", md: "50px" },
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #C2BDBD",
              }}
            >
              <ExitToApp sx={{ color: "#EF4444", fontSize: { xs: "20px", md: "28px" } }} />
            </Box>
          </IconButton>
        </Link>
      </Box>
    </Box>
  );
};

export default Sidebar;