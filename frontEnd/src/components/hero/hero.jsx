import { styled } from '@mui/system';
import { Box, Button, Container, Typography } from '@mui/material';
import image from '../../img/hero-foto.png';
import { Link } from 'react-router-dom'
import '../hero/Hero.css'
// Estilos para el contenedor de la imagen
const ImageContainer = styled('div')({
  position: 'relative',
  height: 'auto',
  overflow: 'hidden',
  objectFit: 'contain',
});

// Estilos para la imagen de fondo
const BackgroundImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

// Estilos para el contenedor de texto superpuesto


// Estilos para el contenedor de botones
const ButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),


}));

// Estilos para el botón pequeño
const SmallButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(0.5, 1),
  fontSize: '1.125rem',
  backgroundColor: '#FBE19D',
  color: '#000000',
  fontFamily: "open sans",
  width: '224px',
  textTransform: "none",
  height: "63px"
}));

const TextContainer = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '0%',
  // width: '50%',
  textAlign: 'left',
  // marginBottom: "5%"
  transform: "translateY(-50%)"
});

// Estilos para el contenedor de texto y botón
const TextButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(5),
  // marginBottom: '10%',
  // marginLeft: "96px",
  // width: "70%"
}));

// Componente Hero
const Hero = () => (
  <Box disableGutters >
    <ImageContainer sx={{ height: { xs: "calc(100vh - 164px)", sm: "calc(100vh - 180px)", md: "calc(100vh - 180px)", lg: "calc(100vh - 201px)" } }}>
      <BackgroundImage src={image} alt="img" />
      <TextContainer sx={{ paddingLeft: { sm: "32px", md: "32px", lg: "96px" }, padding: { xs: "0 16px" } }}>
        <TextButtonContainer sx={{ alignItems: { xs: "center", sm: "start" }, margin: { sm: "auto" } }}>
          <Typography variant="h5" component="span" sx={{ lineHeight: '1.2', maxWidth: '539px', whiteSpace: 'normal', wordWrap: 'break-word', color: '#FFFFFF', fontFamily: 'Open Sans', fontSize: "clamp(1rem, 4vw, 2.5rem)", textAlign: { md: "start", xs: "center", sm: "start" } }}>
            Sumérgete en una experiencia gastronómica sin igual que cautiva tus sentidos.
          </Typography>
          <ButtonContainer>
            <Link to='/reservas'>
              <Button variant="yellow">Reservar</Button>
            </Link>
          </ButtonContainer>
        </TextButtonContainer>
      </TextContainer>
    </ImageContainer>
  </Box>
);
export default Hero;