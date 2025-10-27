import React, { useState } from "react";
import {
    Box,
    Grid,
    Typography,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    Divider,
} from "@mui/material";

export default function AddVip() {
    const [formData, setFormData] = useState({
        title: "",
        forename: "",
        surname: "",
        sex: "",
        company_name: "",
        tel_no: "",
        tel_no_alt: "",
        email_addr: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("VIP Form Data:", formData);
        alert("Form submitted successfully!");
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                background: "#fff",
                p: 4,
                borderRadius: 2,
                boxShadow: 3,
                maxWidth: "auto",
                mx: "auto",
            }}
        >
            {/* Header */}
            <Typography variant="h5" sx={{ color: "#e91e63", fontWeight: 600, mb: 3 }}>
                Add VIP
            </Typography>

            <Grid container spacing={2}>
                {/* Left Column */}
                <Grid size={{ xs: 12, md: 6,lg:6 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        Personal Details
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    {/* Title */}
                    <FormControl fullWidth sx={{ mb: 2 }}>
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
                                "Master",
                                "Dr",
                                "Professor",
                                "Captain",
                                "Colonel",
                                "Lord",
                                "Lady",
                                "Major",
                                "Rev",
                                "Sir",
                                "Sister",
                                "Hon",
                            ].map((t) => (
                                <MenuItem key={t} value={t}>
                                    {t}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Forename */}
                    <TextField
                        fullWidth
                        required
                        label="Forename"
                        name="forename"
                        value={formData.forename}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />

                    {/* Surname */}
                    <TextField
                        fullWidth
                        required
                        label="Surname"
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />

                    {/* Sex */}
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Sex</InputLabel>
                        <Select
                            name="sex"
                            value={formData.sex}
                            onChange={handleChange}
                            label="Sex"
                        >
                            <MenuItem value="">Select</MenuItem>
                            <MenuItem value="F">Female</MenuItem>
                            <MenuItem value="M">Male</MenuItem>
                            <MenuItem value="U">Unspecified</MenuItem>
                        </Select>
                    </FormControl>

                </Grid>

                {/* Right Column */}
                <Grid size={{ xs: 12, md: 6 ,lg:6}}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        Company & Contact Details
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    <TextField
                        fullWidth
                        required
                        label="Company Name"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        required
                        label="Telephone Number"
                        name="tel_no"
                        value={formData.tel_no}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="Alternate Telephone Number"
                        name="tel_no_alt"
                        value={formData.tel_no_alt}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="E-mail Address"
                        name="email_addr"
                        value={formData.email_addr}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                </Grid>
            </Grid>


            <Box textAlign={{md:"left",xs:"center"}}>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        backgroundColor: "#007b42",
                        "&:hover": { backgroundColor: "#006837" },
                    }}
                >
                    Save
                </Button>
            </Box>
        </Box>
    );
}
