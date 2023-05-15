import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../styles/App.css";
import React, { useState } from "react";

const theme = createTheme();

export default function SignIn() {
  const [UserData, setUserData] = useState({ email: "", password: "" });
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(UserData);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            ¡Bienvenido!
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: "center", marginTop: "10px" }}
          >
            Ingresa tus datos para acceder a tu cuenta
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setUserData({ [e.target.name]: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setUserData({ [e.target.name]: e.target.value })}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="center">
              <Grid item xs={12} textAlign="center">
                <Typography variant="body2">¿No tienes cuenta?</Typography>
                <Link href="#" variant="body2">
                  {"Crear cuenta"}
                </Link>
              </Grid>
              <Grid
                item
                xs={12}
                textAlign="center"
                sx={{ marginBottom: "10px" }}
              >
                <Link href="#" variant="body2">
                  {"¿Olvidaste tu usuario y/o contraseña?"}
                </Link>
              </Grid>
            </Grid>
            <Box display="flex" alignItems="center">
              <Box flex={1}>
                <hr />
              </Box>
              <Typography variant="body1" align="center" sx={{ px: 1 }}>
                Ingresa con
              </Typography>
              <Box flex={1}>
                <hr />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
