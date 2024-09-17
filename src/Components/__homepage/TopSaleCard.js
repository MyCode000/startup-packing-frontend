// MUI
import { Box, Button, Card, Typography } from "@mui/material";
// assets
import cupCake from "../../assets/images/HomePage/cupCake.jpg";
import Iconify from "../Iconify";
//-------------------------------------------------------

function TopSaleCard({ product }) {
  return (
    <Card
      sx={{
        p: 1,
        bgcolor: "#F1F1F1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        width: "80%",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <Box
        component="img"
        src={cupCake}
        sx={{
          width: "90%",
          borderRadius: 10,
        }}
      />
      <Typography variant="h5" sx={{ mt: 1 }}>
        White cup cake case
      </Typography>
      <Typography variant="h6" sx={{ mb: 1 }}>
        150 EGP
      </Typography>
      <Button variant="contained" startIcon={<Iconify icon="raphael:cart" />}>
        Add to cart
      </Button>
    </Card>
  );
}

export default TopSaleCard;
