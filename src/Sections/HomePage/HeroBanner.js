import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
// Assets
import heroSvg from "../../assets/images/HomePage/heroSvg2.svg";
import box1 from "../../assets/images/HomePage/box1.png";
import box2 from "../../assets/images/HomePage/box2.png";
import box3 from "../../assets/images/HomePage/box3.png";
// Iconify
import Iconify from "../../Components/Iconify";
import { PATH_SITE } from "../../routes/paths";
// Fonts
import "@fontsource/poppins";
import "@fontsource/akaya-kanadaka"; // Font import for styling

//------------------------------------------------------------------
function HeroBanner() {
  const [boxes, setBoxes] = useState([box1, box2, box3]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBoxes((prevBoxes) => {
        const newBoxes = [...prevBoxes];
        newBoxes.unshift(newBoxes.pop());
        return newBoxes;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        mt: { xs: 2, md: 10 },
        mb: 5,
        px: 2,
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        // تعديل التدرج لإزالة الخط الفاصل بين اللونين مع الحفاظ على الأبيض في الحواف
        background: "linear-gradient(to bottom, #FFFFFF 0%, #DC92A3 40%, #DC92A3 60%, #FFFFFF 100%)", 
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Grid container spacing={5} sx={{ position: "relative", zIndex: 1 }}>
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
            <Typography
              variant="h2"
              sx={{ fontFamily: "'Akaya Kanadaka', sans-serif", color: "#ffff" }}
            >
              Tailored solutions
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "'Akaya Kanadaka', sans-serif",
                color: "#ffff", // تغيير اللون هنا
              }}
            >
              crafted for your brand.
            </Typography>
            <Button
              href={PATH_SITE.products}
              variant="contained"
              sx={{
                mt: 2,
                color: "#ffff",
                backgroundColor: "#ff694",
                "&:hover": { backgroundColor: "#f4da2" },
              }}
              endIcon={<Iconify icon="ri:shopping-bag-line" />}
            >
              Shop Now
            </Button>
          </Box>
        </Grid>

        {/* Right Section - Box Images */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: "100%",
              backgroundImage: `url(${heroSvg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
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
        <Box
  component="img"
  src={boxes[0]}
  sx={{
    border: "2px solid #ffffff",
    width: { xs: "80%", sm: "70%" },
    borderRadius: "50%", // تطبيق border-radius بنسبة 50%
    transition: "transform 0.3s ease, border 0.3s ease", // إضافة انتقال للحدود
    "&:hover": {
      transform: "scale(1.1)",
    },
  }}
/>

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
                <Box
                  component="img"
                  src={boxes[1]}
                  sx={{
                    border: "2px solid #ffffff",
                    width: { xs: "80%", sm: "70%" },
                    borderRadius: "50%", // تطبيق border-radius بنسبة 50%
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                />
                <Box
                  component="img"
                  src={boxes[2]}
                  sx={{
                    border: "2px solid #ffffff",
                    width: { xs: "80%", sm: "70%" },
                    mt: 5,
                    borderRadius: "50%", // تطبيق border-radius بنسبة 50%
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HeroBanner;
