import { Button, List, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Link } from "./navlink";

export default function NavListDrawerResponsive({ onClick, closeSession }) {
  const [show, setShow] = useState(false);

  return (
    <Box
      sx={{
        backgroundColor: "custom.sienna",
        width: "100%",
        m: "auto",
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClick}
    >
      <nav aria-label="main mailbox folders">
        <List>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              alignItems: "center",
              color: "white",
              padding: "32px 0",
            }}
          >
            <Link
              spy={true}
              duration={500}
              smooth={true}
              exact="true"
              offset={-164}
              onClick={() => setShow(false)}
              to="menu"
            >
              <Typography variant="h5">Menú</Typography>
            </Link>
            <Link
              spy={true}
              duration={500}
              smooth={true}
              exact="true"
              offset={-164}
              onClick={() => setShow(false)}
              to="eventos"
            >
              <Typography variant="h5">Eventos</Typography>
            </Link>
            <Link
              spy={true}
              duration={500}
              smooth={true}
              exact="true"
              offset={-164}
              onClick={() => setShow(false)}
              to="sucursales"
            >
              <Typography variant="h5">Sucursales</Typography>
            </Link>
            {sessionStorage.getItem("token")? (
              <NavLink to="/" onClick={closeSession}>
                <Button variant="yellow" size="small">
                  Cerrar Sesión
                </Button>
              </NavLink>
            ) : (
              <NavLink to="/login">
                <Button variant="yellow" size="small">
                  Iniciar Sesión
                </Button>
              </NavLink>
            )}
          </Box>
        </List>
      </nav>
    </Box>
  );
}
