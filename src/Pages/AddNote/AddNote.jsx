import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Alert,
  Paper,
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { postData } from "../../Axios/Axios";
import { useSnackbar } from "../../Helpers/SnackBar/Snackbar";
import { useNavigate } from "react-router-dom";

export default function AddNote() {
  const [formData, setFormData] = useState({
    kind: "",
    validFrom: null,
    validUntil: null,
    comment: "",
  });
  const [charCount, setCharCount] = useState(0);
  const {showSnackbar} = useSnackbar();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "comment") setCharCount(value.length);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, newValue) => {
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      kind: formData.kind,
      validFrom: dayjs(formData.validFrom).toISOString(),
      validUntil: dayjs(formData.validUntil).toISOString(),
      comment: formData.comment.trim(),
    };

    try {
      const response = await postData("/notes/addNote", payload);
      console.log("Add Note Response:", response);
      showSnackbar("Note added successfully!", "success");
      handleReset();
      navigate("/notes");
    } catch (error) {
      console.error("Error adding note:", error); 
      showSnackbar("Failed to add note. Please try again.", "error");
    }
  };

  const handleReset = () => {
    setFormData({
      kind: "",
      validFrom: null,
      validUntil: null,
      comment: "",
    });
    setCharCount(0);
    
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          px: 2,
          py: 1,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: "auto",
            p: 3,
            borderRadius: 2,
            background: "linear-gradient(180deg, #fafafa 0%, #fff 100%)",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, mb: 1, color: "#1976d2" }}
          >
            📝 Add New Note
          </Typography>


          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Note Kind */}
              <Grid size={{xs:12,sm:6}}>
                <FormControl fullWidth required size="small">
                  <InputLabel>Note Kind</InputLabel>
                  <Select
                    name="kind"
                    value={formData.kind}
                    onChange={handleChange}
                    label="Note Kind"
                    sx={{ borderRadius: 1 }}
                  >
                    <MenuItem value="">Select one</MenuItem>
                    <MenuItem value="compliment">Compliment</MenuItem>
                    <MenuItem value="information">Information</MenuItem>
                    <MenuItem value="warning">Warning</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Valid From */}
              <Grid size={{xs:12,sm:6}}>
                <DateTimePicker
                  label="Valid From"
                  value={formData.validFrom}
                  onChange={(newValue) => handleDateChange("validFrom", newValue)}
                  format="YYYY-MM-DD HH:mm"
                  slotProps={{
                    textField: { fullWidth: true, size: "small" },
                  }}
                />
              </Grid>

              {/* Valid Until */}
              <Grid size={{xs:12,sm:6}}>
                <DateTimePicker
                  label="Valid Until"
                  value={formData.validUntil}
                  onChange={(newValue) =>
                    handleDateChange("validUntil", newValue)
                  }
                  format="YYYY-MM-DD HH:mm"
                  slotProps={{
                    textField: { fullWidth: true, size: "small" },
                  }}
                />
              </Grid>

              {/* Comments */}
              <Grid size={{xs:12}}>
                <TextField
                  label="Comments*"
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  fullWidth
                  required
                  inputProps={{ maxLength: 160 }}
                  helperText={`${charCount}/160 characters`}
                  size="small"
                />
              </Grid>
            </Grid>

            <Box
              sx={{
                mt: 3,
                display: "flex",
                justifyContent: "flex-end",
                gap: 1.5,
              }}
            >
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button variant="contained" color="primary" size="small" type="submit">
                Save Note
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
}
