// MUI
import { Box, Button, Card, Typography } from "@mui/material";
// iconify
import Iconify from "../Iconify";
import { useNavigate } from "react-router-dom";
import { PATH_SITE } from "../../../src/routes/paths";

//-------------------------------------------------------

function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(PATH_SITE.productDetails, {
      state: { product }, // Pass the product as state
    });
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        p: 1,
        bgcolor: "#F1F1F1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        width: "100%",
        cursor: "pointer",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <Box
        component="img"
        src={product.images[0].image}
        sx={{
          width: "90%",
          borderRadius: 10,
          height: 200,
        }}
      />
      <Typography variant="h5" sx={{ mt: 1 }}>
        {product.name}
      </Typography>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {product.price} EGP
      </Typography>
      <Button variant="contained" startIcon={<Iconify icon="raphael:cart" />}>
        Add to cart
      </Button>
    </Card>
  );
}

export default ProductCard;
