"use client";
import axios from "axios";

// https://wishlist-backend-production-9dc0.up.railway.app  // http://127.0.0.1:8000
export const mainUrl = "http://127.0.0.1:8000";

// Function to create axios instance with necessary headers
const createAxiosInstance = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  return axios.create({
    baseURL: mainUrl,
    headers: {
      Authorization: token ? `JWT ${token}` : null,
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });
};

const axiosInstance = createAxiosInstance();
const customInstance = createAxiosInstance();

export default axiosInstance;
