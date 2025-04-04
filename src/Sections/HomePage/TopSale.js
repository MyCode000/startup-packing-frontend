import React, { useCallback, useEffect, useState } from "react";
// MUI components
import { Box, Typography } from "@mui/material";
// Splide for carousel
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css"; // Import Splide CSS
// Custom components
import TopSaleCard from "../../Components/__homepage/TopSaleCard";
// API request
import { fetchProductsRequest } from "../../__api__/products";
// Fonts
import "@fontsource/poppins";
import "@fontsource/akaya-kanadaka"; // Custom fonts
//_______________------------------------------_________________________
function TopSale({ isDetails }) {
  const [topSaleData, setTopSaleData] = useState([]); // State to store Top Sale products

  // Function to fetch Top Sale products from API
  const fetchTopSaleData = useCallback(async () => {
    try {
      const response = await fetchProductsRequest();
      setTopSaleData(response.slice(0, 5)); // Limit the response to the first 5 items
    } catch (error) {
      console.error("Error fetching TopSale data:", error);
    }
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    fetchTopSaleData();
  }, [fetchTopSaleData]);

  return (
    <Box sx={{ my: { xs: 2, md: 10 }, px: { xs: 2, md: 5 } }}>
      {/* Conditional rendering based on isDetails prop */}
      {isDetails ? (
        <Typography variant="h4">You can also buy from our best</Typography>
      ) : (
        <Typography
          sx={{
            fontFamily: "'Akaya Kanadaka', sans-serif", // Custom font for title
            color: "#f99ff", // Pinkish color
            textAlign: "center", // Centered text
            mb: { xs: 0, md: 3 }, // Margin bottom based on screen size
            fontSize: { xs: "2.5rem", sm: "4rem", md: "6rem" }, // Responsive font sizes
            fontWeight: "bold", // Bold title
          }}
        >
          Choose your Packing
        </Typography>
      )}

      {/* Splide carousel for displaying Top Sale products */}
      <Splide
        aria-label="Top Sale Products"
        options={{
          type: "loop", // Infinite loop of slides
          perPage: 3, // 3 slides per page on larger screens
          perMove: 1, // 1 slide moves per action
          focus: "center", // Center the active slide
          autoplay: true, // Enable autoplay
          interval: 3000, // 3-second interval for autoplay
          arrows: false, // Hide navigation arrows
          pagination: false, // Hide pagination dots
          breakpoints: {
            768: {
              perPage: 1, // 1 slide per page on smaller screens
              gap: "5rem", // Gap between slides
              arrows: false, // No arrows on small screens
            },
          },
        }}
      >
        {/* Map through the fetched Top Sale data and create a slide for each item */}
        {topSaleData?.map((topSale, index) => (
          <SplideSlide key={index}>
            <Box sx={{ py: 5 }}>
              <TopSaleCard product={topSale} /> {/* Custom component to display product details */}
            </Box>
          </SplideSlide>
        ))}
      </Splide>
    </Box>
  );
}

export default TopSale;
