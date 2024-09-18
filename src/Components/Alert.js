//MUI
import { Snackbar, Box, Typography } from "@mui/material";
//iconify
import Iconify from "./Iconify";
//recoil
import { useRecoilState } from "recoil";
import alertAtom from "../recoil/atoms/alertAtom";

const AlertComponent = () => {
  const [alert, setAlert] = useRecoilState(alertAtom);

  const handleClose = () => {
    setAlert({ ...alert, isOpen: false });
  };

  return (
    <Snackbar
      open={alert.isOpen}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      sx={{ zIndex: 1000 }}
    >
      <Box
        sx={{
          width: "100%",
          bgcolor: alert.isSuccess ? "primary.main" : "red",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 2, md: 4 },
          py: { xs: 1, md: 2 },
          borderRadius: 2,
        }}
      >
        <Iconify
          icon={alert.isSuccess ? "lets-icons:done-ring-round" : "maki:cross"}
          sx={{
            color: "black",
            width: 30,
            height: 30,
            mr: 1,
          }}
        />
        <Typography variant="h6" sx={{ color: "black" }}>
          {alert.message}
        </Typography>
      </Box>
    </Snackbar>
  );
};

export default AlertComponent;
