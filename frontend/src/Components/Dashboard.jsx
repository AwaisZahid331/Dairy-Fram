import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Modal,
  TextField,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Add, Link as LinkIcon, Close } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    image: null,
  });
  const [error, setError] = useState("");
  const [businesses, setBusinesses] = useState([]);
  const navigate = useNavigate();

  // Fetch businesses on component mount
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in to view businesses.");
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/businesses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBusinesses(response.data);
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message || "Failed to fetch businesses.");
        } else {
          setError("An error occurred. Please try again.");
        }
        console.error(err);
      }
    };

    fetchBusinesses();
  }, [navigate]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setFormData({ name: "", type: "", description: "", image: null });
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/png") {
      setFormData((prev) => ({ ...prev, image: file }));
    } else {
      setError("Please upload a valid PNG file.");
    }
  };

  const handleCreateBusiness = async () => {
    if (!formData.name || !formData.type || !formData.description) {
      setError("Business Name, Type, and Description are required.");
      return;
    }

    const token = localStorage.getItem("token");
    const superAdminUserId = localStorage.getItem("userId");
    if (!token || !superAdminUserId) {
      setError("You must be logged in to create a business.");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      navigate("/login");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("type", formData.type);
    data.append("description", formData.description);
    data.append("superAdminUserId", superAdminUserId);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/businesses",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Business created successfully!", {
        position: "top-center",
        duration: 3000,
        style: {
          background: "#4caf50",
          color: "#fff",
          fontSize: "14px",
          borderRadius: "8px",
        },
      });

      // Refresh businesses after creation
      const updatedResponse = await axios.get(
        "http://localhost:5000/api/businesses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBusinesses(updatedResponse.data);

      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Failed to create business.");
      } else {
        setError("An error occurred. Please try again.");
      }
      console.error(err);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#F5F7FA" }}>
      <Toaster />
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: { xs: "60px", sm: "80px", md: "100px" },
          width: {
            xs: "calc(100% - 60px)",
            sm: "calc(100% - 80px)",
            md: "calc(100% - 100px)",
          },
          overflowY: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            marginTop: { xs: "60px", sm: "80px", md: "100px" },
            padding: { xs: "10px", sm: "15px", md: "20px 40px" },
            width: "100%",
            maxWidth: { xs: "100%", sm: "90%", md: "1250px" },
            minHeight: "calc(100vh - 60px)",
            boxSizing: "border-box",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#1F2937",
              mb: 2,
              fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" },
            }}
          >
            Dashboard
          </Typography>
          <Typography sx={{ mt: 1 }}>
            <Link
              to="/dashboard"
              style={{ color: "black", textDecoration: "none", fontSize: { xs: "1rem", md: "1.3rem" } }}
            >
              Dashboard
            </Link>
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 2, sm: 3 },
              mt: 3,
            }}
          >
            <Box
              sx={{
                flex: { xs: "auto", sm: 2 },
                border: "1px solid #CACACA",
                borderRadius: "12px",
                padding: { xs: "10px", sm: "15px", md: "20px" },
                backgroundColor: "white",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                height: "auto",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#1F2937",
                  mb: 1,
                  fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                }}
              >
                Your Businesses
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#6B7280",
                  mb: 1,
                  fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.875rem" },
                }}
              >
                Here are the businesses you're part of. Create or join more anytime.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: { xs: 1, sm: 1.5 },
                  justifyContent: { xs: "center", sm: "flex-start" },
                  overflowX: "auto",
                  "&::-webkit-scrollbar": { height: "6px" },
                  "&::-webkit-scrollbar-thumb": { backgroundColor: "#CACACA", borderRadius: "6px" },
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
                    padding: { xs: "6px 12px", sm: "8px 16px" },
                    fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.85rem" },
                    boxShadow: "none",
                    whiteSpace: "nowrap",
                    minWidth: { xs: "100%", sm: "120px" },
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
                    padding: { xs: "6px 12px", sm: "8px 16px" },
                    fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.85rem" },
                    boxShadow: "none",
                    whiteSpace: "nowrap",
                    minWidth: { xs: "100%", sm: "120px" },
                  }}
                >
                  Join a business via invite
                </Button>
              </Box>
            </Box>

            <Box sx={{ flex: { xs: "auto", sm: 3 } }}>
              <Box
                sx={{
                  backgroundColor: "white",
                  border: "1px solid #CACACA",
                  borderRadius: "12px",
                  padding: { xs: "10px", sm: "15px", md: "20px" },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#1F2937",
                    mb: 2,
                    fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                  }}
                >
                  Registered Businesses
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: { xs: 1.5, sm: 2, md: 3 },
                    justifyContent: { xs: "center", sm: "flex-start" },
                  }}
                >
                  {businesses.length > 0 ? (
                    businesses.map((business) => (
                      <Card
                        key={business._id}
                        sx={{
                          flex: {
                            xs: "1 1 100%", // Full width on extra small screens
                            sm: "1 1 calc(33.33% - 16px)", // Three per row on small screens and above
                          },
                          maxWidth: { xs: "100%", sm: "200px", md: "200px" },
                          borderRadius: "12px",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                          backgroundColor: "white",
                          border: "1px solid #CACACA",
                          boxSizing: "border-box",
                        }}
                      >
                        <CardContent>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: "bold",
                              color: "#1F2937",
                              fontSize: { xs: "0.9rem", sm: "0.95rem", md: "1rem" },
                            }}
                          >
                            {business.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#6B7280",
                              fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.875rem" },
                            }}
                          >
                            {business.type}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#6B7280",
                              mt: 0.5,
                              fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.875rem" },
                            }}
                          >
                            {business.superAdminUserId ? "Super Admin" : "Member"}
                          </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: "center", pb: 1.5 }}>
                          <Button
                            variant="contained"
                            component={Link}
                            to={`/business/${business._id}`}
                            sx={{
                              backgroundColor: "#8BD4E7",
                              color: "black",
                              textTransform: "none",
                              fontWeight: "bold",
                              borderRadius: "30px",
                              padding: { xs: "4px 12px", sm: "6px 16px" },
                              fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.93rem" },
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
                    ))
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#6B7280",
                        fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.875rem" },
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      No businesses found.
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

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
            width: { xs: "90%", sm: "80%", md: "440px" },
            maxWidth: "440px",
            p: { xs: 2, sm: 3, md: 4 },
            position: "relative",
            boxSizing: "border-box",
          }}
        >
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              top: 6,
              right: 6,
              color: "black",
            }}
          >
            <Close sx={{ fontSize: { xs: "16px", sm: "20px" } }} />
          </IconButton>

          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#1F2937",
              mb: 0.5,
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
            }}
          >
            Create a New Business
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#6B7280",
              mb: 1.5,
              fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.875rem" },
            }}
          >
            You'll automatically become the SUPER ADMIN of this business.
          </Typography>

          {error && (
            <Typography sx={{ color: "red", mb: 1, fontSize: { xs: "0.65rem", sm: "0.75rem" } }}>
              {error}
            </Typography>
          )}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box>
              <Typography variant="body2" sx={{ color: "#1F2937", mb: 0.5, fontSize: { xs: "10px", sm: "12px" } }}>
                Business Name
              </Typography>
              <TextField
                placeholder="Enter Business Name"
                variant="outlined"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#28272F", borderRadius: "8px" },
                    "&:hover fieldset": { borderColor: "#28272F" },
                    "&.Mui-focused fieldset": { borderColor: "#28272F" },
                    borderRadius: "8px",
                    height: { xs: "32px", sm: "36px" },
                  },
                  "& .MuiInputBase-input": {
                    padding: { xs: "6px 8px", sm: "8px 10px" },
                    fontSize: { xs: "10px", sm: "12px" },
                    color: "black",
                  },
                }}
              />
            </Box>

            <Box>
              <Typography variant="body2" sx={{ color: "#1F2937", mb: 0.5, fontSize: { xs: "10px", sm: "12px" } }}>
                Business Type
              </Typography>
              <TextField
                select
                variant="outlined"
                fullWidth
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#28272F", borderRadius: "8px" },
                    "&:hover fieldset": { borderColor: "#28272F" },
                    "&.Mui-focused fieldset": { borderColor: "#28272F" },
                    borderRadius: "8px",
                    height: { xs: "32px", sm: "36px" },
                  },
                  "& .MuiInputBase-input": {
                    padding: { xs: "6px 8px", sm: "8px 10px" },
                    fontSize: { xs: "10px", sm: "12px" },
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

            <Box>
              <Typography variant="body2" sx={{ color: "#1F2937", mb: 0.5, fontSize: { xs: "10px", sm: "12px" } }}>
                Description
              </Typography>
              <TextField
                placeholder="Enter Business Description"
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#28272F", borderRadius: "8px" },
                    "&:hover fieldset": { borderColor: "#D1D5DB" },
                    "&.Mui-focused fieldset": { borderColor: "#3B82F6" },
                    borderRadius: "8px",
                  },
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "10px", sm: "12px" },
                    color: "black",
                    padding: { xs: "6px 8px", sm: "8px 10px" },
                  },
                }}
              />
            </Box>

            <Box>
              <Typography variant="body2" sx={{ color: "#1F2937", mb: 0.5, fontSize: { xs: "10px", sm: "12px" } }}>
                Upload Logo <span style={{ color: "#6B7280" }}>(Optional)</span>
              </Typography>
              <Box
                sx={{
                  border: "1px dashed black",
                  borderRadius: "8px",
                  p: { xs: 0.5, sm: 1 },
                  textAlign: "center",
                  color: "#6B7280",
                  fontSize: { xs: "10px", sm: "12px" },
                }}
              >
                <Typography sx={{ fontSize: { xs: "10px", sm: "12px" } }}>
                  Drag & Drop the photo
                </Typography>
                <Typography sx={{ fontSize: { xs: "8px", sm: "10px" }, mt: "0.25rem" }}>
                  Logo Format: .png
                </Typography>
                <Button
                  variant="outlined"
                  component="label"
                  sx={{
                    mt: 0.5,
                    borderRadius: "30px",
                    textTransform: "none",
                    borderColor: "#E5E7EB",
                    color: "#6B7280",
                    fontSize: { xs: "10px", sm: "12px" },
                    padding: { xs: "2px 8px", sm: "4px 12px" },
                    "&:hover": { borderColor: "#D1D5DB" },
                  }}
                >
                  Upload
                  <input type="file" accept=".png" hidden onChange={handleFileChange} />
                </Button>
              </Box>
            </Box>

            <Button
              variant="contained"
              onClick={handleCreateBusiness}
              sx={{
                backgroundColor: "#8BD4E7",
                color: "black",
                borderRadius: "30px",
                textTransform: "none",
                fontWeight: "bold",
                padding: { xs: "4px 0", sm: "6px 0" },
                mt: 1,
                fontSize: { xs: "12px", sm: "14px" },
                "&:hover": { backgroundColor: "#D1E9FF" },
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