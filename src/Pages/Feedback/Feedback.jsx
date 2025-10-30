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
import { postData } from "../../Axios/Axios";
import { useSnackbar } from "../../Helpers/SnackBar/Snackbar";

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: "",
    telNo: "",
    emailAddr: "",
    kind: "",
    comments: "",
  });

  const { showSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Feedback:", formData);

    try {
      const response = await postData("/support/addFeedback", formData);
      console.log("Response:", response);

      if (response?.status === 200 || response?.status === 201) {
        showSnackbar("Feedback submitted successfully!", "success");
        setFormData({
          name: "",
          telNo: "",
          emailAddr: "",
          kind: "",
          comments: "",
        });
      } else {
        showSnackbar("Failed to submit feedback. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      showSnackbar("An error occurred. Please try again later.", "error");
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        borderRadius: 2,
        mb: 1,
        backgroundColor: "#fff",
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <CommentOutlined sx={{ mr: 1, color: "#1976d2", fontSize: 26 }} />
        <Typography variant="h6" fontWeight={600}>
          Feedback Form
        </Typography>
      </Box>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5, // Reduced spacing
          }}
        >
          <Typography variant="subtitle1" color="text.primary">
            About You
          </Typography>

          <TextField
            size="small"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            size="small"
            label="Tel No"
            name="telNo"
            value={formData.telNo}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            size="small"
            label="Email Address"
            name="emailAddr"
            value={formData.emailAddr}
            onChange={handleChange}
            fullWidth
            required
          />

          <FormControl fullWidth required size="small">
            <InputLabel>Department</InputLabel>
            <Select
              name="kind"
              value={formData.kind}
              onChange={handleChange}
              label="Department"
            >
              <MenuItem value="billing">Billing</MenuItem>
              <MenuItem value="customerservice">Customer Service</MenuItem>
              <MenuItem value="sales">Sales</MenuItem>
              <MenuItem value="it">Bug Report</MenuItem>
            </Select>
          </FormControl>

          {/* Comments */}
          <Box sx={{ width: "100%" }}>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
              Comments
            </Typography>
            <TextareaAutosize
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              minRows={3} // reduced from 6 → 3
              style={{
                width: "100%",
                fontSize: "0.95rem",
                padding: "8px",
                borderRadius: "6px",
                borderColor: "#ccc",
                outline: "none",
              }}
              required
            />
          </Box>

          {/* Submit */}
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
              mt: 1,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{
                px: 3,
                py: 0.8,
                fontSize: 14,
                textTransform: "none",
                borderRadius: 1.5,
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
