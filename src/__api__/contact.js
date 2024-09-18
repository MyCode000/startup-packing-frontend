import axiosInstance from "./axios";

export const sendMailRequest = async (requestData) =>
  axiosInstance
    .post("/mails/send-mail", requestData)
    .then((response) => response.data);
