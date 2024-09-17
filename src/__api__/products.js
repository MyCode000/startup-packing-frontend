import axiosInstance from "./axios";

export const fetchProductsRequest = async () =>
  axiosInstance
    .get("/products/products-handler")
    .then((response) => response.data);
