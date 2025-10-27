import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  Alert,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function AddStaff() {
  const [formData, setFormData] = useState({
    title: "",
    forename: "",
    surname: "",
    sex: "",
    jobTitle: "",
    department: "",
    defaultTelNo: "",
    defaultEmailAddr: "",
    cc: "0",
    isConfidential: "1",
    isSearchable: "1",
    createAvailability: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Staff details saved successfully!");
  };

  return (
    <Box sx={{ maxWidth: "auto", mx: "auto", p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <form onSubmit={handleSubmit}>
          {/* Personal Details */}
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Personal Details
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={2}>
            <Grid size={{xs:12,sm:6}}>
              <FormControl fullWidth>
                <InputLabel>Title</InputLabel>
                <Select
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  label="Title"
                >
                  <MenuItem value="">Select one</MenuItem>
                  {[
                    "Mr",
                    "Mrs",
                    "Miss",
                    "Ms",
                    "Dr",
                    "Professor",
                    "Sir",
                    "Madam",
                  ].map((title) => (
                    <MenuItem key={title} value={title}>
                      {title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{xs:12,sm:6}}>
              <TextField
                label="Forename*"
                name="forename"
                value={formData.forename}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid size={{xs:12,sm:6}}>
              <TextField
                label="Surname*"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid size={{xs:12,sm:6}}>
              <FormControl fullWidth>
                <InputLabel>Sex</InputLabel>
                <Select
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  label="Sex"
                >
                  <MenuItem value="">Select one</MenuItem>
                  <MenuItem value="F">Female</MenuItem>
                  <MenuItem value="M">Male</MenuItem>
                  <MenuItem value="U">Unspecified</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ my: 4 }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Company Details
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2}>
              <Grid size={{xs:12,sm:6}}>
                <TextField
                  label="Job Title*"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid size={{xs:12,sm:6}}>
                <TextField
                  label="Department*"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ my: 4 }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Defaults (Not displayed to PAs)
            </Typography>
            <Alert severity="info" sx={{ mb: 2 }}>
              The default information is not displayed to PAs. It will only be used if
              we need to contact you and no other means are available.
            </Alert>

            <Grid container spacing={2}>
              <Grid size={{xs:12,sm:6}}>
                <TextField
                  label="Default Telephone Number*"
                  name="defaultTelNo"
                  value={formData.defaultTelNo}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid size={{xs:12,sm:6}}>
                <TextField
                  label="Default Email Address*"
                  name="defaultEmailAddr"
                  value={formData.defaultEmailAddr}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
          </Box>

         <Accordion
  sx={{
    borderRadius: 2,
    boxShadow: "none",
    border: "1px solid #e0e0e0",
    mt: 2,
  }}
>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <Typography fontWeight={600}>Modify Advanced Settings</Typography>
  </AccordionSummary>

  <AccordionDetails sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
    {/* Company messages */}
    <FormControl>
      <Typography variant="subtitle1" gutterBottom>
        Allow this staff member to see all company messages?
      </Typography>
      <RadioGroup
        name="cc"
        value={formData.cc}
        onChange={handleChange}
        row={false} // 👈 ensure vertical layout
      >
        <FormControlLabel value="1" control={<Radio />} label="Yes" />
        <FormControlLabel value="0" control={<Radio />} label="No" />
      </RadioGroup>
    </FormControl>

    {/* Confidential */}
    <FormControl>
      <Typography variant="subtitle1" gutterBottom>
        Is this staff member’s information confidential?
      </Typography>
      <RadioGroup
        name="isConfidential"
        value={formData.isConfidential}
        onChange={handleChange}
        row={false} // 👈 stacked layout
      >
        <FormControlLabel value="1" control={<Radio />} label="Yes" />
        <FormControlLabel value="0" control={<Radio />} label="No" />
      </RadioGroup>
    </FormControl>

    {/* Searchable */}
    <FormControl>
      <Typography variant="subtitle1" gutterBottom>
        Should this staff member appear in your staff list?
      </Typography>
      <RadioGroup
        name="isSearchable"
        value={formData.isSearchable}
        onChange={handleChange}
        row={false} // 👈 stacked layout
      >
        <FormControlLabel value="1" control={<Radio />} label="Yes" />
        <FormControlLabel value="0" control={<Radio />} label="No" />
      </RadioGroup>
    </FormControl>
  </AccordionDetails>
</Accordion>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{ px: 4, py: 1.2 }}
            >
              Save
            </Button>

            <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
              <Checkbox
                name="createAvailability"
                checked={formData.createAvailability}
                onChange={handleChange}
              />
              <Typography variant="body2">Create availability next</Typography>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
