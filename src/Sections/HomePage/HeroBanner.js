// MUI
import { Box, Button, Grid, Typography } from "@mui/material";
// assets
import heroSvg from "../../assets/images/HomePage/heroSvg2.svg";
import box1 from "../../assets/images/HomePage/box1.png";
import box2 from "../../assets/images/HomePage/box2.png";
import box3 from "../../assets/images/HomePage/box3.png";
//iconify
import Iconify from "../../Components/Iconify";

//------------------------------------

function HeroBanner() {
  return (
    <Box
      sx={{
        mt: 10,
        mb: 5,
        px: 2,
        height: "100vh", // Set the height of the banner
      }}
    >
      <Grid container spacing={5}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ textAlign: "start" }}>
            <Typography variant="h3">Tailored solutions</Typography>
            <Typography variant="h3">crafted for your brand.</Typography>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              endIcon={<Iconify icon="ri:shopping-bag-line" />}
            >
              Shop Now
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: "100%",
              backgroundImage: `url(${heroSvg})`, // Set the SVG as background
              backgroundSize: "cover", // Make sure the SVG covers the entire box
              backgroundPosition: "center", // Center the background image
              backgroundRepeat: "no-repeat", // Prevent the image from repeating
            }}
          >
            <Grid container>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                }}
              >
                <Box component="img" src={box1} sx={{ width: "70%" }} />
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "start",
                }}
              >
                <Box component="img" src={box2} sx={{ width: "70%" }} />
                <Box component="img" src={box3} sx={{ width: "70%", mt: 5 }} />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HeroBanner;
