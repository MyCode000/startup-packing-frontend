// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif', // Change this to your desired font family
    h1: { fontWeight: "bolder" },
    h2: { fontWeight: "bolder" },
    h3: { fontWeight: "bolder" },
  },
  palette: {
    primary: {
      main: "#C46A84", // Primary color
      dark: "#914e62",
    },
    secondary: {
      main: "#DC92A3ff", // Secondary color
    },
    text: {
      primary: "#DC92A3ff", // Set default text color
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Disable uppercase transformation
          borderRadius: 15, // Rounded corners
          padding: "10px 20px", // Custom padding
        },
        contained: {
          background: "#C46A84",
          color: "#fff", // Custom text color
          "&:hover": {
            backgroundColor: "#914e62", // Custom hover color
          },
        },
        outlined: {
          borderColor: "#C46A84",
          color: "#fff", // Custom text color to match the gradient
          "&:hover": {
            borderColor: "#C46A84",
            backgroundColor: "#914e62", // Custom hover color
          },
        },
      },
    },
  },
});

export default theme;
