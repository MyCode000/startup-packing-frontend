import React, { useCallback, useEffect, useState } from "react";
// @mui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Avatar,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Box,
} from "@mui/material";
// Formik
import { useFormik } from "formik";
// Yup
import * as Yup from "yup";
//__api__
import { createOrderFromCartRequest } from "../../__api__/orders";
//recoil
import { useSetRecoilState } from "recoil";
import alertAtom from "../../recoil/atoms/alertAtom";
//react-router-dom
import { useNavigate } from "react-router-dom";
//routes
import { PATH_SITE } from "../../routes/paths";
import UploadAvatar from "../upload/UploadAvatar";
import { LoadingButton } from "@mui/lab";

// ------------------------------------------------------------------------------------------

function CheckuotPopUp({ isTriggered, closeHandler, cartData, updateHandler }) {
  const triggerAlert = useSetRecoilState(alertAtom);
  const navigate = useNavigate();
  const [filePreview, setFilePreview] = useState(null);

  // Function to convert image to base64 string (image bytes)
  const handleFileConversion = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // Extract MIME type from result and include it in base64 string
        const base64String = reader.result;
        const base64Data = base64String.split(",")[1]; // Remove the data URL prefix
        const mimeType = base64String.split(":")[1].split(";")[0]; // Extract MIME type
        resolve(`data:${mimeType};base64,${base64Data}`);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const formik = useFormik({
    initialValues: {
      cart_id: "",
      payment_method: "",
      address: "",
      phone_number: "",
      payment_image: null,
    },
    validationSchema: Yup.object().shape({
      payment_method: Yup.string().required("Payment method is required"),
      address: Yup.string().required("Address is required"),
      phone_number: Yup.string()
        .matches(/^[0-9]+$/, "Phone number must be only digits")
        .min(10, "Phone number should be at least 10 digits")
        .required("Phone number is required"),
      payment_image: Yup.mixed().required("Transaction  image is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      let formData = { ...values };

      // Convert image to base64 string if there is an image
      if (values.payment_image) {
        try {
          const paymentImageBytes = await handleFileConversion(
            values.payment_image
          );
          formData = {
            ...formData,
            payment_image: paymentImageBytes, // Store the base64 string with prefix
          };
        } catch (error) {
          console.error("Error converting image", error);
          triggerAlert({
            isOpen: true,
            isSuccess: false,
            message: "Error converting image",
          });
          return;
        }
      }

      await createOrderFromCartRequest(formData)
        .then((response) => {
          triggerAlert({
            isOpen: true,
            isSuccess: true,
            message: "Order set successfully",
          });
          resetForm();
          navigate(PATH_SITE.home);
          closeHandler();
        })
        .catch((error) => {
          console.log("Error placing order", error);
          triggerAlert({
            isOpen: true,
            isSuccess: false,
            message: "Something went wrong",
          });
        });
    },
  });

  const {
    values,
    setFieldValue,
    errors,
    touched,
    getFieldProps,
    handleSubmit,
    isSubmitting,
    dirty,
    handleChange,
  } = formik;

  useEffect(() => {
    setFieldValue("cart_id", cartData?.id);
    setFieldValue("address", cartData?.user?.address);
    setFieldValue("phone_number", cartData?.user?.phone_number);
  }, [cartData]);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue("payment_image", file);
        setFilePreview({
          ...file,
          preview: URL.createObjectURL(file),
        });
      }
    },
    [setFieldValue]
  );

  return (
    <Dialog
      open={isTriggered}
      onClose={closeHandler}
      fullWidth
      sx={{ zIndex: 100 }}
    >
      <form onSubmit={handleSubmit}>
        <DialogContent
          sx={{
            scrollbarWidth: "none", // For Firefox
            "&::-webkit-scrollbar": { display: "none" }, // For Chrome, Safari, and Opera
          }}
        >
          {/* Payment Method */}
          <Typography variant="h6" gutterBottom>
            Select Payment Method
          </Typography>
          <RadioGroup
            name="payment_method"
            value={values.payment_method}
            onChange={handleChange}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FormControlLabel
                value="wallet"
                control={<Radio />}
                label="Wallet"
              />

              {values.payment_method == "wallet" && (
                <Typography sx={{ color: "black" }}>01101000130</Typography>
              )}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FormControlLabel
                value="instapay"
                control={<Radio />}
                label="Instapay"
              />
              {values.payment_method == "instapay" && (
                <Typography sx={{ color: "black" }}>@insta</Typography>
              )}
            </Box>
          </RadioGroup>
          {touched.payment_method && errors.payment_method && (
            <Typography color="error">{errors.payment_method}</Typography>
          )}

          {/* Address */}
          <TextField
            label="Address"
            name="address"
            variant="standard"
            fullWidth
            sx={{
              marginTop: 1,
            }}
            value={values.address}
            onChange={(event) => setFieldValue("address", event.target.value)}
            {...getFieldProps("address")}
            error={Boolean(touched.address) && errors.address}
            helperText={Boolean(touched.address) && errors.address}
          />

          {/* Phone Number */}
          <TextField
            label="Phone Number"
            name="phone_number"
            variant="standard"
            fullWidth
            sx={{
              marginTop: 1,
            }}
            value={values.phone_number}
            onChange={(event) =>
              setFieldValue("phone_number", event.target.value)
            }
            {...getFieldProps("phone_number")}
            error={Boolean(touched.phone_number) && errors.phone_number}
            helperText={Boolean(touched.phone_number) && errors.phone_number}
          />

          {/* File Upload */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography variant="h6">Upload the transaction image</Typography>
            <Box>
              <UploadAvatar
                accept="image/*"
                file={filePreview}
                onDrop={handleDrop}
                error={Boolean(touched.payment_image && errors.payment_image)}
                caption={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: "auto",
                      display: "block",
                      textAlign: "center",
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                  </Typography>
                }
              />
            </Box>
            {touched.payment_image && errors.payment_image && (
              <Typography color="error">{errors.payment_image}</Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={closeHandler}>
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            loading={isSubmitting}
            disabled={!dirty}
            sx={{
              mr: { xs: 0, md: 3 },
              mb: { xs: 2, md: 0 },
              "&.Mui-disabled": {
                color: "GrayText", // Change the color to any you like
              },
            }}
          >
            Confirm payment
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default CheckuotPopUp;
