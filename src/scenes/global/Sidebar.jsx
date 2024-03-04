import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import LogoutIcon from "@mui/icons-material/Logout"; 
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../helpers";
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { logout } = useAuth(); // Access the logout function from the AuthContext
  
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        border: "none",
        borderRadius: "10px",
        marginBottom: "10px",
        padding: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 6px 8px rgba(0, 0, 0, 0.15)",
        marginRight: "20px", // Add margin to the right
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const handleLogout = () => {
    logoutUser();
    // Additional logout logic, such as redirecting to the login page
    window.location.reload(); // Reload the page after logout
  }
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: '#9e4b06',
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Go Digital Hub
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="120px"
                  height="40px"
                  src={`../../assets/gdhlogo.png`}
                  style={{ cursor: "pointer", borderRadius: "10%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Bussiness Growth Accelerated
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Home"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Temple Entry"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Updates"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             {/* <Item
              title="form"
              to="/form"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
           <MenuItem
            onClick={handleLogout}
            icon={<LogoutIcon />}
            style={{
              color: colors.grey[100],
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              border: "none",
              borderRadius: "10px",
              marginBottom: "10px",
              padding: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 6px 8px rgba(0, 0, 0, 0.15)",
              marginRight: "20px", // Add margin to the right
            }}
          >
            <Typography>Logout</Typography>
          </MenuItem>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
