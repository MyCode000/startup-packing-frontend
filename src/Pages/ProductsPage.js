import { useCallback, useEffect, useState } from "react";
// MUI
import { Box, Grid, Typography } from "@mui/material";
//section
import FilterSection from "../Sections/ProductsPage/FilterSection";
//__api__
import { fetchProductsRequest } from "../__api__/products";
//lottie-react
import Lottie from "lottie-react";
//assets
import emptyBox from "../assets/Animation/empty-box.json";
//component
import ProductCard from "../Components/__productsPage/ProductCard";

//--------------------------------------------------

function ProductsPage() {
  const [productsData, setProductsData] = useState();
  const [filterData, setFilterData] = useState();

  // Fetch Products data
  const fetchProductsData = useCallback(async () => {
    fetchProductsRequest(filterData)
      .then((response) => {
        setProductsData(response);
      })
      .catch((error) => {
        console.error("Error fetching Products", error);
      });
  }, [filterData]);

  // Fetch data on mount
  useEffect(() => {
    fetchProductsData();
  }, [fetchProductsData]);

  // Check if productsData is null or an empty array
  const isEmpty = !productsData || productsData.length === 0;

  return (
    <Grid
      container
      sx={{ mt: { xs: 5, md: 20 }, mb: 10, px: { xs: 2, md: 5 } }}
    >
      <Grid item xs={12} md={3}>
        <FilterSection setFilter={setFilterData} />
      </Grid>
      <Grid item xs={12} md={9}>
        <Box
          sx={{
            width: "100%",
            borderRadius: 5,
            display: "flex",
            justifyContent: { xs: "center", md: "start" },
            alignItems: "center",
            bgcolor: "#F1F1F1",
            p: 2,
          }}
        >
          <Typography variant="h4">Products</Typography>
        </Box>
        {isEmpty ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Lottie animationData={emptyBox} style={{ width: 300 }} />
          </Box>
        ) : (
          <Grid container spacing={5} sx={{ mt: { xs: 0, md: 2 } }}>
            {productsData.map((product) => (
              <Grid item xs={12} md={6} lg={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default ProductsPage;
