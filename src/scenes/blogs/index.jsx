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
  const { blogData } = useTempleData();
  const [projects,setProjects] = useState([]);
  const [local,setLocal] = useState([]);
  useEffect(() => {
    // This effect will run once when the component mounts
    // and whenever projectData changes
    setLocal(blogData);
  }, [blogData]);


//   const one = projectone?.data[0];
//   console.log("one",one)
useEffect(() => {
    // This effect will run whenever local changes
    if (local?.data) {
      const formattedData = local?.data?.map((project) => ({
        id: project.id,
        author: project?.attributes?.author,
        date: project?.attributes?.date,
        title: project?.attributes?.title,
        slug: project?.attributes?.slug,
        // categories: project.attributes.categories,
      }));
      setProjects(formattedData);
    }
  }, [local]);
//   setProjects(formattedData);
   console.log("projectData",projects)
   console.log("local",local)
  const handleNavigateToForm = () => {
    navigate("/blogforms");
  };
  const handleRowClick = (params) => {
    const { slug } = params.row;
    navigate(`/editblogs/${slug}`); // Navigate to editblogs page with the slug value as a parameter
  };

  const columns = [
     { field: "id", headerName: "ID" },
    {
      field: "author",
      headerName: "Author",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },
    {
        field: "slug",
        headerName: "Slug",
        flex: 1,
      },
    // {
    //   field: "categories",
    //   headerName: "Categories",
    //   flex: 1,
    // },
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
            <DataGrid checkboxSelection rows={projects} columns={columns} onRowClick={handleRowClick}  />
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
