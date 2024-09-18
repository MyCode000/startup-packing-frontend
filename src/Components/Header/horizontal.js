//MUI
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
//assets
import companyLogo from "../../assets/companyLogo.png";
//react-router-dom
import { useNavigate } from "react-router-dom";
import { PATH_AUTH, PATH_SITE } from "../../routes/paths";
import Iconify from "../Iconify";

//---------------------------------------------

function HorizontalNavbar({ navLinks, user }) {
  const navigate = useNavigate();

  return (
    <Grid
      container
      sx={{
        bgcolor: "#dc92a3",
        position: "fixed",
        top: 0,
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
      {user && (
        <Grid
          item
          md={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Tooltip title="cart">
            <IconButton href={PATH_SITE.cart}>
              <Iconify icon="raphael:cart" sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="logout">
            <IconButton>
              <Iconify
                icon="material-symbols-light:logout"
                sx={{ color: "white" }}
              />
            </IconButton>
          </Tooltip>
        </Grid>
      )}
      {!user && (
        <Grid
          item
          md={2}
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Button href={PATH_AUTH.login} variant="contained">
            Login
          </Button>
          <Button href={PATH_AUTH.signUp} variant="outlined">
            Sign up
          </Button>
        </Grid>
      )}
    </Grid>
  );
}

export default HorizontalNavbar;
