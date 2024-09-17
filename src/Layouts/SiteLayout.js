// MUI
import { Box } from "@mui/material";
// react-router-dom
import { Outlet } from "react-router-dom";
//react
import { useState } from "react";
//component
import Navbar from "../Components/Header/index";

//-----------------------------------------------------

function SiteLayout() {
  return (
    <Box>
      <Navbar />
      <Outlet />
    </Box>
  );
}

export default SiteLayout;
