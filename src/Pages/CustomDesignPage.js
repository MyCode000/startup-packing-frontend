//react
import React, { useState, useCallback } from "react";
// Formik and Yup
import { useFormik } from "formik";
import * as Yup from "yup";
// MUI
import {
  Box,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography,
  Grid,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// React Color
import { SketchPicker } from "react-color";
// Recoil
import { useSetRecoilState } from "recoil";
import alertAtom from "../recoil/atoms/alertAtom";
// React Router
import { useNavigate } from "react-router-dom";
import { PATH_SITE } from "../routes/paths";
// API
import { createCustomDesignRequest } from "../__api__/customDesign";
// Components
import CustomShape3D from "../Components/__customDesignPage/CustomShape3D";
//assets
import creative from "../assets/Animation/creative.json";
//lottie
import Lottie from "lottie-react";

//---------------------------------------------------------------------

const shapes = [
  { value: "triangle", label: "Triangle" },
  { value: "square", label: "Square" },
  { value: "circle", label: "Circle" },
];
function CustomDesignPage() {
  const triggerAlert = useSetRecoilState(alertAtom);
  const navigate = useNavigate();
  const [color, setColor] = useState("#ffffff"); // Default color
  const [logoDataUri, setLogoDataUri] = useState(null);

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
      shape: "",
      width: "",
      length: "",
      height: "",
      logo: null,
    },
    validationSchema: Yup.object().shape({
      shape: Yup.string().required("Shape is required"),
      width: Yup.number()
        .required("Width is required")
        .positive("Must be positive"),
      length: Yup.number()
        .required("Length is required")
        .positive("Must be positive"),
      height: Yup.number()
        .required("Height is required")
        .positive("Must be positive"),
    }),
    onSubmit: (values, { resetForm }) => {
      const customDesignData = {
        ...values,
        color,
      };
      // Handle file upload if necessary
      createCustomDesignRequest(customDesignData)
        .then((response) => {
          resetForm();
          triggerAlert({
            isOpen: true,
            isSuccess: true,
            message: "Custom Design sent successfully",
          });
          navigate(PATH_SITE.home);
        })
        .catch((error) => {
          triggerAlert({
            isOpen: true,
            isSuccess: false,
            message: "Something went wrong",
          });
          console.error("Error creating Custom Design", error.response);
        });
    },
  });

  const {
    values,
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    setFieldValue,
  } = formik;

  const handleColorChange = (color) => {
    setColor(color.hex);
  };

  const handleLogoUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Read file as Data URI
      const logo = await handleFileConversion(file);
      setFieldValue("logo", logo);

      const reader = new FileReader();
      reader.onload = () => {
        setLogoDataUri(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        my: 10,
        px: 5,
      }}
    >
      <Typography variant="h2">Create Your Custom Design</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{ padding: 4, maxWidth: 600 }}
            component="form"
            onSubmit={handleSubmit}
          >
            {/* Shape Selection */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Shape</InputLabel>
              <Select
                value={values.shape}
                {...getFieldProps("shape")}
                label="Shape"
                error={Boolean(touched.shape && errors.shape)}
                onChange={(e) => setFieldValue("shape", e.target.value)} // Update value on change
              >
                {shapes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {touched.shape && errors.shape && (
                <Typography color="error">{errors.shape}</Typography>
              )}
            </FormControl>

            {/* Color Selection */}
            <Box
              sx={{
                marginY: 2,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h4">Select Color</Typography>
              <SketchPicker color={color} onChange={handleColorChange} />
              <TextField
                fullWidth
                margin="normal"
                label="Or Enter Color Code"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </Box>

            {/* Dimension Inputs */}
            <TextField
              fullWidth
              margin="normal"
              label="Width"
              type="number"
              {...getFieldProps("width")}
              onChange={(e) => setFieldValue("width", e.target.value)}
              error={Boolean(touched.width && errors.width)}
              helperText={touched.width && errors.width}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Length"
              type="number"
              {...getFieldProps("length")}
              onChange={(e) => setFieldValue("length", e.target.value)}
              error={Boolean(touched.length && errors.length)}
              helperText={touched.length && errors.length}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Height"
              type="number"
              {...getFieldProps("height")}
              onChange={(e) => setFieldValue("height", e.target.value)}
              error={Boolean(touched.height && errors.height)}
              helperText={touched.height && errors.height}
            />

            {/* Logo Upload */}
            <Box sx={{ marginY: 2 }}>
              <Typography variant="h6">Upload Logo (optional)</Typography>
              <input type="file" accept="image/*" onChange={handleLogoUpload} />
            </Box>

            {/* Submit Button */}
            <LoadingButton
              fullWidth
              variant="contained"
              color="primary"
              sx={{ marginTop: 3 }}
              type="submit"
              loading={formik.isSubmitting}
            >
              Submit Design
            </LoadingButton>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {touched?.shape ? (
            <CustomShape3D
              shape={values.shape}
              color={color}
              width={values.width}
              height={values.height}
              length={values.length}
              logo={logoDataUri}
            />
          ) : (
            <Lottie animationData={creative} style={{ width: "80%" }} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default CustomDesignPage;
