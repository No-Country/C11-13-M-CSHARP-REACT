import React from 'react';
import { styled } from '@mui/system';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Divider } from '@mui/material';
import { Home, Restaurant, Event, People, MenuBook, ListAlt } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import logo from "../../../assets/images/logo-color.png"

const DrawerContainer = styled(Drawer)(({ theme }) => ({
  width: 240,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
    backgroundColor: '#E5B89B',
  },
}));

//Este dashboard es solo la sideBar, faltan los dibujos del diseño
const SideBar = () => {
  return (
    <DrawerContainer variant="permanent" sx={{ display: { xs: "none", md: "block" } }}>
      <Box
        sx={{
          width: "154px",
          height: "69px",
          margin: "38px auto 29px"
        }}
      >
        <img
          src={logo}
          alt="Logo Sabores De La Tierra"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
      <Divider variant="middle" />
      <List sx={{ marginTop: "51px" }}>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItem>
        <ListItem button component={Link} to="/admin/createMenu">
          <ListItemIcon>
            <Restaurant />
          </ListItemIcon>
          <ListItemText primary="Crear Menú" />
        </ListItem>
        <ListItem button component={Link} to="/admin/allMenu">
          <ListItemIcon>
            <MenuBook />
          </ListItemIcon>
          <ListItemText primary="Ver Menú" />
        </ListItem>
        <ListItem button component={Link} to="/admin/eventForm">
          <ListItemIcon>
            <Event />
          </ListItemIcon>
          <ListItemText primary="Crear Evento" />
        </ListItem>
        <ListItem button component={Link} to="/admin/allEvents">
          <ListItemIcon>
            <ListAlt />
          </ListItemIcon>
          <ListItemText primary="Ver Eventos" />
        </ListItem>
        <ListItem button component={Link} to="/admin/allreservas">
          <ListItemIcon>
            <Event />
          </ListItemIcon>
          <ListItemText primary="Ver Reservas" />
        </ListItem>
        <ListItem button component={Link} to="/admin/allUsers">
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText primary="Ver Usuarios" />
        </ListItem>
      </List>
    </DrawerContainer>
  );
};

export default SideBar;