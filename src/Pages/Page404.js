//MUI
import { Box, Typography } from "@mui/material";
//lottie-react
import Lottie from "lottie-react";
//assets
import emptyBox from "../assets/Animation/empty-box.json";

//--------------------------------------------------

function Page404() {
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
      <Lottie animationData={emptyBox} style={{ width: 300 }} />
      <Typography variant="h3" sx={{ mt: 2, color: "#7776B3" }}>
        Nothing Found
      </Typography>
    </Box>
  );
}

export default Page404;
