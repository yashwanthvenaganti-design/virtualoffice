import React, { useState } from "react";
import ReusableTable from "../../Components/CustomTable/Customtable";
import { IconButton, Stack, Chip } from "@mui/material";
import { Delete, ArrowUpward, ArrowDownward } from "@mui/icons-material";

const columns = [
  { id: "name", label: "Name" },
  { id: "landmark", label: "Landmark" },
  { id: "companyTel", label: "Company Tel No" },
  { id: "address", label: "Addr Line 1" },
  { id: "postcode", label: "Postcode" },
  { id: "priority", label: "Priority" },
  { id: "actions", label: "Action" },
];

const initialData = [
  {
    name: "Primary address high",
    landmark: "London Eye",
    companyTel: "+1 234 567 890",
    address: "Test main road",
    postcode: "560102",
    priority: "High",
  },
  {
    name: "Primary address high",
    landmark: "Esher House",
    companyTel: "1212121211",
    address: "123 Main Street",
    postcode: "560102",
    priority: "High",
  },
  {
    name: "Test current addressessss high",
    landmark: "Test current City Park",
    companyTel: "9234567890",
    address: "Test main road",
    postcode: "Test3456",
    priority: "High",
  },
  {
    name: "Test present address high",
    landmark: "Test present City Park",
    companyTel: "1234567890",
    address: "Test main road",
    postcode: "Test3456",
    priority: "High",
  },
  {
    name: "Test previous address high",
    landmark: "test landmark",
    companyTel: "8888888888",
    address: "Test12345",
    postcode: "TEST12345",
    priority: "Low",
  },
  {
    name: "Test virtualoffice high",
    landmark: "Test current City Park",
    companyTel: "9234567890",
    address: "Test main road",
    postcode: "Test3456",
    priority: "High",
  },
];

export default function Addresses() {
  const [tableData, setTableData] = useState(initialData);
  const [sortConfig, setSortConfig] = useState({ key: "priority", direction: "desc" }); // Default: High first

  const handleDelete = (row) => {
    if (window.confirm(`Delete address: ${row.name}?`)) {
      setTableData((prev) => prev.filter((r) => r.name !== row.name));
    }
  };

  const handleSort = (key) => {
    setSortConfig((prev) => {
      // Toggle between asc/desc
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      } else {
        return { key, direction: "asc" };
      }
    });
  };

  const sortedData = [...tableData].sort((a, b) => {
    const { key, direction } = sortConfig;

    if (key === "priority") {
      const order = { High: 2, Low: 1 };
      return direction === "asc"
        ? order[a.priority] - order[b.priority]
        : order[b.priority] - order[a.priority];
    }

    // Generic alphabetical sort for text columns
    const valueA = a[key]?.toString().toLowerCase() || "";
    const valueB = b[key]?.toString().toLowerCase() || "";
    if (valueA < valueB) return direction === "asc" ? -1 : 1;
    if (valueA > valueB) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const getPriorityChip = (priority) => (
    <Chip
      label={priority}
      color={priority === "High" ? "success" : "default"}
      size="small"
    />
  );

  const enhancedData = sortedData.map((row) => ({
    ...row,
    priority: getPriorityChip(row.priority),
    actions: (
      <Stack direction="row" spacing={1}>
        <IconButton color="error" onClick={() => handleDelete(row)}>
          <Delete />
        </IconButton>
      </Stack>
    ),
  }));

  // Add sorting icons dynamically in headers
  const sortableColumns = columns.map((col) => {
    if (col.id === "actions") return col;

    return {
      ...col,
      label: (
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          sx={{ cursor: "pointer" }}
          onClick={() => handleSort(col.id)}
        >
          <span>{col.label}</span>
          {sortConfig.key === col.id ? (
            sortConfig.direction === "asc" ? (
              <ArrowUpward fontSize="small" />
            ) : (
              <ArrowDownward fontSize="small" />
            )
          ) : null}
        </Stack>
      ),
    };
  });

  return (
    <ReusableTable
      title="Your Addresses"
      columns={sortableColumns}
      data={enhancedData}
      searchPlaceholder="Search by name, landmark, or postcode..."
    />
  );
}
