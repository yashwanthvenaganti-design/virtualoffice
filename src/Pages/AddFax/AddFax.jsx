import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";

export default function AddFax() {
  const [formData, setFormData] = useState({
    name: "John Doe",
    kind: "",
    method: "",
    destination: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.kind || !formData.method) {
      alert("Please fill all required fields!");
      return;
    }
    alert(
      `✅ Saved!\nCommunication Type: ${formData.kind}\nMethod: ${formData.method}\nDestination: ${formData.destination}`
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        p: { xs: 2, sm: 4 },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 4 },
          width: "100%",
          maxWidth: 800,
          borderRadius: 3,
        }}
      >
        {/* Header */}
        <Typography variant="h5" fontWeight={600} mb={1}>
          {formData.name}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Personal Detail
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
          {/* Communication Type */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="kind-label">Communication Type *</InputLabel>
            <Select
              labelId="kind-label"
              id="kind"
              name="kind"
              label="Communication Type *"
              value={formData.kind}
              onChange={handleChange}
              required
            >
              <MenuItem value="">Select one</MenuItem>
              <MenuItem value="Fax to Email">Fax to Email</MenuItem>
              <MenuItem value="Email Notification">Email Notification</MenuItem>
              <MenuItem value="SMS Alert">SMS Alert</MenuItem>
              <MenuItem value="Device Notification">Device Notification</MenuItem>
            </Select>
          </FormControl>

          {/* Delivery Method */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="method-label">Delivery Method *</InputLabel>
            <Select
              labelId="method-label"
              id="method"
              name="method"
              label="Delivery Method *"
              value={formData.method}
              onChange={handleChange}
              required
            >
              <MenuItem value="">Select one</MenuItem>
              <MenuItem value="email">E-mail</MenuItem>
              <MenuItem value="sms">SMS</MenuItem>
              <MenuItem value="notification_notifications_id">
                Notification (Device)
              </MenuItem>
              <MenuItem value="notification_people_id">
                Notification (Staff)
              </MenuItem>
            </Select>
          </FormControl>

          {/* Destination (Conditional Rendering) */}
          {(formData.method === "email" || formData.method === "sms") && (
            <FormControl fullWidth sx={{ mb: 3 }}>
              <TextField
                id="destination"
                name="destination"
                label="Destination *"
                value={formData.destination}
                onChange={handleChange}
                required
              />
            </FormControl>
          )}

          {/* Save Button */}
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button
              variant="contained"
              color="success"
              type="submit"
              sx={{
                width: { xs: "100%", sm: "50%" },
                borderRadius: 2,
                fontWeight: 600,
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
