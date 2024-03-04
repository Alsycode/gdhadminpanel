import React from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTempleData } from "../../components/context";
import { userData } from "../../helpers";
const Team = () => {
  const navigate = useNavigate();
  const user = userData();
  const { newData, templeData } = useTempleData();
  
  const handleNavigateToForm = () => {
    navigate("/form");
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "nameinenglish",
      headerName: "English Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "nameinmalayalam",
      headerName: "Malayalam Name",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "district",
      headerName: "District",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      { user ? (
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNavigateToForm}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              border: "none",
              color: "white",
              transition: "background-color 0.3s ease",
            }}
          >
            Add New Entry
          </Button>
          <Box m="40px 0 0 0" height="75vh">
            <DataGrid checkboxSelection rows={newData} columns={columns} />
          </Box>
        </Box>
      ) : (
        <Box>
          <p>Please log in to access this feature.</p>
          {/* You can render a login prompt or redirect to the login page here */}
        </Box>
      )}
    </Box>
  );
};

export default Team;
