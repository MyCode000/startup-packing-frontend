// React
import React from "react";
//mui
import { Box } from "@mui/material";
// react-router-dom
import { useLocation } from "react-router-dom";
// Component
import HorizontalNavbar from "./horizontal";
import VerticalDrawer from "./vertical";

import { PATH_SITE } from "../../../src/routes/paths";

//-------------------------------------------------------------

export default function Navbar() {
  const location = useLocation(); // React Router's hook to get the current path

  const isAuthPath = location.pathname.includes("auth"); // Check if the path includes "auth"

  if (isAuthPath) {
    return null; // Return nothing if the path includes "auth"
  }

  const navLinks = [
    { name: "Home", path: PATH_SITE.home },
    { name: "Products", path: "/products" },
    { name: "About us", path: "" },
    { name: "Contact us", path: "" },
  ];

  return (
    <Box>
      {/* HorizontalNavbar for larger screens */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <HorizontalNavbar navLinks={navLinks} />
      </Box>
      {/* VerticalDrawer for smaller screens */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <VerticalDrawer navLinks={navLinks} />
      </Box>
    </Box>
  );
}
