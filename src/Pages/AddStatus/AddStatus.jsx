import React, { use, useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  TextField,
  MenuItem,
  Grid,
  Divider,
  Switch,
  FormControlLabel,
  Paper,
} from "@mui/material";
import { Settings } from "@mui/icons-material";
import { postData } from "../../Axios/Axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../Helpers/SnackBar/Snackbar";

export default function AddStatus() {
  const [form, setForm] = useState({
    name: "",
    available: true,
    availability: "",
    telNo: "",
    email: true,
    emailAddr: "",
    sms: true,
    smsNo: "",
  });
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postData("/availabilities/addStatus", form);
      console.log("Add Status Response:", response);
      navigate("/availabilities");
      showSnackbar("Status added successfully!", "success");
    }
   catch (error) {
      console.error("Error adding status:", error);
      showSnackbar("Failed to add status. Please try again.", "error");
    }
  };



  
  return (
    <Box p={2}>
      <Card
        sx={{
          borderRadius: 2,
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          maxWidth: "auto",
          margin: "0 auto",
          backgroundColor: "#fff",
        }}
      >
        <CardHeader
          avatar={<Settings color="primary" fontSize="small" />}
          title={
            <Typography variant="h6" fontWeight={600}>
              Add New Status
            </Typography>
          }
          subheader={
            <Typography variant="body2" color="text.secondary">
              Define and manage availability and notifications
            </Typography>
          }
          sx={{
            backgroundColor: "#f9fafb",
            borderBottom: "1px solid #e0e0e0",
            py: 1.5,
          }}
        />
        <CardContent sx={{ p: 2 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* LEFT COLUMN */}
              <Grid size={{ xs: 12, md: 6 }}>
                {/* Status */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,

                    mb: 2,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Status
                  </Typography>
                  <TextField
                    label="Status Name"
                    fullWidth
                    size="small"
                    value={form.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    required
                  />
                </Paper>

                {/* Availability */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,

                    mb: 2,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Availability
                  </Typography>
                  <TextField
                    select
                    label="Availability Type"
                    fullWidth
                    size="small"
                    value={form.availability}
                    onChange={(e) =>
                      handleFormChange("availability", e.target.value)
                    }
                    required
                  >
                    <MenuItem value="">Select Availability</MenuItem>
                    <MenuItem value="Available">Available</MenuItem>
                    <MenuItem value="Out of the office">
                      Out of the office
                    </MenuItem>
                    <MenuItem value="On a call">On a call</MenuItem>
                    <MenuItem value="In a meeting">In a meeting</MenuItem>
                  </TextField>

                  <Divider sx={{ my: 1 }} />

                  <TextField
                    select
                    label="Current Status"
                    fullWidth
                    size="small"
                    value={form.available ? "Available" : "Unavailable"}
                    onChange={(e) =>
                      handleFormChange("available", e.target.value === "Available")
                    }
                  >
                    <MenuItem value="Available">Available</MenuItem>
                    <MenuItem value="Unavailable">Unavailable</MenuItem>
                  </TextField>
                </Paper>

                {/* Contact Detail */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,

                    mb: 2,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Contact Detail
                  </Typography>
                  <TextField
                    label="Telephone Number"
                    fullWidth
                    size="small"
                    value={form.telNo}
                    onChange={(e) => handleFormChange("telNo", e.target.value)}
                  />
                </Paper>
              </Grid>

              {/* RIGHT COLUMN */}
              <Grid size={{ xs: 12, md: 6 }}>
                {/* Message Notifications */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,

                    mb: 2,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Message Notifications
                  </Typography>

                  <FormControlLabel
                    control={
                      <Switch
                        checked={form.email}
                        onChange={(e) =>
                          handleFormChange("email", e.target.checked)
                        }
                        size="small"
                      />
                    }
                    label="Enable Email Notifications"
                  />

                  <TextField
                    label="Email Address"
                    fullWidth
                    size="small"
                    disabled={!form.email}
                    value={form.emailAddr}
                    onChange={(e) =>
                      handleFormChange("emailAddr", e.target.value)
                    }
                    placeholder="Enter email address"
                    margin="normal"
                  />

                  <Divider sx={{ my: 1 }} />

                  <FormControlLabel
                    control={
                      <Switch
                        checked={form.sms}
                        onChange={(e) =>
                          handleFormChange("sms", e.target.checked)
                        }
                        size="small"
                      />
                    }
                    label="Enable SMS Notifications"
                  />

                  <TextField
                    label="SMS Number"
                    fullWidth
                    size="small"
                    disabled={!form.sms}
                    value={form.smsNo}
                    onChange={(e) =>
                      handleFormChange("smsNo", e.target.value)
                    }
                    placeholder="Enter SMS number"
                    margin="normal"
                  />
                </Paper>

                {/* Save Button */}
                <Box textAlign="right" mt={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    type="submit"
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      px: 3,
                      py: 1,
                      fontWeight: 600,
                      boxShadow: "0 2px 8px rgba(25,118,210,0.3)",
                    }}
                  >
                    Save Status
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
