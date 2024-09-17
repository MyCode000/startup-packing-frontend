// MUI
import { Box } from "@mui/material";
// react-router-dom
import { Outlet } from "react-router-dom";
//component
import Navbar from "../Components/Header/index";
import Footer from "../Components/Footer";

//-----------------------------------------------------

function SiteLayout() {
  return (
    <Box>
      <Navbar />
      <Outlet />
      <Footer />
    </Box>
  );
}

export default SiteLayout;
