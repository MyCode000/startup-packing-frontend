// MUI
import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// assets
import companyLogo from "../assets/companyLogo.png"; // Correctly import the image
// recoil
import { useSetRecoilState } from "recoil";
import alertAtom from "../recoil/atoms/alertAtom";
// Formik
import { useFormik } from "formik";
// Yup
import * as Yup from "yup";
// react-router-dom
import { useNavigate } from "react-router-dom";
import { PATH_AUTH, PATH_SITE } from "../routes/paths";
// __api__
import { registerRequest } from "../__api__/auth";

// --------------------------------------------------

function SignUpPage() {
  const triggerAlert = useSetRecoilState(alertAtom);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Please enter a valid email")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      await registerRequest(values)
        .then((response) => {
          triggerAlert({
            isOpen: true,
            isSuccess: true,
            message: "Signed up successfully",
          });
          navigate(PATH_AUTH.login); // Navigate to login after successful sign-up
        })
        .catch((error) => {
          console.log("Error signing up", error);
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
  } = formik;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "primary.dark",
        p: { xs: 2, md: 0 },
      }}
    >
      <Grid container spacing={0}>
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
          <Card
            sx={{
              bgcolor: "white",
              p: { xs: 2, md: 5, borderRadius: 25 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "auto", md: 500 },
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h6">First Name</Typography>
                <TextField
                  placeholder="Enter your first name"
                  variant="standard"
                  fullWidth
                  sx={{
                    marginTop: 1,
                  }}
                  value={values.firstName}
                  onChange={(event) =>
                    setFieldValue("firstName", event.target.value)
                  }
                  {...getFieldProps("firstName")}
                  error={Boolean(touched.firstName) && errors.firstName}
                  helperText={Boolean(touched.firstName) && errors.firstName}
                />
              </Grid>

              <Grid item xs={6}>
                <Typography variant="h6">Last Name</Typography>
                <TextField
                  placeholder="Enter your last name"
                  variant="standard"
                  fullWidth
                  sx={{
                    marginTop: 1,
                  }}
                  value={values.lastName}
                  onChange={(event) =>
                    setFieldValue("lastName", event.target.value)
                  }
                  {...getFieldProps("lastName")}
                  error={Boolean(touched.lastName) && errors.lastName}
                  helperText={Boolean(touched.lastName) && errors.lastName}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6">Email</Typography>
                <TextField
                  placeholder="Enter your e-mail here"
                  variant="standard"
                  fullWidth
                  sx={{
                    marginTop: 1,
                  }}
                  value={values.email}
                  onChange={(event) =>
                    setFieldValue("email", event.target.value)
                  }
                  {...getFieldProps("email")}
                  error={Boolean(touched.email) && errors.email}
                  helperText={Boolean(touched.email) && errors.email}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6">Phone Number</Typography>
                <TextField
                  placeholder="Enter your phone number"
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
                  helperText={
                    Boolean(touched.phone_number) && errors.phone_number
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6">Address</Typography>
                <TextField
                  placeholder="Enter your address"
                  variant="standard"
                  fullWidth
                  sx={{
                    marginTop: 1,
                  }}
                  value={values.address}
                  onChange={(event) =>
                    setFieldValue("address", event.target.value)
                  }
                  {...getFieldProps("address")}
                  error={Boolean(touched.address) && errors.address}
                  helperText={Boolean(touched.address) && errors.address}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6">Password</Typography>
                <TextField
                  placeholder="Enter your password here"
                  variant="standard"
                  fullWidth
                  type="password"
                  sx={{
                    marginTop: 1,
                  }}
                  value={values.password}
                  onChange={(event) =>
                    setFieldValue("password", event.target.value)
                  }
                  {...getFieldProps("password")}
                  error={Boolean(touched.password) && errors.password}
                  helperText={Boolean(touched.password) && errors.password}
                />
              </Grid>

              <Grid item xs={12}>
                <LoadingButton
                  onClick={handleSubmit}
                  loading={isSubmitting}
                  disabled={!dirty}
                  variant="contained"
                  sx={{ width: "100%" }}
                >
                  Sign Up
                </LoadingButton>
                <Typography
                  onClick={() => navigate(PATH_AUTH.login)}
                  sx={{
                    textAlign: "center",
                    cursor: "pointer",
                    color: "black",
                    marginTop: 2,
                  }}
                >
                  Log In
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ textAlign: "center" }}>
                  By signing up you agree to our{" "}
                  <Box component="span" sx={{ color: "black" }}>
                    Conditions of Use{" "}
                  </Box>
                  and{" "}
                  <Box component="span" sx={{ color: "black" }}>
                    Privacy Notice
                  </Box>
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={companyLogo} // Use the imported image here
            sx={{
              width: 300, // Adjust the size as needed
              height: "auto",
              transition: "width 0.3s ease", // Add smooth transition for width
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default SignUpPage;
