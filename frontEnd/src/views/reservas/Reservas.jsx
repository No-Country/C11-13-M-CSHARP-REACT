import { Box, Stack, AppBar, Typography, Button, Select, TextField, MenuItem, Divider } from "@mui/material";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import Map from "./Map";
import schema from "../../utils/validateReservations";
import { useState, useEffect } from "react";
import Ticket from "./Ticket";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/images/logo.png';
import BadgeAvatars from "../../components/avatar/Avatar";
import myFecha from "../../utils/fecha";
import axios from "axios";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const PERSONS_OPTIONS = [
  { text: "Una persona", value: 1 },
  { text: "Dos personas", value: 2 },
  { text: "Tres personas", value: 3 },
  { text: "Cuatro personas", value: 4 },
  { text: "Cinco personas", value: 5 },
]

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Reservas = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    reset
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      date: "",
      hour: "13:00",
      numPeople: 1
    }
  });

  const navigate = useNavigate();

  const [showTicket, setShowTicket] = useState(false);

  let [reserva, setReserva] = useState({});

  const onSubmit = async (data) => {
    const FechaHora = `${myFecha(data.date)} ${data.hour}`
    const Cantidad = data.numPeople;

    reserva = {
      FechaHora,
      Precio: 99.99,
      EventoId: 99,
      Cantidad
    }
    setReserva(reserva);

    setShowTicket(true);

    createReserva();

    await sleep(2000);
    reset();
  };

  const createReserva = async () => {
    try {
      const response = await axios.post('https://sdlt2.azurewebsites.net/api/Reservas/Create', reserva, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  // const createReserva = async (reserva) => {
  //   try {
  //     const api = 'https://sdlt2.azurewebsites.net/api/Reservas/Create'
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //         Authorizations: "Bearer " + localStorage.getItem("token")
  //       },
  //     }
  //     const data = await axios.post(api, reserva);
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const getAllReservas = async () => {
    try {
      const api = 'https://sdlt2.azurewebsites.net/api/Reservas/GetAll'
      const data = await axios.get(api);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllReservas();
  }, []);

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
          <Typography>+54 11 1010-2020</Typography>
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
        <BadgeAvatars />
      </Box>
      <Box sx={{ margin: "0 auto" }}>
        <Typography variant="h3" sx={{ textAlign: "center", fontWight: "bold", fontSize: "clamp(1.5rem, 6vw, 2.5rem)", margin: { lg: "121px 0 146px", md: "48px 0", xs: "32px 0" } }}>
          Reservación
        </Typography>
        <Box sx={{}}>
          {isSubmitting
            ? <Spinner />
            : showTicket ? <Ticket reserva={reserva} /> : (
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
                          !!(errors.numPeople && touchedFields.numPeople)
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
                {/* <Box sx={{ margin: { lg: "79px 0 250px", sm: "32px 0", xs: "32px 0" }, padding: { lg: "16px 96px", sm: "16px 32px", xs: "16px" } }}>
                  <Typography variant="body1" sx={{ textAlign: "left", fontSize: "clamp(1rem, 3vw, 2.5rem)", marginBottom: { lg: "16px", xs: "8px" } }}>
                    Elige otra sucursal
                  </Typography>
                  <Box>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}
                      borderRadius={2}
                      p={2}
                      sx={{ width: "100%", border: "3px solid #472C1B" }}
                    >
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{ textAlign: "left", fontWeight: "bold" }}
                        >
                          Sucursal B
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ textAlign: "left", lineHeight: "1.6em", width: "100%" }}
                        >
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                          Numquam commodi asperiores dolorem dignissimos
                        </Typography>
                      </Box>
                      <Button variant="contained" size="small" sx={{ width: { md: "unset", sm: "50%", xs: "100%" } }}>
                        Seleccionar
                      </Button>
                    </Stack>
                  </Box>
                </Box> */}
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
    </Box >
  );
};

export default Reservas;
