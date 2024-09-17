//MUI
import { Avatar, Button, Grid, Typography } from "@mui/material";
//assets
import companyLogo from "../../assets/companyLogo.png";
//react-router-dom
import { useNavigate } from "react-router-dom";

//---------------------------------------------

function HorizontalNavbar({ navLinks }) {
  const navigate = useNavigate();

  return (
    <Grid
      container
      sx={{
        bgcolor: "#dc92a3",
        position: "fixed",
        height: 60,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <Grid
        item
        md={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar src={companyLogo} />
        <Typography
          variant="h6"
          sx={{ color: "white", fontWeight: "bold", ml: 1 }}
        >
          startup packing
        </Typography>
      </Grid>
      <Grid
        item
        md={6}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {navLinks.map((link) => (
          <Typography
            onClick={() => navigate(link.path)}
            variant="h6"
            sx={{ color: "white", cursor: "pointer" }}
          >
            {link.name}
          </Typography>
        ))}
      </Grid>
      <Grid
        item
        md={2}
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Button variant="contained">Login</Button>
        <Button variant="outlined">Sign up</Button>
      </Grid>
    </Grid>
  );
}

export default HorizontalNavbar;
