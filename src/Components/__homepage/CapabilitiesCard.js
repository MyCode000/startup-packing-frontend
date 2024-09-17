//MUI
import { Box, Grid, Typography } from "@mui/material";
import Iconify from "../Iconify";

//-------------------------------------------------------

function CapabilitiesCard({ icon, title, content }) {
  return (
    <Box
      sx={{
        display: "flex",
        borderRadius: 5,
        p: 3,
        cursor: "default",
        transition: "transform 0.3s, box-shadow 0.3s", // Smooth transition
        "&:hover": {
          transform: "scale(1.05)", // Slightly increase the size
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)", // Add shadow effect
        },
      }}
    >
      <Box
        sx={{
          border: 2, // Border thickness
          borderColor: "primary.main", // Use the primary color from the theme
          borderRadius: 25, // Adjust the border-radius (can be customized)
          display: "flex",
          justifyContent: "center",
          alignItems: "center", // Center the icon inside the box
          width: 300,
          height: 60,
          p: 1,
          mr: 1,
        }}
      >
        <Iconify icon={icon} sx={{ width: 50, height: 50 }} />
      </Box>
      <Box>
        <Typography variant="h5">{title}</Typography>
        <Typography sx={{ color: "black" }}>{content}</Typography>
      </Box>
    </Box>
  );
}

export default CapabilitiesCard;
