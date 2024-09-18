import axiosInstance from "./axios";

export const fetchProductsRequest = async (filterData) =>
  axiosInstance
    .get("/products/products-handler", { params: filterData })
    .then((response) => response.data);

export const fetchInfoRequest = async () =>
  axiosInstance.get("/products/info-handler").then((response) => response.data);
