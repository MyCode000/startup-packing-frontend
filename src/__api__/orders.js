import axiosInstance from "./axios";

export const createOrderFromCartRequest = async (requestData) =>
  axiosInstance
    .post("/orders/create-order-from-cart", requestData)
    .then((response) => response.data);
