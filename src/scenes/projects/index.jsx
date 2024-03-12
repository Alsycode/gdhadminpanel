import React from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTempleData } from "../../components/context";
import { userData } from "../../helpers";
import { useState,useEffect } from "react";
const Projects = () => {
  const navigate = useNavigate();
  const user = userData();
  console.log("ddddddddddddd",user)
  const { projectData } = useTempleData();
  const [projects,setProjects] = useState([]);
  const [local,setLocal] = useState([]);
  useEffect(() => {
    // This effect will run once when the component mounts
    // and whenever projectData changes
    setLocal(projectData);
  }, [projectData]);


//   const one = projectone?.data[0];
//   console.log("one",one)
useEffect(() => {
    // This effect will run whenever local changes
    if (local?.data) {
      const formattedData = local?.data?.map((project) => ({
        id: project.id,
        name: project.attributes.name,
        owner: project.attributes.owner,
        sector: project.attributes.sector,
        categories: project.attributes.categories,
        slug: project.attributes.slug,
      }));
      setProjects(formattedData);
    }
  }, [local]);
//   setProjects(formattedData);
   console.log("projectData",projects)
  const handleNavigateToForm = () => {
    navigate("/projectform");
  };
  const handleRowClick = (params) => {
    const { slug } = params.row;
    navigate(`/projectedit/${slug}`); // Navigate to editblogs page with the slug value as a parameter
  };

  const columns = [
     { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "owner",
      headerName: "owner",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "sector",
      headerName: "Sector",
      flex: 1,
    },
    {
      field: "categories",
      headerName: "Categories",
      flex: 1,
    },
    {
        field: "slug",
        headerName: "Slug",
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
            <DataGrid checkboxSelection rows={projects} columns={columns} onRowClick={handleRowClick} />
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

export default Projects;
