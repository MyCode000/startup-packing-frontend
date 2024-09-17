// @mui
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { GlobalStyles } from "@mui/system";
import theme from "./ComponentTheme";

// ----------------------------------------------------------------------

const globalStyles = (
  <GlobalStyles
    styles={{
      html: { height: "100%" },
      body: { height: "100%", margin: 0, padding: 0 },
      "#root": { height: "100%" },
    }}
  />
);
export default function ThemeProvider({ children }) {
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {globalStyles}
      {children}
    </MUIThemeProvider>
  );
}
