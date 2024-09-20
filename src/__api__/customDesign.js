import axiosInstance from "./axios";

export const createCustomDesignRequest = async (requestData) =>
  axiosInstance
    .post("/custom-design/create-custom-design", requestData)
    .then((response) => response.data);
