import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import { Link } from "react-router-dom"; 
import Sidebar from "./Sidebar";
import GroupsIcon from "@mui/icons-material/Groups";
import OnDeviceTrainingIcon from "@mui/icons-material/OnDeviceTraining";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CloseIcon from "@mui/icons-material/Close";
import toast, { Toaster } from "react-hot-toast";

const FramMembers = () => {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    team: "",
    startDate: "",
    dueDate: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateProject = () => {
    // Show success toast
    toast.success("Your project has been created successfully", {
      position: "top-center",
      duration: 3000,
      style: {
        background: "#4CAF50",
        color: "#fff",
        fontSize: "16px",
      },
    });

    // Clear form data
    setFormData({
      title: "",
      description: "",
      team: "",
      startDate: "",
      dueDate: "",
    });

    // Close the modal
    handleClose();
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#F5F7FA" }}>
      <Toaster />
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: { xs: "50px", sm: "50px", md: "40px" },
          width: { xs: "calc(100% - 50px)", sm: "calc(100% - 60px)", md: "calc(100% - 80px)" },
          p: { xs: 2, sm: 3, md: 15 },
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#1F2937",
              fontSize: { xs: "18px", sm: "20px", md: "2rem" },
              mb: 1,
            }}
          >
            Zaka Dairy Farm
          </Typography>
          <Typography sx={{ mt: 1 }}>
            <Link to="/dashboard" style={{ color: "#6B7280", textDecoration: "none" }}>
              Home
            </Link>{" "}
            /{" "}
            <Link to="/zaka-dairy-farm" style={{ color: "#6B7280", textDecoration: "none" }}>
              Zaka Dairy Farm
            </Link>{" "}
          </Typography>
          <Typography
            sx={{
              color: "black",
              fontSize: { xs: "12px", sm: "1.1rem" },
              mb: 3,
              mt: 2,
            }}
          >
            Welcome to <strong>Zaka Dairy Farm!</strong> Let’s start by building your team and adding your first project.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: 2,
            }}
          >
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "12px",
                border: "1px solid #CACACA",
                p: 3,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "left",
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  backgroundColor: "#8BD4E7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "#8BD4E7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PeopleIcon sx={{ color: "black", fontSize: "1.9rem" }} />
                </Box>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography sx={{ fontSize: "1.1rem", color: "#6B7280" }}>
                  Total Members
                </Typography>
                <Typography sx={{ fontSize: "24px", fontWeight: "bold", color: "#1F2937" }}>
                  99
                </Typography>
              </Box>
              <Typography sx={{ fontSize: "1rem", color: "#6B7280", mb: 2 }}>
                You can add members of your business
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#8BD4E7",
                  color: "black",
                  borderRadius: "20px",
                  textTransform: "none",
                  fontSize: "12px",
                  px: 3,
                  py: 1,
                  width: "150px",
                  border: "3px solid transparent",
                  "&:hover": {
                    backgroundColor: "white",
                    border: "3px solid #8BD4E7",
                  },
                }}
              >
                + Add Member
              </Button>
            </Box>

            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "12px",
                border: "1px solid #CACACA",
                p: 3,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "left",
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  backgroundColor: "#8BD4E7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "#8BD4E7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <GroupsIcon sx={{ color: "black", fontSize: "1.9rem" }} />
                </Box>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography sx={{ fontSize: "1.1rem", color: "#6B7280" }}>
                  Total Teams
                </Typography>
                <Typography sx={{ fontSize: "24px", fontWeight: "bold", color: "#1F2937" }}>
                  99
                </Typography>
              </Box>
              <Typography sx={{ fontSize: "1rem", color: "#6B7280", mb: 2 }}>
                You can add Teams of your business
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#8BD4E7",
                  color: "black",
                  borderRadius: "20px",
                  textTransform: "none",
                  fontSize: "12px",
                  px: 3,
                  py: 1,
                  width: "150px",
                  border: "3px solid transparent",
                  "&:hover": {
                    backgroundColor: "white",
                    border: "3px solid #8BD4E7",
                  },
                }}
              >
                + Add Team
              </Button>
            </Box>

            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "12px",
                border: "1px solid #CACACA",
                p: 3,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "left",
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  backgroundColor: "#8BD4E7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "#8BD4E7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <OnDeviceTrainingIcon sx={{ color: "black", fontSize: "1.9rem" }} />
                </Box>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography sx={{ fontSize: "1.1rem", color: "#6B7280" }}>
                  Projects in Progress
                </Typography>
                <Typography sx={{ fontSize: "24px", fontWeight: "bold", color: "#1F2937" }}>
                  92
                </Typography>
              </Box>
              <Typography sx={{ fontSize: "1rem", color: "#6B7280", mb: 2 }}>
                You can add Project of your business
              </Typography>
              <Button
                variant="contained"
                onClick={handleOpen}
                sx={{
                  backgroundColor: "#8BD4E7",
                  color: "black",
                  borderRadius: "20px",
                  textTransform: "none",
                  fontSize: "12px",
                  px: 3,
                  py: 1,
                  width: "150px",
                  border: "3px solid transparent",
                  "&:hover": {
                    backgroundColor: "white",
                    border: "3px solid #8BD4E7",
                  },
                }}
              >
                + Add Project
              </Button>
            </Box>

            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "12px",
                border: "1px solid #CACACA",
                p: 3,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "left",
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  backgroundColor: "#8BD4E7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "#8BD4E7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <RestartAltIcon sx={{ color: "black", fontSize: "1.9rem" }} />
                </Box>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography sx={{ fontSize: "1.1rem", color: "#6B7280" }}>
                  Recent Activity
                </Typography>
                <Typography sx={{ fontSize: "24px", fontWeight: "bold", color: "#1F2937" }}>
                  99
                </Typography>
              </Box>
              <Typography sx={{ fontSize: "1rem", color: "#6B7280", mb: 2 }}>
                You can see Recent Activity of your business
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#8BD4E7",
                  color: "black",
                  borderRadius: "20px",
                  textTransform: "none",
                  fontSize: "12px",
                  px: 3,
                  py: 1,
                  width: "150px",
                  border: "3px solid transparent",
                  "&:hover": {
                    backgroundColor: "white",
                    border: "3px solid #8BD4E7",
                  },
                }}
              >
                View
              </Button>
            </Box>
          </Box>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
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
                p: 3,
                width: { xs: "90%", sm: "450px" },
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                position: "relative",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#1F2937" }}
                >
                  Create Project
                </Typography>
                <Button onClick={handleClose} sx={{ minWidth: 0, p: 0 }}>
                  <CloseIcon sx={{ color: "#6B7280" }} />
                </Button>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box>
                  <Typography sx={{ color: "black", mb: 1, fontSize: "14px" }}>
                    Project Title
                  </Typography>
                  <TextField
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter Project Title"
                    variant="outlined"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "20px",
                        height: "40px",
                        backgroundColor: "#F5F7FA",
                        "& fieldset": {
                          borderColor: "#28272F",
                        },
                        "&:hover fieldset": {
                          borderColor: "#8BD4E7",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#8BD4E7",
                        },
                      },
                      "& .MuiInputBase-input": {
                        fontSize: "14px",
                        color: "#6B7280",
                      },
                    }}
                  />
                </Box>

                <Box>
                  <Typography sx={{ color: "#28272F", mb: 1, fontSize: "14px" }}>
                    Project Description
                  </Typography>
                  <TextField
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Write Project Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "20px",
                        backgroundColor: "#F5F7FA",
                        "& fieldset": {
                          borderColor: "#28272F",
                        },
                        "&:hover fieldset": {
                          borderColor: "#8BD4E7",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#8BD4E7",
                        },
                      },
                      "& .MuiInputBase-input": {
                        fontSize: "14px",
                        color: "#6B7280",
                      },
                    }}
                  />
                </Box>

                <Box>
                  <Typography sx={{ color: "#6B7280", mb: 1, fontSize: "14px" }}>
                    Assign to Team
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      name="team"
                      value={formData.team}
                      onChange={handleInputChange}
                      displayEmpty
                      defaultValue=""
                      sx={{
                        borderRadius: "20px",
                        height: "40px",
                        backgroundColor: "#F5F7FA",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#28272F",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#8BD4E7",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#8BD4E7",
                        },
                        "& .MuiSelect-select": {
                          fontSize: "14px",
                          color: "#6B7280",
                        },
                      }}
                    >
                      <MenuItem value="" disabled>
                        -Select-
                      </MenuItem>
                      <MenuItem value="Design Squad">Design Squad</MenuItem>
                      <MenuItem value="Dev Team Alpha">Dev Team Alpha</MenuItem>
                      <MenuItem value="Team 3">Team 3</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ color: "#6B7280", mb: 1, fontSize: "14px" }}>
                      Start Date
                    </Typography>
                    <TextField
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      type="date"
                      variant="outlined"
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "20px",
                          height: "40px",
                          backgroundColor: "#F5F7FA",
                          "& fieldset": {
                            borderColor: "#28272F",
                          },
                          "&:hover fieldset": {
                            borderColor: "#8BD4E7",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#8BD4E7",
                          },
                        },
                        "& .MuiInputBase-input": {
                          fontSize: "14px",
                          color: "#6B7280",
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ color: "black", mb: 1, fontSize: "14px" }}>
                      Due Date
                    </Typography>
                    <TextField
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleInputChange}
                      type="date"
                      variant="outlined"
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "20px",
                          height: "40px",
                          backgroundColor: "#F5F7FA",
                          "& fieldset": {
                            borderColor: "#28272F",
                          },
                          "&:hover fieldset": {
                            borderColor: "#8BD4E7",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#8BD4E7",
                          },
                        },
                        "& .MuiInputBase-input": {
                          fontSize: "14px",
                          color: "#6B7280",
                        },
                      }}
                    />
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  onClick={handleCreateProject}
                  sx={{
                    backgroundColor: "#8BD4E7",
                    color: "black",
                    borderRadius: "20px",
                    textTransform: "none",
                    fontSize: "14px",
                    py: 1,
                    mt: 2,
                    "&:hover": {
                      backgroundColor: "#D1E9FF",
                    },
                  }}
                >
                  Create Project
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
};

export default FramMembers;