import { Box, Typography, Grid, Button, Paper } from "@mui/material";
import { PATH_SITE } from "../routes/paths";
//__font__

import "@fontsource/poppins";
import "@fontsource/akaya-kanadaka"; // Font import for styling
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function AboutPage() {
  return (
    <Box sx={{ my: 5, px: 3 }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url("https://source.unsplash.com/random")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Box sx={{ bgcolor: "#aa647b", p: 4,  fontFamily: "'Akaya Kanadaka', sans-serif", }}>
          <Typography variant="h3" gutterBottom>
            About Us
          </Typography>
          <Typography variant="h6">
            We are a company that thrives on innovation and creativity. Our
            mission is to provide top-notch services and products.
          </Typography>
        </Box>
      </Box>

      {/* Introduction Section */}
      <Box sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom sx={{fontFamily: "'Akaya Kanadaka', sans-serif",}}>
          Who We Are
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ maxWidth: "600px", mx: "auto", fontFamily: "'Akaya Kanadaka', sans-serif",}}
        >
          We started with a vision to change the industry by creating innovative
          solutions. Over the years, our team has grown, and so have our goals.
          We focus on delivering value through unique products and exceptional
          customer service.
        </Typography>
      </Box>

      {/* Features Section */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{fontFamily: "'Akaya Kanadaka', sans-serif",}}>
          What We Offer
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="h5" gutterBottom sx={{fontFamily: "'Akaya Kanadaka', sans-serif",}}>
                Innovative Solutions
              </Typography>
              <Typography variant="body2" color="textSecondary">
                We develop state-of-the-art products that solve real-world
                problems.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="h5" gutterBottom sx={{fontFamily: "'Akaya Kanadaka', sans-serif",}}>
                Customer Focused
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Our customers are our top priority, and we tailor our solutions
                to meet their needs.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="h5" gutterBottom>
                Industry Expertise
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{fontFamily: "'Akaya Kanadaka', sans-serif",}}>
                With years of experience, we have become leaders in the
                industry, providing high-quality products.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Call to Action Section */}
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom sx={{fontFamily: "'Akaya Kanadaka', sans-serif",}}>
          Ready to Collaborate?
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Join us on our journey to create innovative solutions. Let’s work
          together!
        </Typography>
        <Button
          href={PATH_SITE.contact}
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Contact Us
        </Button>
      </Box>
    </Box>
  );
}

export default AboutPage;
