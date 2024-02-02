import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState,useEffect } from "react"
const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [updates,setUpdates] = useState([]);
  const [newUpdates,setNewUpdates] = useState([]);
   useEffect(() => {
 
    const authToken = '0363d4c937bd2e7c7685bf62567fba601eea82d8dad4b13bb443175c1ce7ef343e157963dbb0a1622c35622632e8ce8013717f3b7c12b250c3c699dc26228a70c450d3f7703b161e1c63df37f92fd0bc4d9b2566bcf9fdf8127105b2efda85b0359cae361815ca6ac7dcc8c476dc4aaf672c129ae93794bd4f3db862b37e32f9';
    const updatesApiUrl = 'https://bookseva-backend-7w338.ondigitalocean.app/api/updates?populate=*';
    const fetchData = async () => {
      try {
        const response = await fetch(updatesApiUrl, {
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
        const newUpdatesData = data.data.map(item => ({
          id: item.id,
          createdAt: item.attributes.createdAt,
          title: item.attributes.title,
          description: item.attributes.description,
        }));

        console.log('newUpdates', newUpdatesData);

        // Set the newUpdates state
        setNewUpdates(newUpdatesData);
         console.log('newupdates', newUpdates);
        setUpdates(data);
        // Handle the fetched data as needed
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors
      }
    };

    fetchData();
  }, [])
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
  ];


  return (
    <Box m="20px">
      <Header
        title="Updates"
        subtitle="List of all Temple Updates"
      />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={newUpdates}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
