//MUI
import { Box, Button, Container, Grid, Typography } from "@mui/material";
//assets
import customImage from "../../assets/images/HomePage/customImage.jpg";
//react
import { useCallback } from "react";
//react-router-dom
import { useNavigate } from "react-router-dom";
//path
import { PATH_AUTH, PATH_SITE } from "../../routes/paths";
//recoil
import { useSetRecoilState } from "recoil";
import alertAtom from "../../recoil/atoms/alertAtom";

//-------------------------------------------------------

function CustomDesign() {
  const triggerAlert = useSetRecoilState(alertAtom);

  const navigate = useNavigate();

  const openCustomDesignPage = useCallback(async () => {
    if (localStorage.getItem("access_token")) {
      navigate(PATH_SITE.customDesign);
    } else {
      triggerAlert({
        isOpen: true,
        isSuccess: false,
        message: "You should Login",
      });
      navigate(PATH_AUTH.login);
    }
  }, []);

  return (
    <Box sx={{ my: 5 }}>
      <Typography
        sx={{
          textAlign: "center",
          mb: { xs: 2, md: 3 },
          fontSize: { xs: "3rem", sm: "4rem", md: "6rem" }, // h3-like size for xs, h1-like for md
          fontWeight: "bold", // Adjust font weight as per your h1/h3 styling
        }}
      >
        Make Your Custom Design
      </Typography>
      <Grid container>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box component="img" src={customImage} sx={{ width: "50%" }} />
        </Grid>
        <Grid item xs={12} md={6} sx={{ px: { xs: 2, md: 5 } }}>
          <Typography variant="h6" sx={{ color: "black" }}>
            You have the freedom to create your own custom box packaging,
            tailored exactly to your needs. Whether it's for branding, gifting,
            or shipping, you can choose the size, material, design, and even add
            your own logo or artwork. Our easy-to-use customization tools allow
            you to bring your vision to life, ensuring your packaging is as
            unique as your product. Start customizing today and make your
            packaging stand out!
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              onClick={openCustomDesignPage}
              variant="contained"
              sx={{ width: 300 }}
            >
              Get Started
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CustomDesign;
