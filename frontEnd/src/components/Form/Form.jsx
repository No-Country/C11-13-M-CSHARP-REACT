import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "axios";
import qs from "qs";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import "../Form/Form.css";
import jwt_decode from "jwt-decode";
import NavbarSecondary from "../navbarSecondary/NavbarSecondary";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import FooterMinimalista from "../footerMinimalista/footerMinimalista"
const theme = createTheme();

const SignIn = () => {
  const [UserData, setUserData] = useState({
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [tokenGoogle, setTokenGoogle] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const api = "https://sdlt2.azurewebsites.net/token";
      const formData = {
        UserName: `${UserData.Email}`,
        Password: `${UserData.Password}`,
        grant_type: "password",
      };
      const encodedData = qs.stringify(formData);
      const data = await axios.post(api, encodedData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      setToken(data.data.access_token);
      localStorage.setItem("token", JSON.stringify(data.data.access_token));
      navigate("/");
      if (localStorage.getItem("token")) {
        toast.success("¡Bienvenido! ", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (tokenGoogle) {
      try {
        const decoded = jwt_decode(tokenGoogle);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }
  }, [tokenGoogle]);
  return (
    <>
      <NavbarSecondary />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#FFD7BD",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography
              variant="h3"
              sx={{
                textAlign: "center",
                fontFamily: "Balsamiq Sans, cursive",
                fontWeight: "700",
              }}
            >
              ¡Bienvenido!
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                marginTop: "10px",
                fontFamily: "Open Sans",
                fontWeight: 400,
                fontSize: "25px",
                lineHeight: "40px",
              }}
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
                id="Email"
                label="Email Address"
                name="Email"
                autoComplete="email"
                autoFocus
                sx={{ backgroundColor: "#fff", border: 0 }}
                onChange={(e) =>
                  setUserData((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Password"
                label="Password"
                type="password"
                id="Password"
                autoComplete="current-password"
                sx={{ backgroundColor: "#fff" }}
                onChange={(e) =>
                  setUserData((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#855D44" }}
              >
                Sign In
              </Button>
              <Grid container justifyContent="center">
                <Grid item xs={12} textAlign="center">
                  <Typography
                    variant="body2"
                    sx={{ display: "inline-block", marginRight: "10px" }}
                  >
                    ¿No tienes cuenta?
                  </Typography>
                  <Link to="/crear-cuenta" variant="body2">
                    {"Crear cuenta"}
                  </Link>
                </Grid>
                <Grid
                  item
                  xs={12}
                  textAlign="center"
                  sx={{ marginBottom: "10px" }}
                >
                  <Link to="/recuperar-password" variant="body2">
                    {"¿Olvidaste tu usuario y/o contraseña?"}
                  </Link>
                </Grid>
              </Grid>
              <Box display="flex" alignItems="center" justifyContent="center">
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
            {/* botonsito de google */}
            <Box sx={{ marginTop: 3 }}>
              <Box>
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    setTokenGoogle(credentialResponse.credential);
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <FooterMinimalista />
    </>
  );
};
export default SignIn;
