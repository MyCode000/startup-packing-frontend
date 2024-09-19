import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Lottie from "lottie-react";
import { useCallback, useEffect, useState } from "react";
import emptyBox from "../assets/Animation/empty-box.json";
import {
  addToCartRequest,
  fetchCartRequest,
  removeFromCartRequest,
} from "../__api__/cart";
//recoil
import { useSetRecoilState } from "recoil";
import alertAtom from "../recoil/atoms/alertAtom";
import CheckuotPopUp from "../Components/__cartPage/CheckoutPopUp";
import { PATH_SITE } from "../routes/paths";
import { useNavigate } from "react-router-dom";

//-----------------------------------------------------------------------

function CartPage() {
  const triggerAlert = useSetRecoilState(alertAtom);
  const [cartData, setCartData] = useState();
  const [checkoutPopUp, triggerCheckoutPopUp] = useState(false);
  const navigate = useNavigate();

  const fetchCartData = useCallback(async () => {
    fetchCartRequest()
      .then((response) => {
        setCartData(response);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          triggerAlert({
            isOpen: true,
            isSuccess: false,
            message: "You should login first",
          });
          navigate(PATH_SITE.home);
        } else {
          triggerAlert({
            isOpen: true,
            isSuccess: false,
            message: "Something went wrong",
          });
        }
        console.error("Error fetching Cart", error);
      });
  }, []);

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleIncreaseQuantity = (productId) => {
    addToCart(productId);
  };

  const handleDecreaseQuantity = (productId) => {
    removeFromCart(productId);
  };

  const isEmpty = !cartData || cartData?.cart_products_list?.length === 0;

  const addToCart = useCallback(async (product_id) => {
    addToCartRequest({ product_id: product_id })
      .then((response) => {
        fetchCartData();
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

  const removeFromCart = useCallback(async (product_id) => {
    removeFromCartRequest({ product_id: product_id })
      .then((response) => {
        fetchCartData();
      })
      .catch((error) => {
        triggerAlert({
          isOpen: true,
          isSuccess: false,
          message: "Some thing went wrong",
        });
        console.error("Error remove from Cart", error);
      });
  }, []);

  const openCheckoutPopUp = useCallback(async () => {
    triggerCheckoutPopUp(true);
  }, [cartData, fetchCartData]);

  return (
    <Box sx={{ my: { xs: 5, md: 15 } }}>
      {isEmpty ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Lottie animationData={emptyBox} style={{ width: 300 }} />
          <Typography variant="h3" sx={{ mt: 2, color: "#7776B3" }}>
            Your Cart is empty
          </Typography>
        </Box>
      ) : (
        <Box sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Your Cart
          </Typography>
          <Grid container spacing={3}>
            {cartData.cart_products_list.map((cartProduct) =>
              cartProduct.products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ height: 200, objectFit: "cover" }}
                      image={product.images[0]?.image}
                      alt={product.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6">{product.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.description}
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        Price: $
                        {product.is_offer ? product.offer_price : product.price}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mt: 2,
                        }}
                      >
                        <Typography variant="body1">
                          Amount: {cartProduct.amount}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <IconButton
                            size="small"
                            onClick={() => handleDecreaseQuantity(product.id)}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleIncreaseQuantity(product.id)}
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
          <Box sx={{ mt: 5, textAlign: "right" }}>
            <Typography variant="h5">
              Total Price: ${cartData.total_Price}
            </Typography>
            <Button
              onClick={openCheckoutPopUp}
              variant="contained"
              sx={{ mt: 2 }}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </Box>
      )}
      <CheckuotPopUp
        isTriggered={checkoutPopUp}
        closeHandler={() => triggerCheckoutPopUp(false)}
        cartData={cartData}
        updateHandler={fetchCartData}
      />
    </Box>
  );
}

export default CartPage;
