import React from "react";
import { Box, IconButton, Typography, TextField, Avatar } from "@mui/material";
import { Dashboard, People, Work, Chat, Settings, ExitToApp, Search, Notifications, ArrowDropDown } from "@mui/icons-material";
import GroupsIcon from '@mui/icons-material/Groups';
import { Link, useLocation } from "react-router-dom"; 
import logo from '../assets/logo.png'; 

const Sidebar = () => {
  const location = useLocation(); 

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
        {/* Logo on the Left Inside Navbar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: { xs: "40px", md: "55px" },
              height: { xs: "40px", md: "55px" },
              // backgroundColor: "#E0E7FF",
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
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain' 
              }} 
            />
          </Box>
        </Box>

        {/* Centered Search Bar */}
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
                "& fieldset": {
                  borderColor: "#E5E7EB",
                  borderRadius: "50px",
                },
                "&:hover fieldset": {
                  borderColor: "#D1D5DB",
                  borderRadius: "50px",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3B82F6",
                  borderRadius: "50px",
                },
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

        {/* Right Side: Chat, Notification, Profile */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, md: 2 },
            marginRight: { xs: "10px", md: "50px" },
          }}
        >
          <Link to="/#chat">
            <IconButton
              sx={{
                border: "1px solid #E5E7EB",
                borderRadius: "50%",
                padding: "6px",
              }}
            >
              <Chat sx={{ color: "#9CA3AF", fontSize: { xs: "1.2rem", md: "1.5rem" } }} />
            </IconButton>
          </Link>

          <Link to="#">
            <IconButton sx={{ padding: "6px" }}>
              <Notifications
                sx={{
                  color: "#9CA3AF",
                  fontSize: { xs: "1.2rem", md: "1.5rem" },
                  border: "1px solid #28272F",
                  borderRadius: "10px",
                }}
              />
            </IconButton>
          </Link>

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
                sx={{
                  width: { xs: "24px", md: "32px" },
                  height: { xs: "24px", md: "32px" },
                }}
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="Profile"
              />
              <Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                  flexDirection: "column",
                }}
              >
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
          width: { xs: "50px", sm: "60px", md: "80px" },
          height: "100vh",
          padding: "10px",
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
        {/* Sidebar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: { xs: "10px", md: "0" },
          }}
        >
          {/* Logo (Commented out as per your code) */}
        </Box>
        <Box
          sx={{
            marginTop: { xs: "70px", md: "100px" },
            width: { xs: "40px", sm: "50px", md: "60px" },
            maxHeight: { xs: "50vh", md: "55vh" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: { xs: "15px 0", md: "20px 0" },
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
                marginBottom: "15px",
              }}
            >
              <Dashboard sx={{ fontSize: { xs: "18px", md: "20px" }, color: location.pathname === "/dashboard" ? "black" : "#9CA3AF" }} />
            </IconButton>
          </Link>

          <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1.5, md: 2 } }}>
            <Link to="/members">
              <IconButton
                style={{
                  backgroundColor: location.pathname === "/members" ? "#8BD4E7" : "transparent",
                  borderRadius: "50%",
                }}
              >
                <People sx={{ fontSize: { xs: "18px", md: "22px" }, color: location.pathname === "/members" ? "black" : "#9CA3AF" }} />
              </IconButton>
            </Link>
            <Link to="/groupmembers">
              <IconButton
                style={{
                  backgroundColor: location.pathname === "/groupmembers" ? "#8BD4E7" : "transparent",
                  borderRadius: "50%",
                }}
              >
                <GroupsIcon sx={{ fontSize: { xs: "18px", md: "22px" }, color: location.pathname === "/groupmembers" ? "black" : "#9CA3AF" }} />
              </IconButton>
            </Link>
            <Link to="/frammembers">
              <IconButton
                style={{
                  backgroundColor: location.pathname === "/frammembers" ? "#8BD4E7" : "transparent",
                  borderRadius: "50%",
                }}
              >
                <Work sx={{ fontSize: { xs: "18px", md: "22px" }, color: location.pathname === "/frammembers" ? "black" : "#9CA3AF" }} />
              </IconButton>
            </Link>
            <Link to="/chatmessage">
              <IconButton
                style={{
                  backgroundColor: location.pathname === "/chatmessage" ? "#8BD4E7" : "transparent",
                  borderRadius: "50%",
                }}
              >
                <Chat sx={{ fontSize: { xs: "18px", md: "22px" }, color: location.pathname === "/chatmessage" ? "black" : "#9CA3AF" }} />
              </IconButton>
            </Link>
            <Link to="/settings">
              <IconButton
                style={{
                  backgroundColor: location.pathname === "/settings" ? "#8BD4E7" : "transparent",
                  borderRadius: "50%",
                }}
              >
                <Settings sx={{ fontSize: { xs: "18px", md: "22px" }, color: location.pathname === "/settings" ? "black" : "#9CA3AF" }} />
              </IconButton>
            </Link>
          </Box>
        </Box>

        {/* Logout Icon at the Bottom */}
        <Link to="/loginPage">
          <IconButton>
            <Box
              sx={{
                width: { xs: "35px", md: "50px" },
                height: { xs: "35px", md: "50px" },
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
                border: "1px solid rgb(194, 189, 189)",
              }}
            >
              <ExitToApp sx={{ color: "#EF4444", fontSize: { xs: "1.2rem", md: "1.8rem" } }} />
            </Box>
          </IconButton>
        </Link>
      </Box>
    </Box>
  );
};

export default Sidebar;