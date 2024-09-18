import axiosInstance from "./axios";

export const fetchCartRequest = async () =>
  axiosInstance.get("/carts/cart-handler").then((response) => response.data);

export const addToCartRequest = async (requestData) =>
  axiosInstance
    .post("/carts/add-to-cart", requestData)
    .then((response) => response.data);

export const removeFromCartRequest = async (requestData) =>
  axiosInstance
    .put("/carts/remove-from-cart", requestData)
    .then((response) => response.data);
