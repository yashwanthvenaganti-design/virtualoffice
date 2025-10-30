import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import { postData, putData } from "../../Axios/Axios";

export default function Company() {
  const [formData, setFormData] = useState({
    fullName: "",
    activity: "",
    emailAddr: "",
    url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await putData("/companies/updateCompany", formData);
      console.log("Company Response:", response);
    }
    catch(error){
      console.error("Error adding company:", error);
    }
  
  };

  return (
    <Box
      sx={{
        maxWidth: "auto",
        mx: "auto",
        p: 3,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Company
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2}>
          {/* Full Name */}
          <Grid size={{xs:12,sm:6}}>
            <TextField
              label="Full Company Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Activity */}
          <Grid size={{xs:12,sm:6}}>
            <TextField
              label="Activity"
              name="activity"
              value={formData.activity}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Email Address */}
          <Grid size={{xs:12,sm:6}}>
            <TextField
              label="Email Address"
              name="emailAddr"
              value={formData.emailAddr}
              onChange={handleChange}
              type="email"
              fullWidth
              required
            />
          </Grid>

          {/* Web Address / URL */}
          <Grid size={{xs:12,sm:6}}>
            <TextField
              label="Web Address"
              name="url"
              value={formData.url}
              onChange={handleChange}
              fullWidth
              placeholder="https://example.com"
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{ width: 150 }}
          >
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
