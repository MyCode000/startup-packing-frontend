//MUI
import { Box } from "@mui/material";
//sections
import HeroBanner from "../Sections/HomePage/HeroBanner";
import TopSale from "../Sections/HomePage/TopSale";
import Capabilities from "../Sections/HomePage/Capabilities";
import CustomDesign from "../Sections/HomePage/CustomDesign";

//--------------------------------------------------

function HomePage() {
  return (
    <Box>
      <HeroBanner />
      <TopSale />
      <Capabilities />
      <CustomDesign />
    </Box>
  );
}

export default HomePage;
