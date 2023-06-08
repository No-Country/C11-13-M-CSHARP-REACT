import React from 'react';
import CarouselEventos from '../carouselEventos/carouselEventos';
import hojas from '../../img/hojas.svg';
import './seccionEventos.module.css';
import { Box, Typography } from '@mui/material';

const seccionEventos = () => {
  return (
    <Box id='eventos' sx={{
      width: '100%',
      // height: '120vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#E5B89B',
      backgroundImage: `url(${hojas})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right',
      backgroundSize: '50%',
      overflow: 'hidden',
      padding: { xs: "64px 0", lg: "129px 0 210px" }
    }}>
      <Typography
        sx={{
          textAlign: 'center',
          color: 'custom.text',
          marginBottom: { xs: "32px", lg: "127px" },
          fontFamily: 'Parisienne, cursive',
          fontSize: "clamp(2rem, 5vw, 4.375rem)"
        }}
      >
        Eventos
      </Typography>
      <CarouselEventos />
    </Box>
  );
};

export default seccionEventos;