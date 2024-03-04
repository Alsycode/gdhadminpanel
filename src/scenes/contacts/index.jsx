import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { userData } from "../../helpers";
const Contacts = () => {
  const theme = useTheme();
  const user = userData();
  const colors = tokens(theme.palette.mode);
  const [updates, setUpdates] = useState([]);
  const [newUpdates, setNewUpdates] = useState([]);
  const navigate = useNavigate();
  const handleNavigateToForm = () => {
    navigate("/updateform");
  };
  // const { userData } = useAuth();
  useEffect(() => {
    const authToken = '36d91d755f6933406f808c6bf39e61dfc5f91f83192d27953c1408254968d8370a23e758ffaa7a7aeefdebb91c21a8d6b7eb8dd771d427e6ee01f7e42e831681d35e263fc04f9209e5e02b6d5473a7899c896a983904eac92709ec1bb86fc2b726314bb0cebb7cfec92e46cd284328bf1a21e17736509a74b2ced35db5ef0265';
    const updatesApiUrl = 'http://localhost:1337/api/updates?populate=*';
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
        const newUpdatesData = data.data.map(item => ({
          id: item.id,
          createdAt: item.attributes.createdAt,
          title: item.attributes.title,
          description: item.attributes.description,
        }));

        setNewUpdates(newUpdatesData);
        setUpdates(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
  ];

  return (
    <Box m="20px">
      {user ? (
        <>
          <Header title="Updates" />

          <Box display="flex" justifyContent="flex-end" mb="10px">
            <Button
              variant="contained"
              color="primary"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                border: "none",
                color: "white",
                transition: "background-color 0.3s ease",
              }}
              onClick={handleNavigateToForm}
            >
              Add New Entry
            </Button>
          </Box>
          <Box
            m="40px 0 0 0"
            height="75vh"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "20px",
              padding: "20px",
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
          >
            <DataGrid
              rows={newUpdates}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
              autoHeight
            />
          </Box>
        </>
      ) : (
        <Box>
          <p>Please log in to access this feature.</p>
          {/* You can render a login prompt or redirect to the login page here */}
        </Box>
      )}
    </Box>
  );
};

export default Contacts;
