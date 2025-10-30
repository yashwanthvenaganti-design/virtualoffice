import React, { useEffect, useState } from "react";
import ReusableTable from "../../Components/CustomTable/Customtable";
import { IconButton, Stack, Chip } from "@mui/material";
import {
  Delete,
  ArrowUpward,
  ArrowDownward,
  LocationOn,
} from "@mui/icons-material";
import { getData, postData } from "../../Axios/Axios";
import { useSnackbar } from "../../Helpers/SnackBar/Snackbar";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "name", label: "Name" },
  { id: "landmark", label: "Landmark" },
  { id: "companyTel", label: "Company Tel No" },
  { id: "address", label: "Address" },
  { id: "postcode", label: "Postcode" },
  { id: "priority", label: "Priority" },
  { id: "actions", label: "Action" },
];

export default function Addresses() {
  const [tableData, setTableData] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "priority",
    direction: "desc",
  });
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleDelete = async (row) => {
    try {
      const payload = [row]; 
      const response = await postData("/addresses/deleteAddresses", payload);
      console.log("Delete response:", response);
      getAddresses();
      showSnackbar("Address deleted successfully!", "success");
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };


  const handleSort = (key) => {
    setSortConfig((prev) => {
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

    const valueA = a[key]?.toString().toLowerCase() || "";
    const valueB = b[key]?.toString().toLowerCase() || "";
    if (valueA < valueB) return direction === "asc" ? -1 : 1;
    if (valueA > valueB) return direction === "asc" ? 1 : -1;
    return 0;
  });

  // 🔖 Chip for priority
  const getPriorityChip = (priority) => (
    <Chip
      label={priority}
      color={priority === "High" ? "success" : "default"}
      size="small"
    />
  );

  // ⚙️ Map API data into table rows
  const getAddresses = async () => {
    try {
      const response = await getData("/addresses/viewAddresses");
      console.log("Fetched addresses:", response);

      if (response?.data?.length) {
        const mapped = response.data.map((addr) => ({
          name: addr.name || "—",
          landmark: addr.landmark || "—",
          companyTel: addr.telNo || "—",
          address:
            [addr.addrLine1, addr.addrLine2, addr.addrLine3]
              .filter(Boolean)
              .join(", ") || "—",
          postcode: addr.postcode || "—",
          priority: "High", // defaulting since backend doesn't provide
          actions: (
            <Stack direction="row" spacing={1}>
              <IconButton color="error" onClick={() => handleDelete(addr.addressesId)}>
                <Delete />
              </IconButton>
            </Stack>
          ),
        }));

        setTableData(mapped);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  // 📦 Fetch on mount
  useEffect(() => {
    getAddresses();
  }, []);

  // 🧭 Add sorting icons in header labels
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
  
  const handleAddAddress = () => {
    navigate("/add-address");
  }
  
  return (
    <ReusableTable
      title="Your Addresses"
      icon={<LocationOn />} // 📍 Header icon
      columns={sortableColumns}
      data={sortedData.map((row) => ({
        ...row,
        priority: getPriorityChip(row.priority),
      }))}
      searchPlaceholder="Search by name, landmark, or postcode..."
       addButtonLabel="Add Address"
       onAddClick={handleAddAddress}
    />
  );
}
