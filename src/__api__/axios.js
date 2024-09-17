"use client";
import axios from "axios";

// http://127.0.0.1:8000
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

// // Interceptor to handle responses and token refresh
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const originalRequest = error.config;

//     if (error.response.status === 401) {
//       if (typeof window !== "undefined") {
//         window.location.href = "/auth/login/";
//         localStorage.removeItem("access_token");
//         localStorage.removeItem("refresh_token");
//       }
//       return Promise.reject(error);
//     }

//     if (
//       error.response.data.code === "token_not_valid" &&
//       error.response.status === 401 &&
//       error.response.statusText === "Unauthorized"
//     ) {
//       const refreshToken =
//         typeof window !== "undefined"
//           ? localStorage.getItem("refresh_token")
//           : null;

//       if (refreshToken) {
//         const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));
//         const now = Math.ceil(Date.now() / 1000);

//         if (tokenParts.exp > now) {
//           return customInstance
//             .post("/api/token/refresh/", { refresh: refreshToken })
//             .then((response) => {
//               if (typeof window !== "undefined") {
//                 localStorage.setItem("access_token", response.data.access);
//                 localStorage.setItem("refresh_token", response.data.refresh);
//               }

//               axiosInstance.defaults.headers.Authorization = `JWT ${response.data.access}`;
//               originalRequest.headers.Authorization = `JWT ${response.data.access}`;

//               return axiosInstance(originalRequest);
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//         }
//       } else {
//         console.log("Refresh token not available.");
//         if (typeof window !== "undefined") {
//           window.location.href = "/auth/login/";
//         }
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
