import React, { useEffect, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AccessTimeFilled } from "@mui/icons-material"; // ⏰
import ReusableTable from "../../Components/CustomTable/Customtable";
import { getData, postData } from "../../Axios/Axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../Helpers/SnackBar/Snackbar";

export default function AvailableStatus() {
  const [statusData, setStatusData] = useState([]);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar() || {};

  const columns = [
    { id: "name", label: "Status Name" },
    { id: "availability", label: "Availability" },
    { id: "telNo", label: "Tel No" },
    { id: "emailAddr", label: "E-mail" },
    { id: "sms", label: "SMS" },
    { id: "action", label: "Action" },
  ];

  const getStatus = async () => {
    try {
      const response = await getData("/availabilities/viewStatuses");
      if (response?.data) {
        const mappedData = response.data.map((item) => ({
          name: item.name || "—",
          availability: item.availability || "—",
          telNo: item.telNo || "—",
          emailAddr: item.emailAddr || "—",
          sms: item.sms ? "Yes" : "No",
          availabilitiesId: item.availabilitiesId, 
        }));
        setStatusData(mappedData);
      }
    } catch (error) {
      console.error("Error fetching statuses:", error);
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  const handleDelete = async(id) => {
   try{
    const response = await postData("/availabilities/deleteStatuses", [ id ]);
    console.log("Delete Status Response:", response);
    getStatus();
    showSnackbar("Status deleted successfully!", "success");
   }
   catch(error){
    console.error("Error deleting status:", error);
    showSnackbar("Failed to delete status. Please try again.", "error");
   } 
  };

  const tableData = statusData.map((row) => ({
    ...row,
    action: (
      <Tooltip title="Delete">
        <IconButton
          color="error"
          size="small"
          onClick={() => handleDelete(row.availabilitiesId)}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    ),
  }));

  const handleAddStatus = () => {
    navigate("/availabilities/add-status");
  };

  return (
    <ReusableTable
      title="Availability Statuses"
      icon={<AccessTimeFilled />}
      columns={columns}
      data={tableData}
      onAddClick={handleAddStatus}
      searchPlaceholder="Search by status name, email, or availability..."
      addButtonLabel="Add Status"
    />
  );
}
