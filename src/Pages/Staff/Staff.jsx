import React, { useEffect, useState } from "react";
import ReusableTable from "../../Components/CustomTable/Customtable";
import { IconButton, Tooltip } from "@mui/material";
import { Delete, Group } from "@mui/icons-material";
import { getData, postData } from "../../Axios/Axios";
import { useSnackbar } from "../../Helpers/SnackBar/Snackbar";
import { useNavigate } from "react-router-dom";

export default function Staff() {
  const [staffData, setStaffData] = useState([]);
  const navigate = useNavigate();

  const { showSnackbar } = useSnackbar() || {};
  const getStaff = async () => {
    try {
      const response = await getData("/staff/viewStaff"); // adjust endpoint if needed
      console.log("Fetched staff:", response);

      if (response?.data?.length > 0) {
        const formatted = response.data.map((staff) => ({
          id: staff.peopleId,
          name: `${staff.title || ""} ${staff.forename || ""} ${staff.surname || ""}`.trim(),
          sex: staff.sex === "M" ? "Male" : staff.sex === "F" ? "Female" : staff.sex,
          availability: staff.availabilityStatus || "-",
          jobTitle: staff.jobTitle || "-",
          department: staff.department || "-",
          users: staff.usersCount || 0,
        }));

        setStaffData(formatted);
      } else {
        setStaffData([]);
        console.log("No staff data found.");
      }
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  };

  useEffect(() => {
    getStaff();
  }, []);

  // ✅ Handle Delete
  const handleDelete = async (staffId) => {
    try {
      const response = await postData("/staff/deleteStaff", [staffId]);
      console.log("Delete Staff Response:", response);
      showSnackbar("Staff deleted successfully!", "success");
      getStaff();
    }
    catch (error) {
      console.error("Error deleting staff:", error);
      showSnackbar("Failed to delete staff. Please try again.", "error");
    }
  };

  // ✅ Columns for the table
  const columns = [
    { id: "name", label: "Name" },
    { id: "sex", label: "Sex" },
    { id: "availability", label: "Availability" },
    { id: "jobTitle", label: "Job Title" },
    { id: "department", label: "Department" },
    { id: "users", label: "Users" },
    {
      id: "action",
      label: "Action",
      align: "center",
      render: (row) => (
        <Tooltip title="Delete Staff">
          <IconButton
            color="error"
            size="small"
            onClick={() => handleDelete(row.id)} // ✅ prints correct peopleId
          >
            <Delete />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const handleAddStaff = () => {
    navigate("/add-staff");
  };

  return (
    <ReusableTable
      title="Staff List"
      icon={<Group />} // 👥
      columns={columns}
      data={staffData} // ✅ using API data
      onAddClick={handleAddStaff}
      searchPlaceholder="Search by name, department, or job title..."
      addButtonLabel="Add Staff"
    />
  );
}
