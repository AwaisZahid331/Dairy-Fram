import React, { useState } from "react";
import { Box, Typography, Button, Card, CardContent, CardActions, Modal, TextField, MenuItem, IconButton } from "@mui/material";
import { Add, Link as LinkIcon, Close } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#F5F7FA" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: { xs: "60px", sm: "80px", md: "100px" },
          width: { xs: "calc(100% - 60px)", sm: "calc(100% - 80px)", md: "calc(100% - 100px)" },
          overflowY: "auto",
        }}
      >
        {/* Dashboard Content */}
        <Box
          sx={{
            marginTop: { xs: "90px", md: "100px" },
            padding: { xs: "10px 20px", sm: "15px 30px", md: "20px 40px" },
            maxWidth: "1250px",
            marginLeft: "auto",
            marginRight: "auto",
            minHeight: "calc(100vh - 100px)",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#1F2937",
              mb: 3,
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
            }}
          >
            Dashboard
          </Typography>
          <Typography sx={{ mt: 1 }}>
            <Link to="/dashboard" style={{ color: "black", textDecoration: "none", fontSize: "1.3rem" }}>
              Dashboard
            </Link>
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 2, md: 3 },
              mt: 3,
            }}
          >
            {/* Your Businesses Section */}
            <Box
              sx={{
                flex: { xs: "auto", md: 2 },
                border: "1px solid #CACACA",
                borderRadius: "12px",
                padding: { xs: "15px", md: "20px" },
                backgroundColor: "white",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                maxHeight: "140px", // Keep the maxHeight as requested
                overflow: "hidden", // Prevent content from overflowing the Box
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#1F2937",
                  mb: 1,
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                }}
              >
                Your Businesses
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#6B7280",
                  mb: 1, // Reduced margin-bottom to save space
                  fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.875rem" }, // Reduced font size on xs
                }}
              >
                Here are the businesses you're part of. Create or join more anytime.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" }, // Stack vertically on xs, row on sm+
                  flexWrap: "nowrap", // Prevent wrapping to ensure scrolling
                  gap: { xs: 0.5, sm: 1 }, // Reduced gap to save space
                  justifyContent: { xs: "center", sm: "flex-start" },
                  overflowY: { xs: "auto", sm: "hidden" }, // Vertical scrolling on xs
                  overflowX: { xs: "hidden", sm: "auto" }, // Horizontal scrolling on sm+
                  maxHeight: { xs: "60px", sm: "40px" }, // Limit height to fit within maxHeight of parent
                  "&::-webkit-scrollbar": {
                    display: "none", // Hide scrollbar for better aesthetics
                  },
                  "-ms-overflow-style": "none", // Hide scrollbar in IE/Edge
                  "scrollbar-width": "none", // Hide scrollbar in Firefox
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleOpenModal}
                  sx={{
                    backgroundColor: "#8BD4E7",
                    color: "black",
                    borderRadius: "30px",
                    textTransform: "none",
                    fontWeight: "bold",
                    padding: {
                      xs: "0.2rem 0.4rem", 
                      sm: "0.3rem 0.6rem", 
                      md: "0.4rem 0.8rem", 
                    },
                    fontSize: {
                      xs: "0.65rem", 
                      sm: "0.7rem", 
                      md: "0.85rem", 
                    },
                    boxShadow: "none",
                    whiteSpace: "nowrap",
                    width: { xs: "100%", sm: "auto" }, 
                    maxWidth: { xs: "150px", sm: "none" }, 
                    minWidth: { xs: "120px", sm: "130px", md: "140px" },
                  }}
                >
                  Create Business
                </Button>
                <Button
                  startIcon={<LinkIcon />}
                  sx={{
                    backgroundColor: "#8BD4E7",
                    color: "black",
                    borderRadius: "30px",
                    textTransform: "none",
                    fontWeight: "bold",
                    padding: {
                      xs: "0.2rem 0.4rem", // Reduced padding for xs
                      sm: "0.3rem 0.6rem", // Reduced padding for sm
                      md: "0.4rem 0.8rem", // Reduced padding for md
                    },
                    fontSize: {
                      xs: "0.65rem", // 10.4px in rem
                      sm: "0.7rem", // 11.2px in rem
                      md: "0.75rem", // 12px in rem
                    },
                    boxShadow: "none",
                    whiteSpace: "nowrap",
                    width: { xs: "100%", sm: "auto" }, // Full width on xs, auto on sm+
                    maxWidth: { xs: "150px", sm: "none" }, // Reduced maxWidth on xs
                    minWidth: { xs: "120px", sm: "130px", md: "140px" }, // Minimum width for readability
                  }}
                >
                  Join a business via invite
                </Button>
              </Box>
            </Box>

            {/* Registered Businesses Section */}
            <Box
              sx={{
                flex: { xs: "auto", md: 3 },
              }}
            >
              <Box
                sx={{
                  backgroundColor: "white",
                  border: "1px solid #CACACA",
                  borderRadius: "12px",
                  padding: { xs: "15px", md: "20px" },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#1F2937",
                    mb: 2,
                    fontSize: { xs: "1.1rem", md: "1.25rem" },
                  }}
                >
                  Registered Businesses
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    flexWrap: "wrap",
                    gap: { xs: 2, sm: 3 },
                    justifyContent: { xs: "center", sm: "flex-start" },
                  }}
                >
                  {/* Card 1 */}
                  <Card
                    sx={{
                      width: { xs: "100%", sm: "200px" },
                      maxWidth: "200px",
                      borderRadius: "12px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      backgroundColor: "white",
                      border: "1px solid #CACACA",
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "bold",
                          color: "#1F2937",
                          fontSize: { xs: "0.95rem", md: "1rem" },
                        }}
                      >
                        EduGate Academy
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#6B7280",
                          fontSize: { xs: "0.85rem", md: "0.875rem" },
                        }}
                      >
                        School
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#6B7280",
                          mt: 1,
                          fontSize: { xs: "0.85rem", md: "0.875rem" },
                        }}
                      >
                        Admin
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#8BD4E7",
                          color: "black",
                          textTransform: "none",
                          fontWeight: "bold",
                          borderRadius: "30px",
                          padding: { xs: "0.4rem 1.5rem", md: "0.5rem 2.5rem" },
                          fontSize: { xs: "0.85rem", md: "0.93rem" },
                          boxShadow: "none",
                          "&:hover": {
                            backgroundColor: "#D1E9FF",
                          },
                        }}
                      >
                        Open
                      </Button>
                    </CardActions>
                  </Card>

                  {/* Card 2 */}
                  <Card
                    sx={{
                      width: { xs: "100%", sm: "200px" },
                      maxWidth: "200px",
                      borderRadius: "12px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      backgroundColor: "white",
                      border: "1px solid #D1D5DB",
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "bold",
                          color: "#1F2937",
                          fontSize: { xs: "0.95rem", md: "1rem" },
                        }}
                      >
                        Zaka Dairy Farm
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#6B7280",
                          fontSize: { xs: "0.85rem", md: "0.875rem" },
                        }}
                      >
                        Dairy Farm
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#6B7280",
                          mt: 1,
                          fontSize: { xs: "0.85rem", md: "0.875rem" },
                        }}
                      >
                        Super Admin
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#8BD4E7",
                          color: "black",
                          textTransform: "none",
                          fontWeight: "bold",
                          borderRadius: "30px",
                          padding: { xs: "0.4rem 1.5rem", md: "0.5rem 2.5rem" },
                          fontSize: { xs: "0.85rem", md: "0.93rem" },
                          boxShadow: "none",
                          "&:hover": {
                            backgroundColor: "#D1E9FF",
                          },
                        }}
                      >
                        Open
                      </Button>
                    </CardActions>
                  </Card>

                  {/* Card 3 */}
                  <Card
                    sx={{
                      width: { xs: "100%", sm: "200px" },
                      maxWidth: "200px",
                      borderRadius: "12px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      backgroundColor: "white",
                      border: "1px solid #D1D5DB",
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "bold",
                          color: "#1F2937",
                          fontSize: { xs: "0.95rem", md: "1rem" },
                        }}
                      >
                        PixelCraft Studio
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#6B7280",
                          fontSize: { xs: "0.85rem", md: "0.875rem" },
                        }}
                      >
                        Design Agency
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#6B7280",
                          mt: 1,
                          fontSize: { xs: "0.85rem", md: "0.875rem" },
                        }}
                      >
                        Employee
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#8BD4E7",
                          color: "black",
                          textTransform: "none",
                          fontWeight: "bold",
                          borderRadius: "30px",
                          padding: { xs: "0.4rem 1.5rem", md: "0.5rem 2.5rem" },
                          fontSize: { xs: "0.85rem", md: "0.93rem" },
                          boxShadow: "none",
                          "&:hover": {
                            backgroundColor: "#D1E9FF",
                          },
                        }}
                      >
                        Open
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Modal for Create a New Business */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="create-business-modal"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            width: { xs: "80%", sm: "440px" },
            maxWidth: "440px",
            p: 4,
            position: "relative",
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              top: 6,
              right: 6,
              color: "black",
            }}
          >
            <Close sx={{ fontSize: "20px" }} />
          </IconButton>

          {/* Modal Title and Subtitle */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#1F2937",
              mb: 0.9,
              fontSize: { xs: "1.1rem", sm: "1.25rem" },
            }}
          >
            Create a New Business
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#6B7280",
              mb: 2,
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            }}
          >
            You'll automatically become the SUPER ADMIN of this business.
          </Typography>

          {/* Form Fields */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {/* Business Name */}
            <Box>
              <Typography variant="body2" sx={{ color: "#1F2937", mb: 0.5, fontSize: "12px" }}>
                Business Name
              </Typography>
              <TextField
                placeholder="Enter Business Name"
                variant="outlined"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#28272F",
                      borderRadius: "8px",
                    },
                    "&:hover fieldset": {
                      borderColor: "#28272F",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#28272F",
                    },
                    borderRadius: "8px",
                    height: "36px",
                  },
                  "& .MuiInputBase-input": {
                    padding: "8px 10px",
                    fontSize: "12px",
                    color: "black",
                  },
                }}
              />
            </Box>

            {/* Business Type */}
            <Box>
              <Typography variant="body2" sx={{ color: "#1F2937", mb: 0.5, fontSize: "12px" }}>
                Business Type
              </Typography>
              <TextField
                select
                placeholder="Select Business Type"
                variant="outlined"
                fullWidth
                defaultValue=""
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#28272F",
                      borderRadius: "8px",
                    },
                    "&:hover fieldset": {
                      borderColor: "#28272F",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#28272F",
                    },
                    borderRadius: "8px",
                    height: "36px",
                  },
                  "& .MuiInputBase-input": {
                    padding: "8px 10px",
                    fontSize: "12px",
                    color: "#6B7280",
                  },
                }}
              >
                <MenuItem value="" disabled>
                  Select Business Type
                </MenuItem>
                <MenuItem value="Shop">Shop</MenuItem>
                <MenuItem value="School">School</MenuItem>
                <MenuItem value="Dairy Farm">Dairy Farm</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Box>

            {/* Description */}
            <Box>
              <Typography variant="body2" sx={{ color: "#1F2937", mb: 0.5, fontSize: "12px" }}>
                Description
              </Typography>
              <TextField
                placeholder="Enter Business Description"
                variant="outlined"
                fullWidth
                multiline
                rows={1}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#28272F",
                      borderRadius: "8px",
                    },
                    "&:hover fieldset": {
                      borderColor: "#D1D5DB",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3B82F6",
                    },
                    borderRadius: "8px",
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "12px",
                    color: "black",
                  },
                }}
              />
            </Box>

            {/* Upload Logo */}
            <Box>
              <Typography variant="body2" sx={{ color: "#1F2937", mb: 0.5, fontSize: "12px" }}>
                Upload Logo <span style={{ color: "#6B7280" }}>(Optional)</span>
              </Typography>
              <Box
                sx={{
                  border: "1px dashed black",
                  borderRadius: "8px",
                  p: 1,
                  textAlign: "center",
                  color: "#6B7280",
                  fontSize: "12px",
                }}
              >
                <Typography sx={{ fontSize: "12px" }}>Drag & Drop the photo</Typography>
                <Typography sx={{ fontSize: "10px", mt: "0.5rem" }}>
                  Logo Format: .png
                </Typography>
                <Button
                  variant="outlined"
                  component="label"
                  sx={{
                    mt: 1,
                    borderRadius: "30px",
                    textTransform: "none",
                    borderColor: "#E5E7EB",
                    color: "#6B7280",
                    fontSize: "12px",
                    padding: "4px 12px",
                    "&:hover": {
                      borderColor: "#D1D5DB",
                    },
                  }}
                >
                  Upload
                  <input type="file" accept=".png" hidden />
                </Button>
              </Box>
            </Box>

            {/* Create Business Button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#8BD4E7",
                color: "black",
                borderRadius: "30px",
                textTransform: "none",
                fontWeight: "bold",
                padding: "6px 0",
                mt: 1,
                fontSize: "14px",
                "&:hover": {
                  backgroundColor: "#D1E9FF",
                },
              }}
            >
              Create Business
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Dashboard;