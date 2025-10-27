import React from "react";
import {
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import { Phone } from "@mui/icons-material";

export default function UsefulNumbers() {
  const numbers = [
    {
      title: "Billing",
      phones: "0345 056 1002 / 0161 909 6702",
      description:
        "For all invoice, billing or tariff related enquiries please contact our billing department where they will answer any questions you may have.",
    },
    {
      title: "Customer Service",
      phones: "0345 056 1234 / 0161 909 6934",
      description:
        "If you have a problem with the way we are capturing your details, maybe we capture too much information, or not enough? Or if you have any other problems, then please do not hesitate in contacting our customer service team.",
    },
    {
      title: "Sales",
      phones: "0345 056 8888 / 0161 909 6900",
      description:
        "If you would like to register additional accounts but you're not sure what requirements you need, please contact our friendly sales team, and they will strive to meet your every requirement for your new venture.",
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Title */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Phone sx={{ color: "#e91e63", mr: 1, fontSize: 28 }} />
        <Typography variant="h5" fontWeight={600}>
          Useful Numbers
        </Typography>
      </Box>

      {/* Cards */}
      <Grid container spacing={3}>
        {numbers.map((item, index) => (
          <Grid size={{xs:12,md:4}} key={index}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderTop: "4px solid #1976d2",
                boxShadow: 3,
                borderRadius: 2,
              }}
            >
              <CardHeader
                title={
                  <Typography
                    variant="h6"
                    align="center"
                    fontWeight={700}
                    sx={{ textTransform: "uppercase" }}
                  >
                    {item.title}
                  </Typography>
                }
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderBottom: "1px solid #ddd",
                  pb: 1,
                }}
              />
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  py: 3,
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    textTransform: "none",
                    px: 3,
                    py: 1.5,
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  {item.phones}
                </Button>
              </CardContent>
              <CardActions
                sx={{
                  borderTop: "1px solid #eee",
                  p: 2,
                  backgroundColor: "#fafafa",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
