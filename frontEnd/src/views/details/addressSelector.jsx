import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';

const AddressSelector = () => {
  const [addressText, setAddressText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://sdlt2.azurewebsites.net/api/Account/GetDireccion',
          {
            headers: {
              Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('token')),
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );
        setAddressText(response.data);
      } catch (error) {
        console.error('Error al obtener la información de la API:', error);
        // Manejar el error, mostrar un mensaje de error o establecer un valor predeterminado
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Typography style={{ textAlign: 'center' }} variant="h5">
        Dirección donde se enviará el pedido
      </Typography>
      <Box
        style={{
          backgroundColor: '#fcecdc',
          borderRadius: '8px',
          border: '2px solid black',
          padding: '16px',
          margin: '16px',
        }}
      >
        <Typography variant="body1">{addressText}</Typography>
      </Box>
    </div>
  );
};

export default AddressSelector;
