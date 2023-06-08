import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Home from "./views/home/home";
import Login from "./components/Form/Form";
import CrearCuenta from "./components/Form/CrearCuenta";
import RecuperarPassword from "./components/Form/RecuperarPassword";
import Details from "./views/details/details";
import Reservas from "./views/reservas/Reservas";
import Eventos from "./views/especialDay/especialDay";
import MuiThemeProvider from "./theme";
import Dashboard from "./views/admin/dashboard/dashboard";
import AllMenu from "./views/admin/viewMenu/allMenu/allMenu";
import AllUsers from "./views/admin/viewUser/allUser/allUser";
import ModifyMenuForm from "./views/admin/viewEvents/modifyMenuForm/modifyMenuForm";
import DetailMenu from "./views/admin/viewMenu/detailMenu/detailMenu";
import ViewAllEvents from "./views/admin/viewEvents/viewAllEvents/viewAllEvents";
import EventForm from "./views/admin/eventForm/eventForm";
import MenuForm from "./views/admin/menuForm/menuForm";
import AllReservas from "./views/admin/reservas/reservas";
import AccountCreated from "./components/accountCreated/AccountCreated";
import './GlobalStyles/index.css'
function App() {
  const isAdmin = JSON.parse(sessionStorage.getItem("rol"));
  const navigate = useNavigate();
  useEffect(() => {
    if (isAdmin === "admin") {
      navigate("/admin/dashboard"); // Redirige al administrador al dashboard
    } else if (isAdmin === "user") {
      navigate("/"); // Redirige al usuario al inicio de las reservas
    }
  }, [isAdmin]);

  return (
    <MuiThemeProvider>
      <Routes>
        {isAdmin === "admin" ? (
          <>
            <Route
              path="/"
              element={<Navigate to="/admin/dashboard" replace />}
            />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/allMenu" element={<AllMenu />} />
            <Route path="/admin/allUsers" element={<AllUsers />} />
            <Route
              path="/admin/modifyMenu/:ProductoId"
              element={<ModifyMenuForm />}
            />
            <Route path="/admin/menu/:ProductoId" element={<DetailMenu />} />
            <Route path="/admin/allEvents" element={<ViewAllEvents />} />
            <Route path="/admin/eventForm" element={<EventForm />} />
            <Route path="/admin/createMenu" element={<MenuForm />} />
            <Route path="/admin/allreservas" element={<AllReservas />} />
            <Route path="/login" element={<Login />} />
          </>
        ) : isAdmin === "user" ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/detalles-pedido" element={<Details />} />
            <Route path="/eventos" element={<Eventos />} />
          </>
        ) : (
          // estas serian las rutas publicas
          <>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/crear-cuenta" element={<CrearCuenta />} />
            <Route path="/recuperar-password" element={<RecuperarPassword />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/eventos" element={<Eventos />} />
          </>
        )}
        <Route path="/cuenta-creada" element={<AccountCreated />} />
        <Route path="logout" element={<Navigate to="/" replace />} />
      </Routes>
    </MuiThemeProvider>
  );
}

export default App;
