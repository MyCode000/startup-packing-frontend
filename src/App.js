//MUI
import { Box } from "@mui/material";
//routs
import Router from "./routes";
//Teme
import ThemeProvider from "./theme/ThemeProvider";
import AlertComponent from "./Components/Alert";
import { RecoilRoot } from "recoil";

//-----------------------------------------------------

function App() {
  return (
    <>
      <ThemeProvider>
        <RecoilRoot>
          <Router />
          <AlertComponent />
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
}

export default App;
