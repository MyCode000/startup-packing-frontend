// MUI
import { Box, Grid, Typography, Rating } from "@mui/material";
import productImage1 from './Vidback/client1.jpeg';
import productImage2 from './Vidback/client2.jpeg';
import productImage3 from './Vidback/client3.jpeg';
import productImage4 from './Vidback/client4.jpeg';
//-------------------------------------------------------

function ClientReviewCard({ image, review, rate }) {
  return (
    <Box
      sx={{
        textAlign: "center",
        p: 2,
        border: "1px solid #ddd",
        borderRadius: 2,
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      {/* صورة المنتج */}
      <Box
        component="img"
        src={image}
        alt="Product"
        sx={{
          width: "100%",
          height: 150,
          borderRadius: 2,
          mb: 2,
          objectFit: "cover",
        }}
      />
      {/* رأي العميل */}
      <Typography sx={{ color: "text.secondary", mb: 1 }}>{review}</Typography>
      {/* التقييم */}
      <Rating value={rate} readOnly />
    </Box>
  );
}

function ClientReview() {
  // بيانات الكروت
  const clientReviews = [
    {
      image: productImage1,
      review: " الديزاين جميل اللهم بارك وجه زي ما اتفقنا  ان شاء الله مش اخر تعامل",
      rate: 5,
    },
    {
      image: productImage2,
      review: "الماتريال كويسة جدا بجد ",
      rate: 4,
    },
    {
      image: productImage3,
      review: "الطباعة تحفة يا استاذ اسماعيل وجت زي ما اتفقنا",
      rate: 5,
    },
    {
      image: productImage4,
      review: "الماتريال كويسة جدا بجد وانصح بالتعامل معاهم",
      rate: 4.5,
    },
  ];

  return (
    <Box sx={{ py: 6, px: { xs: 2, sm: 4, md: 6 } }}>
      {/* title section*/}
      <Typography
        variant="h2"
        align="center"
        sx={{
          mb: 4,
          fontWeight: "bold",
        }}
      >
        Client Reviews
      </Typography>
      {/*  card system */}
      <Grid container spacing={4} justifyContent="center">
        {clientReviews.map((client, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <ClientReviewCard {...client} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ClientReview;
