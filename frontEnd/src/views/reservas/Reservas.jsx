import { Box, Stack, Typography, Button, Select, TextField, MenuItem, Divider } from "@mui/material";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import Map from "./Map";
import schema from "../../utils/validateReservations";
import { useEffect, useState } from "react";
import Ticket from "./Ticket";
import Spinner from "./Spinner";
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../../assets/images/logo.png';
import myFecha from "../../utils/fecha";
import axios from "axios";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import qs from "qs";
import AccountMenu from "../../components/navbar/menu";
import { ToastContainer, toast } from "react-toastify";

const PERSONS_OPTIONS = [
  { text: "Una persona", value: 1 },
  { text: "Dos personas", value: 2 },
  { text: "Tres personas", value: 3 },
  { text: "Cuatro personas", value: 4 },
  { text: "Cinco personas", value: 5 },
]

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Reservas = () => {
  const [userName, setUserName] = useState("");
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [rol, setRol] = useState(sessionStorage.getItem("rol"));
  const [buttonDisabled, setButtonDisabled] = useState(false);
  let [reserva, setReserva] = useState({});

  const closeSession = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("rol");
    setToken(null);
    setRol(null);
  };

  // reserva = JSON.parse(localStorage.getItem("reserva"));

  const defaultValues = {
    date: "",
    hour: "13:00",
    numPeople: 1
  }

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    reset
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues
  });

  const navigate = useNavigate();

  const [showTicket, setShowTicket] = useState(false);

  const onSubmit = async (data) => {
    const FechaHora = `${myFecha(data.date)} ${data.hour}`
    const Cantidad = data.numPeople;

    reserva = {
      FechaHora,
      Precio: 19.99,
      EventoId: 24,
      Cantidad
    }

    if (!token) {
      setButtonDisabled(true);
      // localStorage.setItem("reserva", JSON.stringify(reserva));
      toast.error("¡Inicia sesión para poder reservar!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/login");
      }, 5000);
      return;
    }

    try {
      const api = 'https://sdlt2.azurewebsites.net/api/Reservas/Create';
      const encodedData = qs.stringify(reserva);
      const response = await axios.post(api, encodedData, {
        headers: {
          "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem("token")),
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        }
      })
      setReserva(reserva);
      setShowTicket(true);
      await sleep(5000);
      reset();
    }
    catch (error) {
      toast.error("¡Ocurrió un error, intenta más tarde!", {
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
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const api = "https://sdlt2.azurewebsites.net/api/Account/UserInfo";
      const { data } = await axios.get(api, {
        headers: {
          "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem("token")),
          "Content-Type": "application/x-www-form-urlencoded",
        }
      });
      const userNameFiltered = data?.NombreApellido === "" ? data.Email : data.NombreApellido;
      console.log(userNameFiltered)
      setUserName(userNameFiltered);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box component="section" sx={{ maxWidth: "1440px", margin: "auto" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ height: "68px", padding: { lg: "16px 96px", sm: "16px 32px", xs: "16px" }, backgroundColor: "primary.main", color: "#fff" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { lg: "8px", sm: "6px", xs: "4px" }
          }}
        >
          <LocalPhoneOutlinedIcon />
          <Typography>+52 11 1010-2020</Typography>
        </Box>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem sx={{ color: "#fff" }} />}
          spacing={2}
        >
          <Typography sx={{ fontWeight: "bold" }}>ES</Typography>
          <Typography>EN</Typography>
        </Stack>
      </Stack>
      <Box sx={{ backgroundColor: "custom.sienna", display: "flex", justifyContent: "space-between", height: { lg: "133px", sm: "112px", xs: "96px" }, padding: { lg: "16px 96px", sm: "16px 32px", xs: "16px" } }}>
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: { lg: "200px", sm: "175px", xs: "110px" },
          height: "auto",
          cursor: "pointer"
        }}>
          <img src={logo} alt="Logo" style={{ width: "100%", height: "auto" }} onClick={() => navigate("/")} />
        </Box>
        {token ? (
          <Box>
            <Box>
              {token ? (
                <AccountMenu closeSession={closeSession} />
              ) : (
                <NavLink
                  to="/login"
                >
                  <Button variant="yellow" size="small">Iniciar Sesión</Button>
                </NavLink>
              )}
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <NavLink
              to="/login"
            >
              <Button variant="yellow" size="small">Iniciar Sesión</Button>
            </NavLink>
          </Box>
        )}
      </Box>
      <Box sx={{ margin: "0 auto" }}>
        <Typography variant="h3" sx={{ textAlign: "center", fontWight: "bold", fontSize: "clamp(1.5rem, 6vw, 2.5rem)", margin: { lg: "121px 0 146px", md: "48px 0", xs: "32px 0" } }}>
          Reservación
        </Typography>
        <Box>
          {isSubmitting
            ? <Spinner />
            : showTicket ? <Ticket reserva={reserva} userName={userName} /> : (
              <>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  justifyContent={{ lg: "space-between", md: "center" }}
                  alignItems={{ sm: "center", lg: "center" }}
                  spacing={{ xs: 1, sm: 4, md: 4 }}
                  sx={{ padding: { lg: "96px", sm: "48px 32px", xs: "32px 16px" }, backgroundColor: "custom.murlywood", marginBottom: { lg: "128px", md: "96px", sm: "64px", xs: "48px" } }}
                >
                  <Box>
                    <Typography variant="h4" sx={{ textAlign: "left", fontSize: "clamp(1rem, 4vw, 2.5rem)" }}>
                      Condesa
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ textAlign: "left", lineHeight: "1.6em", width: "100%", margin: "16px 0" }}
                    >
                      Av. Vicente Suárez 165, Col. Condesa, Cuauhtémoc C.P. 06140
                      Ciudad de México, CDMX
                    </Typography>
                    <Box>
                      <Map />
                    </Box>
                  </Box>
                  <Box sx={{ width: { lg: "430px", md: "450px", sm: "70%", xs: "100%" } }}>
                    <Typography variant="h4" sx={{ textAlign: { xs: "left", sm: "center", md: "start" }, fontSize: "clamp(1rem, 4vw, 2.5rem)", marginBottom: "16px", marginTop: { sm: "0", xs: "32px" } }}>
                      Realizá tu reservación
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Controller
                        name="date"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type="date"
                            // label="Selecciona la fecha"
                            variant="outlined"
                            error={!!errors.date}
                            helperText={errors.date ? errors.date?.message : ''}
                            margin="dense"
                            sx={{ width: "100%" }}
                          />
                        )}
                      />
                      <br />
                      <Controller
                        name="hour"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type="time"
                            // label="Selecciona la hora"
                            variant="outlined"
                            error={!!errors.hour}
                            helperText={errors.hour ? errors.hour?.message : ''}
                            margin="dense"
                            sx={{ width: "100%" }}
                          />
                        )}
                      />
                      <br />
                      <Controller
                        name="numPeople"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            type="select"
                            // label="Selecciona el número de personas"
                            variant="outlined"
                            margin="dense"
                            sx={{ width: "100%", margin: "8px 0 4px" }}
                          >
                            {PERSONS_OPTIONS.map((options, index) => (
                              <MenuItem key={index} value={options.value} >
                                {options.text}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                      <Button
                        disabled={
                          isSubmitting ||
                          !!(errors.date && touchedFields.date) ||
                          !!(errors.hour && touchedFields.hour) ||
                          !!(errors.numPeople && touchedFields.numPeople) ||
                          buttonDisabled
                        }
                        type="submit"
                        variant="contained"
                        sx={{ marginTop: "24px", width: "100%" }}
                      >
                        Reservar ahora
                      </Button>
                    </form>
                  </Box>
                </Stack>
              </>
            )
          }
        </Box>
      </Box >
      <Box component="footer">
        <Box position="static" sx={{ backgroundColor: 'custom.sienna', color: "#fff", padding: { lg: "16px 96px", sm: "16px 32px", xs: "16px" } }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" style={{ marginBottom: '10px' }}>
            <Stack display="flex" alignItems={{ xs: "start" }} direction={{ xs: "column", md: "row" }}>
              <Typography variant="body2" style={{ marginRight: '10px' }}>
                Av. Vicente Suárez 165, Col. Condesa, Cuauhtémoc
              </Typography>
              <Typography variant="body2" style={{ marginRight: '10px' }}>
                C.P. 06140
              </Typography>
              <Typography variant="body2" style={{ marginRight: '15px' }}>
                CDMX
              </Typography>
              <Typography variant="body2">
                Tel +52 11 1010-2020
              </Typography>
            </Stack>
            <Box display="flex" alignItems="center" >
              <Typography variant="body2" style={{ marginRight: '8px' }}>
                Síguenos:
              </Typography>
              <a href="https://www.facebook.com/" target="_blank" style={{ textDecoration: 'none', color: 'white' }} rel="noreferrer">
                <FacebookIcon style={{ marginRight: '4px' }} /></a>
              <a href="https://www.instagram.com/" target="_blank" style={{ textDecoration: 'none', color: 'white' }} rel="noreferrer">
                <InstagramIcon /></a>
            </Box>
          </Box>
          <hr style={{ margin: '0', border: 'none', borderTop: '1px solid white' }} />
          <Box display="flex" justifyContent="space-between" alignItems="center" style={{ marginTop: '10px' }}>
            <Box display="flex" alignItems="center">
              <Typography variant="body2" style={{ marginTop: '8px' }}>
                Sabores de la Tierra ® 2023
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography variant="body2" style={{ marginTop: '8px' }}>
                Aviso de Privacidad
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
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
      <ToastContainer />
    </Box >
  );
};

export default Reservas;
