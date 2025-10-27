import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextareaAutosize,
  Paper,
} from "@mui/material";
import { CommentOutlined } from "@mui/icons-material";

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: "",
    tel_no: "",
    email_addr: "",
    department: "",
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mt: 2,
        borderRadius: 3,
      }}
    >
      {/* --- Header --- */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <CommentOutlined sx={{ mr: 1, color: "#1976d2", fontSize: 30 }} />
        <Typography variant="h5" fontWeight={600}>
          Feedback Form
        </Typography>
      </Box>

      {/* --- Form --- */}
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Typography variant="h6" color="text.primary">
            About You
          </Typography>

          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            InputProps={{ readOnly: true }}
            required
          />

          <TextField
            label="Tel no"
            name="tel_no"
            value={formData.tel_no}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            label="Email address"
            name="email_addr"
            value={formData.email_addr}
            onChange={handleChange}
            fullWidth
            required
          />

          {/* --- Department Dropdown --- */}
          <FormControl fullWidth required>
            <InputLabel>Department</InputLabel>
            <Select
              name="department"
              value={formData.department}
              onChange={handleChange}
              label="Department"
            >
              <MenuItem value="billing">Billing</MenuItem>
              <MenuItem value="customerservice">Customer Service</MenuItem>
              <MenuItem value="sales">Sales</MenuItem>
              <MenuItem value="it">Bug Report</MenuItem>
            </Select>
          </FormControl>

          {/* --- Comments --- */}
          <Box sx={{width:{xs:"95%",md:"98%"}}}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Comments
            </Typography>
            <TextareaAutosize
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              minRows={6}
              style={{
                width: "100%",
                fontSize: "1rem",
                padding: "12px",
                borderRadius: "8px",
                borderColor: "#ccc",
                outline: "none",
              }}
              required
            />
          </Box>

          {/* --- Submit --- */}
          <Box sx={{display:"flex",justifyContent:{xs:"center",md:"left"}}}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{
                px: 4,
                py: 1,
                fontSize: 16,
                textTransform: "none",
                borderRadius: 2,
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </form>
    </Paper>
  );
}
