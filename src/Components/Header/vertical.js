//mui
import {
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
// assets
import companyLogo from "../../assets/companyLogo.png";
//iconify
import Iconify from "../Iconify";
//react-router-dom
import { useNavigate } from "react-router-dom";
//react
import { useCallback, useState } from "react";
import { PATH_AUTH, PATH_SITE } from "../../routes/paths";

function VerticalDrawer({ navLinks, user, logout }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const handelCartView = useCallback(() => {
    let context;
    if (localStorage.getItem("access_token")) {
      context = (
        <Box>
          <Tooltip title="cart">
            <IconButton href={PATH_SITE.cart}>
              <Iconify icon="raphael:cart" />
            </IconButton>
          </Tooltip>
          <Tooltip title="logout">
            <IconButton onClick={logout}>
              <Iconify icon="material-symbols-light:logout" />
            </IconButton>
          </Tooltip>
        </Box>
      );
    } else {
      context = (
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button href={PATH_AUTH.login} variant="contained" sx={{ mr: 1 }}>
            Login
          </Button>
          <Button
            href={PATH_AUTH.signUp}
            variant="outlined"
            sx={{ color: "black" }}
          >
            Sign up
          </Button>
        </Box>
      );
    }
    return context;
  }, [logout, user]);

  return (
    <Box>
      <Box
        sx={{
          height: 50,
          width: "100%",
          bgcolor: "#dc92a3",
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton onClick={toggleDrawer(true)}>
          <Iconify icon="ri:menu-2-fill" sx={{ color: "white" }} />
        </IconButton>
      </Box>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 2,
            }}
          >
            <Avatar src={companyLogo} />
            <Typography variant="h6" sx={{ fontWeight: "bold", ml: 1 }}>
              Startup Packing
            </Typography>
          </Box>
          <List>
            {navLinks.map((link, index) => (
              <ListItem button key={index} onClick={() => navigate(link.path)}>
                <ListItemText primary={link.name} />
              </ListItem>
            ))}
          </List>
          {handelCartView()}
          {/* {user && (
            <Box>
              <Tooltip title="cart">
                <IconButton href={PATH_SITE.cart}>
                  <Iconify icon="raphael:cart" />
                </IconButton>
              </Tooltip>
              <Tooltip title="logout">
                <IconButton onClick={logout}>
                  <Iconify icon="material-symbols-light:logout" />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          {!user && (
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Button href={PATH_AUTH.login} variant="contained" sx={{ mr: 1 }}>
                Login
              </Button>
              <Button
                href={PATH_AUTH.signUp}
                variant="outlined"
                sx={{ color: "black" }}
              >
                Sign up
              </Button>
            </Box>
          )} */}
        </Box>
      </Drawer>
    </Box>
  );
}

export default VerticalDrawer;
