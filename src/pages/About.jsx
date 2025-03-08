import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
} from '@mui/material';

function About() {
  return (
    <Box sx={{ width: '100%', p: 3 }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          px: 4,
          borderRadius: 2,
          mb: 6,
          textAlign: 'center',
          width: '100%',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          About Smart Home Hub
        </Typography>
        <Typography variant="h5">
          Transforming homes into intelligent living spaces
        </Typography>
      </Box>

      {/* Mission and Vision */}
      <Grid container spacing={4} sx={{ mb: 6, width: '100%' }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', width: '100%' }}>
            <CardContent>
              <Typography variant="h4" gutterBottom color="primary">
                Our Mission
              </Typography>
              <Typography variant="body1" paragraph>
                At Smart Home Hub, our mission is to make smart home technology accessible,
                affordable, and easy to use for everyone. We believe that home automation
                should enhance your life, not complicate it.
              </Typography>
              <Typography variant="body1">
                We strive to provide cutting-edge solutions that seamlessly integrate
                into your daily routine, making your home more comfortable, secure,
                and energy-efficient.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', width: '100%' }}>
            <CardContent>
              <Typography variant="h4" gutterBottom color="primary">
                Our Vision
              </Typography>
              <Typography variant="body1" paragraph>
                We envision a future where every home is a smart home, where technology
                works in harmony with human needs to create sustainable, efficient,
                and comfortable living spaces.
              </Typography>
              <Typography variant="body1">
                Our goal is to lead the way in this transformation by providing
                innovative solutions that make this vision a reality for our customers.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Company Values */}
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Our Values
      </Typography>
      <Grid container spacing={4} sx={{ width: '100%' }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', width: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Innovation
              </Typography>
              <Typography variant="body2">
                We continuously strive to develop and offer the latest in smart home
                technology, ensuring our customers have access to cutting-edge solutions.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', width: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Quality
              </Typography>
              <Typography variant="body2">
                We maintain the highest standards in product selection and customer
                service, ensuring reliability and satisfaction in every interaction.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', width: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Sustainability
              </Typography>
              <Typography variant="body2">
                We are committed to promoting energy-efficient solutions that help
                reduce environmental impact while saving our customers money.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', width: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Customer Focus
              </Typography>
              <Typography variant="body2">
                We put our customers first, providing expert guidance and support
                to help them find the perfect smart home solutions for their needs.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default About; 