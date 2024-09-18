//MUI
import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
//assets
import companyLogo from "../assets/companyLogo.png"; // Correctly import the image
//recoil
import { useSetRecoilState } from "recoil";
import alertAtom from "../recoil/atoms/alertAtom";
// Formik
import { useFormik } from "formik";
// Yup
import * as Yup from "yup";
//react-router-dom
import { useNavigate } from "react-router-dom";
import { PATH_AUTH, PATH_SITE } from "../routes/paths";
//__api__
import { fetchUserRequest, loginRequest } from "../__api__/auth";

//--------------------------------------------------

function LoginPage() {
  const triggerAlert = useSetRecoilState(alertAtom);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Please enter a valid email")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      await loginRequest(values)
        .then((response) => {
          fetchUserRequest()
            .then((response) => {
              triggerAlert({
                isOpen: true,
                isSuccess: true,
                message: "Logged in successfully",
              });
              navigate(PATH_SITE.home);
            })
            .catch((error) => {
              triggerAlert({
                isOpen: true,
                isSuccess: false,
                message: "Something went wrong",
              });
            });
        })
        .catch((error) => {
          console.log("Error logging in", error);
          if (error.response.status === 401) {
            triggerAlert({
              isOpen: true,
              isSuccess: false,
              message: "Wrong email or password",
            });
          } else {
            triggerAlert({
              isOpen: true,
              isSuccess: false,
              message: "Something went wrong",
            });
          }
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
      <Grid container spacing={5}>
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
            <Grid container spacing={5}>
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
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Typography sx={{ cursor: "pointer" }}>
                    Forget your password?
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  onClick={handleSubmit}
                  loading={isSubmitting}
                  disabled={!dirty}
                  variant="contained"
                  sx={{ width: "100%" }}
                >
                  Login
                </LoadingButton>
                <Typography
                  onClick={() => navigate(PATH_AUTH.signUp)}
                  sx={{
                    textAlign: "center",
                    cursor: "pointer",
                    color: "black",
                  }}
                >
                  Create Account
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ textAlign: "center" }}>
                  By signing in you agree to Startup packing's{" "}
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            display: { xs: "none", md: "flex" },
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

export default LoginPage;
