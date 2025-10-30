import React, { useEffect, useState } from "react";
import ReusableTable from "../../Components/CustomTable/Customtable";
import { IconButton, Tooltip } from "@mui/material";
import { Delete, Star } from "@mui/icons-material";
import { getData, postData } from "../../Axios/Axios";
import { useSnackbar } from "../../Helpers/SnackBar/Snackbar";
import { useNavigate } from "react-router-dom";

const Vip = () => {
  const [vipData, setVipData] = useState([]);
  const { showSnackbar } = useSnackbar() || {};
  const navigate = useNavigate();

  // ✅ Navigate to Add VIP page
  const handleAddContact = () => {
    navigate("/add-vip");
  };

  // ✅ Handle Delete Click
  const handleDelete = async(vipId) => {
    console.log("Delete VIP with ID:", vipId);
    try{
      const response = await postData("/vips/deleteVips", [ vipId ]);
      console.log("Delete VIP Response:", response);
      showSnackbar("VIP deleted successfully!", "success");
      getVips();
    }
    catch(error){ 
      console.error("Error deleting VIP:", error);
      showSnackbar("Failed to delete VIP. Please try again.", "error");
    } 
  };

  // ✅ Fetch VIP Data
  const getVips = async () => {
    try {
      const response = await getData("/vips/viewVips");
      console.log("VIPs API Response:", response);

      if (response?.data) {
        const formatted = response.data.map((vip) => ({
          id: vip.vipsId, // ✅ store ID for easy access
          name: `${vip.title || ""} ${vip.forename || ""} ${vip.surname || ""}`.trim(),
          sex: vip.sex === "M" ? "Male" : vip.sex === "F" ? "Female" : vip.sex,
          company: vip.companyName || "-",
          tel: vip.telNo || "-",
          email: vip.emailAddr || "-",
          status: vip.status || "-",
        }));
        setVipData(formatted);
      } else {
        setVipData([]);
        showSnackbar?.("No VIPs found", "info");
      }
    } catch (error) {
      console.error("Failed to fetch VIPs:", error);
      showSnackbar?.("Failed to fetch VIP list!", "error");
    }
  };

  // ✅ Load on Mount
  useEffect(() => {
    getVips();
  }, []);

  // ✅ Table Columns
  const columns = [
    { id: "name", label: "Name" },
    { id: "sex", label: "Sex" },
    { id: "company", label: "Company Name" },
    { id: "tel", label: "Tel No" },
    { id: "email", label: "E-mail Addr" },
    {
      id: "status",
      label: "Action",
      align: "center",
      render: (row) => (
        <Tooltip title="Delete VIP">
          <IconButton
            color="error"
            onClick={() => handleDelete(row.id)} // ✅ fixed here
            size="small"
          >
            <Delete />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <ReusableTable
      title="VIP List"
      icon={<Star />}
      columns={columns}
      data={vipData}
      onAddClick={handleAddContact}
      addButtonLabel="Add VIP"
      searchPlaceholder="Search by name, company, or email..."
    />
  );
};

export default Vip;
