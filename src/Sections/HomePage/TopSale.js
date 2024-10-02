//react
import React, { useCallback, useEffect, useState } from "react";
//MUI
import { Box, Typography } from "@mui/material";
//splide
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css"; // Import Splide CSS
//component
import TopSaleCard from "../../Components/__homepage/TopSaleCard";
//__api__
import { fetchProductsRequest } from "../../__api__/products";

//-------------------------------------------------------

function TopSale({ isDetails }) {
  const [topSaleData, setTopSaleData] = useState();

  // Fetch TopSale data
  const fetchTopSaleData = useCallback(async () => {
    fetchProductsRequest()
      .then((response) => {
        setTopSaleData(response.slice(0, 5)); // Limit to the first 5 items
      })
      .catch((error) => {
        console.error("Error fetching TopSale", error);
      });
  }, []);

  // Fetch data on mount
  useEffect(() => {
    fetchTopSaleData();
  }, []);

  return (
    <Box sx={{ my: { xs: 2, md: 10 }, px: { xs: 2, md: 5 } }}>
      {isDetails ? (
        <Typography variant="h4">You can also buy from our best</Typography>
      ) : (
        <Typography
          sx={{
            textAlign: "center",
            mb: { xs: 0, md: 3 },
            fontSize: { xs: "2.5rem", sm: "4rem", md: "6rem" }, // h3-like size for xs, h1-like for md
            fontWeight: "bold", // Adjust font weight as per your h1/h3 styling
          }}
        >
          Choose your Packing
        </Typography>
      )}

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
        {topSaleData?.map((topSale, index) => (
          <SplideSlide key={index}>
            <Box sx={{ py: 5 }}>
              <TopSaleCard product={topSale} />
            </Box>
          </SplideSlide>
        ))}
      </Splide>
    </Box>
  );
}

export default TopSale;
