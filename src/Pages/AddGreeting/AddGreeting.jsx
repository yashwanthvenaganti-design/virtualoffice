import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  Divider,
  Paper,
} from "@mui/material";

export default function AddGreetingProfile() {
  const [formData, setFormData] = useState({
    name: "",
    greeting: "",
    salutation: "1", // 1 = On, 0 = Off
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Greeting Profile Submitted:", formData);
    alert("Greeting profile saved successfully!");
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: "auto",
        mx: "auto",
        p: 4,
        borderRadius: 3,
        mt: 4,
      }}
    >
      <form onSubmit={handleSubmit}>
        {/* Profile Section */}
        <Typography variant="h5" gutterBottom>
          Profile
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <FormControl fullWidth sx={{ mb: 3 }}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Name of the profile - e.g., Primary, Secondary, or Weekend"
          />
        </FormControl>

        {/* Greeting Section */}
        <Typography variant="h5" gutterBottom>
          Greeting
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Text for the PA to read*"
            name="greeting"
            value={formData.greeting}
            onChange={handleChange}
            required
            multiline
            rows={6}
            inputProps={{ maxLength: 160 }}
            placeholder="Your greeting - e.g., Test Fullname, how may I help?"
          />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", textAlign: "right" }}
          >
            {160 - formData.greeting.length} characters remaining
          </Typography>
        </FormControl>

        {/* Salutation Dropdown */}
        <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
          Display Salutation
        </Typography>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Display Salutation</InputLabel>
          <Select
            name="salutation"
            label="Display Salutation"
            value={formData.salutation}
            onChange={handleChange}
          >
            <MenuItem value="1">On</MenuItem>
            <MenuItem value="0">Off</MenuItem>
          </Select>
        </FormControl>

        {/* Save Button */}
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ textAlign: "left" }}>
          <Button variant="contained" color="success" type="submit">
            Save
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
