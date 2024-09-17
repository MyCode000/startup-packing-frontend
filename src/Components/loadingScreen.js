//MUI
import { Box, Typography } from "@mui/material";
//lottie-react
import Lottie from "lottie-react";
//assets
import loading from "../assets/Animation/loading.json";

//--------------------------------------------------

function LoadingScreen() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Lottie animationData={loading} style={{ width: 300 }} />
    </Box>
  );
}

export default LoadingScreen;
