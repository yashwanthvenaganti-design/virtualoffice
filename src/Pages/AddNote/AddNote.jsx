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
} from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function AddNote() {
  const [formData, setFormData] = useState({
    kind: "",
    validFrom: null,
    validUntil: null,
    comment: "",
  });

  const [charCount, setCharCount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "comment") setCharCount(value.length);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, newValue) => {
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Note Data:", formData);
    alert("Note saved successfully!");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ maxWidth: ":auto", mx: "auto", p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Add a Note
        </Typography>
        <hr />

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Note Kind */}
            <Grid size={{xs:12}}>
              <FormControl fullWidth required>
                <InputLabel>Note Kind</InputLabel>
                <Select
                  name="kind"
                  value={formData.kind}
                  onChange={handleChange}
                  label="Note Kind"
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
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>

            {/* Valid Until */}
            <Grid size={{xs:12,sm:6}}>
              <DateTimePicker
                label="Valid Until"
                value={formData.validUntil}
                onChange={(newValue) => handleDateChange("validUntil", newValue)}
                format="YYYY-MM-DD HH:mm"
                slotProps={{ textField: { fullWidth: true } }}
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
                rows={6}
                fullWidth
                required
                inputProps={{ maxLength: 160 }}
                
              />
            </Grid>
          </Grid>

          

          <Box sx={{ mt: 3 }}>
            <Button variant="contained" color="success" type="submit">
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </LocalizationProvider>
  );
}
