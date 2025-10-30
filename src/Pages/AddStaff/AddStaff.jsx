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
import { postData } from "../../Axios/Axios";
import { useSnackbar } from "../../Helpers/SnackBar/Snackbar";
import { useNavigate } from "react-router-dom";

export default function AddStaff() {
  const [formData, setFormData] = useState({
    title: "",
    forename: "",
    surname: "",
    sex: "",
    jobTitle: "",
    department: "",
    cc: false,
    defaultTelNo: "",
    defaultEmailAddr: "",
    searchable: true,
    confidential: false,
  });

  const { showSnackbar } = useSnackbar(); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await postData("/staff/addStaff", formData);
      console.log("Add Staff Response:", response);
      showSnackbar("Staff member added successfully!", "success");
      navigate("/staff");

    }
    catch(error){
      console.error("Error adding staff member:", error);
      showSnackbar("Failed to add staff member. Please try again.", "error");
    }
  };

  return (
    <Box sx={{ maxWidth: "auto", mx: "auto", p: 2 ,mb:6}}>
      <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
        <form onSubmit={handleSubmit}>
          {/* Personal Details */}
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Personal Details
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Title</InputLabel>
                <Select
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  label="Title"
                >
                  <MenuItem value="">Select one</MenuItem>
                  {["Mr", "Mrs", "Miss", "Ms", "Dr", "Professor"].map(
                    (title) => (
                      <MenuItem key={title} value={title}>
                        {title}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Forename"
                name="forename"
                value={formData.forename}
                onChange={handleChange}
                fullWidth
                size="small"
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                fullWidth
                size="small"
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size="small">
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

          {/* Company Details */}
          <Box sx={{ my: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Company Details
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Job Title*"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  required
                />
              </Grid>
            </Grid>
          </Box>

          {/* Defaults */}
          <Box sx={{ my: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Defaults (Not displayed to PAs)
            </Typography>
            <Alert severity="info" sx={{ mb: 2 }}>
              Default information is not displayed to PAs — used only if no other
              means of contact are available.
            </Alert>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Default Telephone Number"
                  name="defaultTelNo"
                  value={formData.defaultTelNo}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Default Email Address"
                  name="defaultEmailAddr"
                  value={formData.defaultEmailAddr}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  required
                />
              </Grid>
            </Grid>
          </Box>

          {/* Advanced Settings */}
          <Accordion
            sx={{
              borderRadius: 2,
              boxShadow: "none",
              border: "1px solid #e0e0e0",
              mt: 1,
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>Modify Advanced Settings</Typography>
            </AccordionSummary>

            <AccordionDetails sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* CC */}
              <FormControl>
                <Typography variant="subtitle1">
                  Allow this staff member to see all company messages?
                </Typography>
                <RadioGroup
                  name="cc"
                  value={formData.cc ? "true" : "false"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      cc: e.target.value === "true",
                    }))
                  }
                >
                  <FormControlLabel value="true" control={<Radio />} label="Yes" />
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>

              {/* Confidential */}
              <FormControl>
                <Typography variant="subtitle1">
                  Is this staff member’s information confidential?
                </Typography>
                <RadioGroup
                  name="confidential"
                  value={formData.confidential ? "true" : "false"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      confidential: e.target.value === "true",
                    }))
                  }
                >
                  <FormControlLabel value="true" control={<Radio />} label="Yes" />
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>

              {/* Searchable */}
              <FormControl>
                <Typography variant="subtitle1">
                  Should this staff member appear in your staff list?
                </Typography>
                <RadioGroup
                  name="searchable"
                  value={formData.searchable ? "true" : "false"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      searchable: e.target.value === "true",
                    }))
                  }
                >
                  <FormControlLabel value="true" control={<Radio />} label="Yes" />
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>

          {/* Submit */}
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{ px: 4, py: 1 }}
            >
              Save
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
