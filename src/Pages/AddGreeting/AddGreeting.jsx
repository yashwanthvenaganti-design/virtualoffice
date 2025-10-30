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
import { postData } from "../../Axios/Axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../Helpers/SnackBar/Snackbar";

export default function AddGreetingProfile() {
  const [formData, setFormData] = useState({
    name: "",
    greeting: "",
    salutation: true, 
  });
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "salutation" ? value === "true" : value;

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name.trim(),
      greeting: formData.greeting.trim(),
      salutation: formData.salutation,
    };
    try {
      const response = await postData("/greetings/addGreeting", payload);
      console.log(response);
      showSnackbar("Greeting profile added successfully!", "success");
      navigate("/greetings");
    }
    catch (error) {
      console.error("Error adding greeting profile:", error);
      showSnackbar("Failed to add greeting profile. Please try again.", "error");
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        maxWidth: "auto",
        mx: "auto",
        p: 2.5,
        borderRadius: 2,
        mt: 3,
      }}
    >
      <form onSubmit={handleSubmit}>
        {/* Profile Section */}
        <Typography variant="h6" gutterBottom fontWeight={600}>
          Profile
        </Typography>
        <Divider sx={{ mb: 1.5 }} />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g., Primary, Secondary, or Weekend"
            size="small"
          />
        </FormControl>

        {/* Greeting Section */}
        <Typography variant="h6" gutterBottom fontWeight={600}>
          Greeting
        </Typography>
        <Divider sx={{ mb: 1.5 }} />

        <FormControl fullWidth sx={{ mb: 1 }}>
          <TextField
            label="Text for the PA to read*"
            name="greeting"
            value={formData.greeting}
            onChange={handleChange}
            required
            multiline
            rows={4}
            inputProps={{ maxLength: 160 }}
            placeholder="Your greeting - e.g., Welcome to VirtualOffice!"
            size="small"
          />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", textAlign: "right", mt: 0.5 }}
          >
            {160 - formData.greeting.length} characters remaining
          </Typography>
        </FormControl>

        {/* Salutation Dropdown */}
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }} fontWeight={600}>
          Display Salutation
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel size="small">Display Salutation</InputLabel>
          <Select
            name="salutation"
            label="Display Salutation"
            value={formData.salutation.toString()}
            onChange={handleChange}
            size="small"
          >
            <MenuItem value="true">On</MenuItem>
            <MenuItem value="false">Off</MenuItem>
          </Select>
        </FormControl>

        {/* Save Button */}
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ textAlign: "left" }}>
          <Button
            variant="contained"
            color="success"
            type="submit"
            size="small"
            sx={{ px: 3, py: 0.7 }}
          >
            Save
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
