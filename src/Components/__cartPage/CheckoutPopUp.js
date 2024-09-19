import React, { useEffect } from "react";
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

// ------------------------------------------------------------------------------------------

function CheckuotPopUp({ isTriggered, closeHandler, cartData, updateHandler }) {
  const triggerAlert = useSetRecoilState(alertAtom);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      cart_id: "",
      payment_method: "",
      address: "",
      phone_number: "",
    },
    validationSchema: Yup.object().shape({
      payment_method: Yup.string().required("Payment method is required"),
      address: Yup.string().required("Address is required"),
      phone_number: Yup.string()
        .matches(/^[0-9]+$/, "Phone number must be only digits")
        .min(10, "Phone number should be at least 10 digits")
        .required("Phone number is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      await createOrderFromCartRequest(values)
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
            <FormControlLabel
              value="wallet"
              control={<Radio />}
              label="Wallet"
            />
            <FormControlLabel
              value="instapay"
              control={<Radio />}
              label="Instapay"
            />
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
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={closeHandler}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Confirm Order
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default CheckuotPopUp;
