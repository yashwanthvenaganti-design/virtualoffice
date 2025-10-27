import React from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Link,
    Paper,
} from "@mui/material";

export default function ForgotPassword() {
    return (
        <Box
            sx={{
                backgroundColor: "#fff",
                minHeight: "90vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: "url('/background-pattern.png')", // optional
                backgroundSize: "cover",
                p:2
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    width: 360,
                    p: 4,
                    borderRadius: 2,
                    textAlign: "center",
                }}
            >
                {/* Logo */}
                <Typography
                    variant="h4"
                    sx={{
                        color: "#000",
                        fontWeight: 700,
                        mb: 1,
                        "& span": { color: "#e91e63" },
                    }}
                >
                    allday<span>PA</span>
                </Typography>

                {/* Heading */}
                <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "#e91e63", mb: 2 }}
                >
                    FORGOT DETAILS
                </Typography>

                <Typography variant="body2" sx={{ mb: 3 }}>
                    Please enter your details to reset your password.
                </Typography>

                {/* Form Fields */}
                <Box component="form" noValidate autoComplete="off">
                    <Typography
                        sx={{ fontWeight: 600, color: "#e91e63", fontSize: 14, mb: 0.5, textAlign: "left" }}
                    >
                        VIRTUAL OFFICE NAME: *
                    </Typography>
                    <TextField
                        fullWidth
                        placeholder="Virtual Office Name"
                        variant="outlined"
                        size="small"
                        sx={{ mb: 2 }}
                    />

                    <Typography
                        align="left"
                         sx={{ fontWeight: 600, color: "#e91e63", fontSize: 14, mb: 0.5, textAlign: "left" }}
                    >
                        USERNAME: *
                    </Typography>
                    <TextField
                        fullWidth
                        placeholder="Username"
                        variant="outlined"
                        size="small"
                        sx={{ mb: 3 }}
                    />

                    {/* Submit Button */}
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            backgroundColor: "#1976d2",
                            textTransform: "none",
                            py: 1,
                            fontSize: 16,
                            "&:hover": { backgroundColor: "#125ea2" },
                        }}
                    >
                        Reset password
                    </Button>
                </Box>

                {/* Footer link */}
                <Typography variant="body2" sx={{ mt: 3 }}>
                    <Link href="/login" sx={{ color: "#e91e63", fontWeight: 600 }}>
                        REMEMBERED YOUR LOGIN? CLICK HERE
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
}
