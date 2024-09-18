import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Avatar,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Iconify from "../Components/Iconify";
import TopSale from "../Sections/HomePage/TopSale";

function ProductDetailsPage() {
  const location = useLocation();
  const { product } = location.state || {}; // Access the product from state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to handle image change
  const handleNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % product.images.length
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.images.length) % product.images.length
    );
  };

  return (
    <Box sx={{ my: 10, px: 2 }}>
      <Grid container spacing={5}>
        {/* Image Section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton onClick={handlePrevImage}>
            <ArrowBackIosIcon />
          </IconButton>
          <Box sx={{ position: "relative", width: "300px", height: "300px" }}>
            <img
              src={product.images[currentImageIndex].image}
              alt={product.name}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Box>
          <IconButton onClick={handleNextImage}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Grid>

        {/* Product Details Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {product.is_available ? "Available in stock" : "Out of stock"}
          </Typography>

          <Typography variant="body1" sx={{ mt: 2 }}>
            {product.description}
          </Typography>

          {/* Sizes */}
          <Typography variant="h6" sx={{ mt: 4 }}>
            Size:
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
            {product.sizes.map((size) => (
              <Button
                key={size.id}
                variant="outlined"
                size="small"
                sx={{ color: "black" }}
              >
                {size.size}
              </Button>
            ))}
          </Box>

          {/* Price */}
          <Typography variant="h4" sx={{ mt: 4 }}>
            {product.is_offer
              ? `${product.offer_price} LE`
              : `${product.price} LE`}
          </Typography>

          {/* Add to Cart Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 4, width: "100%", py: 2 }}
            startIcon={<Iconify icon="raphael:cart" />}
          >
            Add To Cart
          </Button>
        </Grid>
      </Grid>
      <TopSale isDetails={true} />
    </Box>
  );
}

export default ProductDetailsPage;
