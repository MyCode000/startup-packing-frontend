// MUI
import { Box, Button, Card, Typography } from "@mui/material";
// iconify
import Iconify from "../Iconify";
//
import { useNavigate } from "react-router-dom";
//path
import { PATH_AUTH, PATH_SITE } from "../../routes/paths";
//react
import { useCallback } from "react";
//__api__
import { addToCartRequest } from "../../__api__/cart";
//recoil
import { useSetRecoilState } from "recoil";
import alertAtom from "../../recoil/atoms/alertAtom";
//-------------------------------------------------------

function ProductCard({ product }) {
  const triggerAlert = useSetRecoilState(alertAtom);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(PATH_SITE.productDetails, {
      state: { product }, // Pass the product as state
    });
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
        if (error.response.status === 401) {
          triggerAlert({
            isOpen: true,
            isSuccess: false,
            message: "You should login first",
          });
          navigate(PATH_AUTH.login);
        } else {
          triggerAlert({
            isOpen: true,
            isSuccess: false,
            message: "Something went wrong",
          });
        }
        console.error("Error add to Cart", error);
      });
  }, []);

  return (
    <Card
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
        onClick={handleClick}
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
      <Button
        onClick={addToCart}
        variant="contained"
        startIcon={<Iconify icon="raphael:cart" />}
      >
        Add to cart
      </Button>
    </Card>
  );
}

export default ProductCard;
