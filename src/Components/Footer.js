//MUI
import { Box } from "@mui/material";
//assets
import masterCard from "../assets/images/Footer/masterCard.png";
import visa from "../assets/images/Footer/visa.png";
import miza from "../assets/images/Footer/miza.png";
import Iconify from "./Iconify";

//-------------------------------------------------------------

function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#dc92a3",
        pb: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src={visa}
          sx={{
            width: 70,
          }}
        />
        <Box
          component="img"
          src={masterCard}
          sx={{
            width: 70,
            ml: 2,
          }}
        />
        <Box
          component="img"
          src={miza}
          sx={{
            width: 100,
          }}
        />
      </Box>
      <Box
        sx={{
          my: 2,
          mx: 5,
          py: 1,
          bgcolor: "primary.main",
          borderRadius: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Iconify
          icon="ic:twotone-facebook"
          sx={{ color: "white", width: 30, height: 30 }}
        />
        <Iconify
          icon="ri:twitter-x-line"
          sx={{ color: "white", width: 30, height: 30, mx: 5 }}
        />
        <Iconify
          icon="hugeicons:instagram"
          sx={{ color: "white", width: 30, height: 30 }}
        />
      </Box>
    </Box>
  );
}

export default Footer;
