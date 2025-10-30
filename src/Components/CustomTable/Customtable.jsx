import React, { useState, useMemo } from "react";
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
  useTheme,
  alpha,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Add, Search, ChevronLeft, ChevronRight } from "@mui/icons-material";

const ReusableTable = ({
  title = "Data Table",
  subtitle = "Manage your data with ease.",
  icon = null,
  columns = [],
  data = [],
  onAddClick,
  onRowClick, // ✅ new prop
  addButtonLabel = "Add",
  searchPlaceholder = "Search…",
  rowsPerPageOptions = [5, 10, 25],
  maxHeight = 640,
}) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Optimized filtering
  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    const query = searchQuery.toLowerCase();
    return data.filter((row) =>
      Object.values(row).join(" ").toLowerCase().includes(query)
    );
  }, [data, searchQuery]);

  // ✅ Pagination logic
  const paginatedData = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const headerBg = alpha(theme.palette.primary.main, 0.07);
  const hoverBg = alpha(theme.palette.primary.main, 0.04);

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: { xs: 1, md: 2 },
        overflow: "hidden",
        background: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        transition: "all 0.2s",
        "&:hover": { boxShadow: 4 },
      }}
    >
      {/* ================= Header ================= */}
      <Box
        sx={{
          p: 3,
          background: theme.palette.background.default,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        {/* Icon + Title */}
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 2 }}>
          {icon && (
            <Box
              sx={{
                p: 1.5,
                background: alpha(theme.palette.primary.main, 0.1),
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "& svg": { fontSize: 28, color: theme.palette.primary.main },
              }}
            >
              {icon}
            </Box>
          )}
          <Box>
            <Typography variant="h5" fontWeight={700}>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
              {subtitle}
            </Typography>
          </Box>
        </Box>

        {/* Search + Add */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1.5,
            alignItems: "stretch",
          }}
        >
          <TextField
            size="small"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              flex: 1,
              minWidth: { xs: "100%", sm: 300 },
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
                background: theme.palette.background.paper,
                "&:hover": {
                  background: alpha(theme.palette.action.hover, 0.05),
                },
              },
              "& .MuiInputBase-input": {
                py: 1.5,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          {onAddClick && (
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={onAddClick}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 1,
                px: 3,
                boxShadow: "none",
                "&:hover": { boxShadow: 4 },
                whiteSpace: "nowrap",
                minWidth: "fit-content",
              }}
            >
              {addButtonLabel}
            </Button>
          )}
        </Box>
      </Box>

      {/* ================= Table ================= */}
      <TableContainer sx={{ maxHeight }}>
        <Table stickyHeader size="medium">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  align={col.align || "left"}
                  sx={{
                    fontWeight: 600,
                    background: headerBg,
                    color: theme.palette.text.primary,
                    py: 1.5,
                    whiteSpace: "nowrap",
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, idx) => (
                <TableRow
                  hover
                  key={idx}
                  onClick={() => onRowClick && onRowClick(row)} // ✅ click handler
                  sx={{
                    cursor: onRowClick ? "pointer" : "default",
                    "&:hover": { backgroundColor: hoverBg },
                    transition: "background 0.15s",
                  }}
                >
                  {columns.map((col) => (
                    <TableCell
                      key={col.id}
                      align={col.align || "left"}
                      sx={{ py: 1.8 }}
                    >
                      {col.render ? col.render(row) : row[col.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 6 }}>
                  <Typography color="text.secondary" variant="body2">
                    No records found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ================= Pagination ================= */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
          borderTop: `1px solid ${theme.palette.divider}`,
          background: theme.palette.background.default,
        }}
      >
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleRowsPerPage}
          labelRowsPerPage="Rows:"
          sx={{
            ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows": {
              fontSize: "0.875rem",
            },
          }}
          ActionsComponent={({ onPageChange, page, count }) => {
            const lastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);
            return (
              <Box sx={{ display: "flex", gap: 0.5 }}>
                <Tooltip title="Previous">
                  <span>
                    <IconButton
                      onClick={(e) => onPageChange(e, page - 1)}
                      disabled={page === 0}
                      size="small"
                    >
                      <ChevronLeft />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="Next">
                  <span>
                    <IconButton
                      onClick={(e) => onPageChange(e, page + 1)}
                      disabled={page >= lastPage}
                      size="small"
                    >
                      <ChevronRight />
                    </IconButton>
                  </span>
                </Tooltip>
              </Box>
            );
          }}
        />
      </Box>
    </Paper>
  );
};

export default ReusableTable;
