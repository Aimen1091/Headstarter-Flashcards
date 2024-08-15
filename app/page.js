import Image from "next/image";
import { AppBar, Toolbar, Typography, Grid, Button, Box, Divider } from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { getStripe } from "../lib/stripe"; // Adjust import based on actual path

export default function Home() {
  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/checkout_sessions", {
      method: "POST",
    }).then((res) => res.json());

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSession.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#F5C6C6" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            AI Flashcards
          </Typography>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Button color="inherit" href="/sign-in">
              Sign In
            </Button>
            <Button color="inherit" href="/sign-up">
              Sign Up
            </Button>
          </SignedOut>
        </Toolbar>
      </AppBar>

      <Box sx={{ my: 12, textAlign: "center", bgcolor: "#f8f8f8", py: 8 }}>
        <Typography variant="h2" gutterBottom>
          Welcome to AI Flashcards
        </Typography>
        <Typography variant="h5" gutterBottom>
          Generate and save your custom flashcards.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, mr: 2 }}
          href="/generate"
        >
          Generate Flashcards
        </Button>
        <Button
          variant="outlined"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Buy Premium
        </Button>

        <Divider sx={{ my: 4 }} />
      </Box>

      <Box sx={{ mx: 10, my: 12, textAlign: "center" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textDecoration: "underline", my: 5 }}
        >
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight={600}>
              Easy to Use
            </Typography>
            <Typography>Add your text and we do the rest!</Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight={600}>
              Accessible
            </Typography>
            <Typography>
              Access your flashcards from anywhere! Make learning on the go easy
              and efficient.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight={600}>
              Organization
            </Typography>
            <Typography>
              Our flashcards enable users to manage multiple flashcard decks
              effortlessly.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textDecoration: "underline" }}
        >
          Pricing
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight={600}>
              Free
            </Typography>
            <Typography>$ 0</Typography>
            <Typography>100 flashcards</Typography>
            <Typography>No access to advanced customization or analytics</Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight={600}>
              Basic
            </Typography>
            <Typography>$ 5 / month</Typography>
            <Typography>500 flashcards</Typography>
            <Typography>Basic customization and analytics</Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight={600}>
              Pro
            </Typography>
            <Typography>$ 10 / month</Typography>
            <Typography>Unlimited Flashcards</Typography>
            <Typography>Advanced customization and detailed analytics</Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
