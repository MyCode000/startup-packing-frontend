import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Avatar,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useState, useCallback } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Iconify from "../Components/Iconify";
import TopSale from "../Sections/HomePage/TopSale";
//__api__
import { addToCartRequest } from "../__api__/cart";
//recoil
import { useSetRecoilState } from "recoil";
import alertAtom from "../recoil/atoms/alertAtom";

//-------------------------------------------------------------------------------------------

function ProductDetailsPage() {
  const location = useLocation();
  const { product } = location.state || {}; // Access the product from state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const triggerAlert = useSetRecoilState(alertAtom);

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

  const addToCart = useCallback(async () => {
    addToCartRequest({ product_id: product.id })
      .then((response) => {
        triggerAlert({
          isOpen: true,
          isSuccess: true,
          message: "Item added to cart",
        });
      })
      .catch((error) => {
        triggerAlert({
          isOpen: true,
          isSuccess: false,
          message: "Some thing went wrong",
        });
        console.error("Error add to Cart", error);
      });
  }, []);

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
            onClick={addToCart}
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
