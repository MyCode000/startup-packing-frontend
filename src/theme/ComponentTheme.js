// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Sura, latin", // Change this to your desired font family
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
          background: "#7776B3",
          color: "#fff", // Custom text color
          "&:hover": {
            backgroundColor: "#5A639C", // Custom hover color
          },
        },
        outlined: {
          borderColor: "#7776B3",
          color: "#fff", // Custom text color to match the gradient
          "&:hover": {
            backgroundColor: "#5A639C", // Custom hover color
          },
        },
      },
    },
  },
});

export default theme;
