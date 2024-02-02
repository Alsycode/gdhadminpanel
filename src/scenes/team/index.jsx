import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useEffect,useState } from "react";

const Team = () => {
  const authToken = '0363d4c937bd2e7c7685bf62567fba601eea82d8dad4b13bb443175c1ce7ef343e157963dbb0a1622c35622632e8ce8013717f3b7c12b250c3c699dc26228a70c450d3f7703b161e1c63df37f92fd0bc4d9b2566bcf9fdf8127105b2efda85b0359cae361815ca6ac7dcc8c476dc4aaf672c129ae93794bd4f3db862b37e32f9';
const templeApiUrl = 'https://bookseva-backend-7w338.ondigitalocean.app/api/temple-lists?populate=*';

const [teamData,setTeamData] = useState([])
const [newData,setNewData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(templeApiUrl, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Data:', data);
        const templeData = data.data.map(item => ({
          nameinenglish: item.attributes.nameinenglish,
          nameinmalayalam: item.attributes.nameinmalayalam,
          district: item.attributes.district,
          email: item.attributes.email,
          id:item.id
        }));
  setNewData(templeData);
        console.log('Temple Data:', templeData);
        setTeamData(data);
        // Handle the fetched data as needed
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors
      }
    };

    fetchData();
  }, [])
  console.log("teamData",teamData)
  console.log("newData",newData)
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
      <Header title="Temple List" subtitle="Manage temples in the database" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        {/* Pass the fetched temple data (newData) to the DataGrid component */}
        <DataGrid checkboxSelection rows={newData} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;