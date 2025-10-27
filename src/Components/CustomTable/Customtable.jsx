import React, { useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Add, Search } from "@mui/icons-material";

const ReusableTable = ({
  title = "Data Table",
  columns = [],
  data = [],
  onAddClick,
  addButtonLabel = "Add", // 👈 new prop for button name
  searchPlaceholder = "Search...",
  rowsPerPageOptions = [5, 10, 25],
  maxHeight = 640,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter data based on search
  const filteredData = data.filter((row) =>
    Object.values(row)
      .map((v) => (typeof v === "string" ? v : ""))
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      {/* Header Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          borderBottom: "1px solid #ddd",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h6" fontWeight={700} color="primary">
          {title}
        </Typography>

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <TextField
            size="small"
            variant="outlined"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              minWidth: { md: 400, xs: 150 },
              backgroundColor: "white",
              borderRadius: 2,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search sx={{ color: "action.active", cursor: "pointer" }} />
                </InputAdornment>
              ),
            }}
          />
          {onAddClick && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={onAddClick}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 2,
              }}
            >
              {addButtonLabel} {/* 👈 dynamic button text */}
            </Button>
          )}
        </Box>
      </Box>

      {/* Table */}
      <TableContainer sx={{ maxHeight }}>
  <Table stickyHeader>
    <TableHead>
      <TableRow>
        {columns.map((col) => (
          <TableCell
            key={col.id}
            align={col.align || "left"}
            sx={{
              fontWeight: 600,
              backgroundColor: "#f5f5f5",
              whiteSpace: "nowrap",
            }}
          >
            {col.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {paginatedData.length > 0 ? (
        paginatedData.map((row, index) => (
          <TableRow
            hover
            key={index}
            sx={{
              backgroundColor: index % 2 === 0 ? "#fafafa" : "#ffffff",
            }}
          >
            {columns.map((col) => (
              <TableCell key={col.id} align={col.align || "left"}>
                {/* If a render function is provided, use it */}
                {col.render ? col.render(row) : row[col.id]}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} align="center">
            <Typography color="text.secondary" sx={{ py: 2 }}>
              No records found
            </Typography>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
</TableContainer>


      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ReusableTable;
