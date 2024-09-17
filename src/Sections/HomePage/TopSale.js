import React from "react";
import { Box, Typography } from "@mui/material";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css"; // Import Splide CSS
import TopSaleCard from "../../Components/__homepage/TopSaleCard";

//-------------------------------------------------------

function TopSale() {
  const cards = [1, 2, 3, 4, 5]; // Array to simulate 5 cards

  return (
    <Box sx={{ my: 10, px: { xs: 2, md: 5 } }}>
      <Typography
        sx={{
          textAlign: "center",
          mb: { xs: 2, md: 3 },
          fontSize: { xs: "3rem", sm: "4rem", md: "6rem" }, // h3-like size for xs, h1-like for md
          fontWeight: "bold", // Adjust font weight as per your h1/h3 styling
        }}
      >
        Choose your Packing
      </Typography>

      <Splide
        aria-label="Top Sale Products"
        options={{
          type: "loop",
          perPage: 3,
          perMove: 1,
          focus: "center",
          breakpoints: {
            768: {
              perPage: 1,
              gap: "5rem",
              arrows: false,
            },
          },
        }}
      >
        {cards.map((_, index) => (
          <SplideSlide key={index}>
            <Box sx={{ py: 5 }}>
              <TopSaleCard />
            </Box>
          </SplideSlide>
        ))}
      </Splide>
    </Box>
  );
}

export default TopSale;
