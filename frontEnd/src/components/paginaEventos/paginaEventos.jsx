import React from 'react';
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import "./paginaEventos.module.css";
import imagen1 from "../../img/evento1.png";
import imagen2 from "../../img/evento2.png";
import imagen3 from "../../img/evento3.png";
import imagen4 from "../../img/evento4.png";
import imagen5 from "../../img/evento5.png";

const PaginaEventos = () => {
  const theme = useTheme();
  const isTabletOrSmaller = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <h1 style={{ textAlign: "center", color: "black", marginTop: "20px", fontFamily: "Parisienne, cursive", fontSize: "100px", fontWeight: "normal" }}>
        Eventos
      </h1>
      <p style={{ textAlign: "center", color: "black", fontSize: "30px" }}>Estos son nuestros eventos del mes</p>
      <Grid container spacing={2} padding="0px 20px 150px 20px">
        {/* Fila 1 */}
        <Grid item xs={12} container justifyContent="center" style={{ borderTop: '1px solid black', marginTop: '15px' }}>
          {/* Imagen y texto centrados */}
          <Grid item xs={12} sm={6} container justifyContent={isTabletOrSmaller ? "center" : "flex-start"} style={{ marginTop: isTabletOrSmaller ? '25px' : '0' }}>
            <div style={{ position: 'relative', maxWidth: '100%' }}>
              <img src={imagen1} alt="Noches de Tango" style={{ maxWidth: '100%' }} />
              <Typography variant="body1" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: isTabletOrSmaller ? '1.5rem' : '2.5rem', textAlign: 'center', whiteSpace: 'nowrap', maxWidth: '90%' }}>
                Noches de Tango
              </Typography>
            </div>
          </Grid>
          {/* Textos debajo de la imagen */}
          <Grid item xs={12} sm={6} container justifyContent={isTabletOrSmaller ? "center" : "flex-start"} alignItems={isTabletOrSmaller ? "center" : "flex-start"} direction="column" style={{ paddingLeft: isTabletOrSmaller ? "0" : "100px", textAlign: isTabletOrSmaller ? "center" : "left", paddingTop: isTabletOrSmaller ? '40px' : '80px' }}>
            <Typography variant="body1" style={{ marginBottom: '50px', fontSize: isTabletOrSmaller ? '1rem' : '1.2rem', maxWidth: isTabletOrSmaller ? '100%' : '80%' }}>
              Sumérgete en el seductor ritmo del tango interpretado por talentosos músicos y bailarines en vivo, mientras degustas exquisitos platos preparados por nuestro renombrado chef.
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
              Fecha: Domingo 20 de agosto
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
              Hora: 21:00
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
              Reservas: +54 11 1010-2020
            </Typography>
          </Grid>
        </Grid>

        {/* Fila 2 */}
        <Grid item xs={12} container justifyContent="center" style={{ borderTop: '1px solid black', marginTop: '15px' }}>
          {/* Imagen y texto centrados */}
          <Grid item xs={12} sm={6} container justifyContent={isTabletOrSmaller ? "center" : "flex-start"} style={{ marginTop: isTabletOrSmaller ? '25px' : '0' }}>
            <div style={{ position: 'relative', maxWidth: '100%' }}>
              <img src={imagen2} alt=" Taller de pizza"  style={{ maxWidth: '100%' }} />
              <Typography variant="body1" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: isTabletOrSmaller ? '1.5rem' : '2.5rem', textAlign: 'center', whiteSpace: 'nowrap', maxWidth: '90%' }}>
                Taller de Pizza
              </Typography>
            </div>
          </Grid>
          {/* Textos debajo de la imagen */}
          <Grid item xs={12} sm={6} container justifyContent={isTabletOrSmaller ? "center" : "flex-start"} alignItems={isTabletOrSmaller ? "center" : "flex-start"} direction="column" style={{ paddingLeft: isTabletOrSmaller ? "0" : "100px", textAlign: isTabletOrSmaller ? "center" : "left", paddingTop: isTabletOrSmaller ? '40px' : '80px' }}>
            <Typography variant="body1" style={{ marginBottom: '50px', fontSize: isTabletOrSmaller ? '1rem' : '1.2rem', maxWidth: isTabletOrSmaller ? '100%' : '80%' }}>
            ¿Eres amante de la pizza? ¿Te encanta experimentar con diferentes ingredientes y sabores? ¡Entonces este taller es para ti! Únete a nosotros para vivir una experiencia divertida y deliciosa en nuestro Taller de Pizza.
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
            Fecha: Viernes 18 de agosto
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
            Hora: 19:00
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
            Reservas: +54 11 1010-2020
            </Typography>
          </Grid>
        </Grid>

      {/* Fila 3 */}
      <Grid item xs={12} container justifyContent="center" style={{ borderTop: '1px solid black', marginTop: '15px' }}>
          {/* Imagen y texto centrados */}
          <Grid item xs={12} sm={6} container justifyContent={isTabletOrSmaller ? "center" : "flex-start"} style={{ marginTop: isTabletOrSmaller ? '25px' : '0' }}>
            <div style={{ position: 'relative', maxWidth: '100%' }}>
              <img src={imagen3} alt="Tardes de jazz" style={{ maxWidth: '100%' }} />
              <Typography variant="body1" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: isTabletOrSmaller ? '1.5rem' : '2.5rem', textAlign: 'center', whiteSpace: 'nowrap', maxWidth: '90%' }}>
              Tardes de jazz
              </Typography>
            </div>
          </Grid>
          {/* Textos debajo de la imagen */}
          <Grid item xs={12} sm={6} container justifyContent={isTabletOrSmaller ? "center" : "flex-start"} alignItems={isTabletOrSmaller ? "center" : "flex-start"} direction="column" style={{ paddingLeft: isTabletOrSmaller ? "0" : "100px", textAlign: isTabletOrSmaller ? "center" : "left", paddingTop: isTabletOrSmaller ? '40px' : '80px' }}>
            <Typography variant="body1" style={{ marginBottom: '50px', fontSize: isTabletOrSmaller ? '1rem' : '1.2rem', maxWidth: isTabletOrSmaller ? '100%' : '80%' }}>
            Déjate llevar por el encanto y la magia del jazz en nuestro evento Trdes de Jazz. Sumérgete en un ambiente lleno de melodías suaves, ritmos vibrantes y la improvisación única que caracteriza a este género musical.
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
            Fecha: Viernes 25 de agosto
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
            Hora: 20:00
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
            Reservas: +54 11 1010-2020
            </Typography>
          </Grid>
        </Grid>

      {/* Fila 4 */}
      <Grid item xs={12} container justifyContent="center" style={{ borderTop: '1px solid black', marginTop: '15px' }}>
          {/* Imagen y texto centrados */}
          <Grid item xs={12} sm={6} container justifyContent={isTabletOrSmaller ? "center" : "flex-start"} style={{ marginTop: isTabletOrSmaller ? '25px' : '0' }}>
            <div style={{ position: 'relative', maxWidth: '100%' }}>
              <img src={imagen4} alt="Fiesta Mexicana" style={{ maxWidth: '100%' }} />
              <Typography variant="body1" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: isTabletOrSmaller ? '1.5rem' : '2.5rem', textAlign: 'center', whiteSpace: 'nowrap', maxWidth: '90%' }}>
              Fiesta Mexicana
              </Typography>
            </div>
          </Grid>
          {/* Textos debajo de la imagen */}
          <Grid item xs={12} sm={6} container justifyContent={isTabletOrSmaller ? "center" : "flex-start"} alignItems={isTabletOrSmaller ? "center" : "flex-start"} direction="column" style={{ paddingLeft: isTabletOrSmaller ? "0" : "100px", textAlign: isTabletOrSmaller ? "center" : "left", paddingTop: isTabletOrSmaller ? '40px' : '80px' }}>
            <Typography variant="body1" style={{ marginBottom: '50px', fontSize: isTabletOrSmaller ? '1rem' : '1.2rem', maxWidth: isTabletOrSmaller ? '100%' : '80%' }}>
            Celebra la cultura de México con nuestra "Fiesta Mexicana" con el folclore y gastronomía tradicional. Disfruta de una amplia variedad de platillos auténticos preparados por nuestro chef.
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
            Fecha: Sábado 26 de agosto
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
            Hora: 21:30
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
            Reservas: +54 11 1010-2020
            </Typography>
          </Grid>
        </Grid>

      {/* Fila 5 */}
      <Grid item xs={12} container justifyContent="center" style={{ borderTop: '1px solid black', marginTop: '15px', borderBottom: '1px solid black' }}>
          {/* Imagen y texto centrados */}
          <Grid item xs={12} sm={6} container justifyContent={isTabletOrSmaller ? "center" : "flex-start"} style={{ marginBottom: '15px', marginTop: isTabletOrSmaller ? '25px' : '0' }}>
            <div style={{ position: 'relative', maxWidth: '100%' }}>
              <img src={imagen5} alt="Noches de baile" style={{ maxWidth: '100%' }} />
              <Typography variant="body1" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: isTabletOrSmaller ? '1.5rem' : '2.5rem', textAlign: 'center', whiteSpace: 'nowrap', maxWidth: '90%' }}>
              Noches de baile
              </Typography>
            </div>
          </Grid>
          {/* Textos debajo de la imagen */}
          <Grid item xs={12} sm={6} container justifyContent={isTabletOrSmaller ? "center" : "flex-start"} alignItems={isTabletOrSmaller ? "center" : "flex-start"} direction="column" style={{ paddingLeft: isTabletOrSmaller ? "0" : "100px", textAlign: isTabletOrSmaller ? "center" : "left", paddingTop: isTabletOrSmaller ? '40px' : '80px' }}>
            <Typography variant="body1" style={{ marginBottom: '50px', fontSize: isTabletOrSmaller ? '1rem' : '1.2rem', maxWidth: isTabletOrSmaller ? '100%' : '80%' }}>
            Prepárate para una noche llena de música irresistible, coreografías emocionantes y un ambiente vibrante que te hará mover el cuerpo sin parar.
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
            Fecha: Sábado 31 de octubre
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
            Hora: 20:00
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
            Reservas: +54 11 1010-2020
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default PaginaEventos;
