import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { postData } from "../../Axios/Axios";
import { useSnackbar } from "../../Helpers/SnackBar/Snackbar";

export default function AddAddress() {
  const { showSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    landmark: "",
    telPrefix: "",
    telNo: "",
    telNoAlt: "",
    faxNo: "",
    emailAddr: "",
    addrLine1: "",
    addrLine2: "",
    addrLine3: "",
    town: "",
    county: "",
    postcode: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Make sure your country code is uppercase (backend might expect it)
      const payload = { ...formData, country: formData.country.toUpperCase() };

      const response = await postData("/addresses/addAddress", payload);

      showSnackbar("✅ Address added successfully!", "success");
      console.log("Add Address Response:", response);

      // Reset form
      setFormData({
        name: "",
        description: "",
        landmark: "",
        telPrefix: "",
        telNo: "",
        telNoAlt: "",
        faxNo: "",
        emailAddr: "",
        addrLine1: "",
        addrLine2: "",
        addrLine3: "",
        town: "",
        county: "",
        postcode: "",
        country: "",
      });
    } catch (error) {
      console.error("❌ Error adding address:", error);

      // Better error message handling
      const msg =
        error.response?.data?.message ||
        "Failed to add address. Please check all fields and try again.";
      showSnackbar(msg, "error");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 5 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        ➕ Add New Address
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Basic Info */}
          <Grid size={{xs:12,sm:6}}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid size={{xs:12,sm:6}}>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Contact Info */}
          <Grid size={{xs:12,sm:4}}>
            <TextField
              label="Tel Prefix"
              name="telPrefix"
              value={formData.telPrefix}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid size={{xs:12,sm:4}}>
            <TextField
              label="Telephone No"
              name="telNo"
              value={formData.telNo}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid size={{xs:12,sm:4}}>
            <TextField
              label="Alt Telephone No"
              name="telNoAlt"
              value={formData.telNoAlt}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid size={{xs:12,sm:6}}>
            <TextField
              label="Fax No"
              name="faxNo"
              value={formData.faxNo}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid size={{xs:12,sm:6}}>
            <TextField
              label="Email Address"
              name="emailAddr"
              value={formData.emailAddr}
              onChange={handleChange}
              fullWidth
              type="email"
            />
          </Grid>

          {/* Address Details */}
          <Grid size={{xs:12,sm:6}}>
            <TextField
              label="Address Line 1"
              name="addrLine1"
              value={formData.addrLine1}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid size={{xs:12,sm:6}}>
            <TextField
              label="Address Line 2"
              name="addrLine2"
              value={formData.addrLine2}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid size={{xs:12,sm:6}}>
            <TextField
              label="Address Line 3"
              name="addrLine3"
              value={formData.addrLine3}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Location Info */}
          <Grid size={{xs:12,sm:6}}>
            <TextField
              label="Town"
              name="town"
              value={formData.town}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid size={{xs:12,sm:6}}>
            <TextField
              label="County"
              name="county"
              value={formData.county}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid size={{xs:12,sm:6}}>
            <TextField
              label="Postcode"
              name="postcode"
              value={formData.postcode}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid size={{xs:12,sm:6}}>
            <TextField
              label="Country Code"
              name="country"
              value={formData.country}
              onChange={handleChange}
              fullWidth
              placeholder="e.g., GB, IN, US"
              inputProps={{ maxLength: 2 }}
            />
          </Grid>

          <Grid size={{xs:12,sm:6}}>
            <TextField
              label="Landmark"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>

        {/* Buttons */}
        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 4 }}>
          <Button type="submit" variant="contained" color="primary">
            Add Address
          </Button>

          <Button
            variant="outlined"
            onClick={() =>
              setFormData({
                name: "",
                description: "",
                landmark: "",
                telPrefix: "",
                telNo: "",
                telNoAlt: "",
                faxNo: "",
                emailAddr: "",
                addrLine1: "",
                addrLine2: "",
                addrLine3: "",
                town: "",
                county: "",
                postcode: "",
                country: "",
              })
            }
          >
            Clear
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
