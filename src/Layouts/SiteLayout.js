// MUI
import { Box } from "@mui/material";
// react-router-dom
import { Outlet } from "react-router-dom";
//react
import { useState } from "react";

//-----------------------------------------------------

function SiteLayout() {
  return (
    <Box>
      <Outlet />
    </Box>
  );
}

export default SiteLayout;
