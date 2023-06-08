import {  Wallet } from "@mercadopago/sdk-react";
import { Box, Button, Stack, Typography } from "@mui/material";
import BasicTable from "./Table";
import logo from "../../img/logo-sabores@2x.png";
import { useNavigate } from "react-router-dom";
import BadgeAvatars from "../../components/avatar/Avatar";
import { useEffect, useState } from "react";
import { resetStore } from "../../store/store";
import { clearCart } from "../../store/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { payment } from "../../store/actions/payment";
import { deliverySaveAction } from "../../store/actions/delivery";
import AddressSelector from './addressSelector'
import { Add } from "@mui/icons-material";

const Details = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [empty, setEmpty] = useState(false);
  const [total, setTotal] = useState(0);
  const [visible, setVisible] = useState(true);
  const [idMP, setIdMP] = useState(0);
  const [renderedCheckoutButton, setRenderedCheckoutButton] = useState(false);

  const data = useSelector((state) => state.shopingCart.data);
  let id = useSelector((state) => state.Idpago.Id);

  useEffect(() => {
    setIdMP(id);
    console.log(idMP)
    return () => {
      setIdMP(0);
      console.log(idMP)
    };
  }, [id]);


  useEffect(() => {
    if (idMP && !renderedCheckoutButton) {
      setRenderedCheckoutButton(true);
    }
  }, [idMP, renderedCheckoutButton]);

  const resetStr = () => {
    dispatch(payment(0));
    dispatch(clearCart());
    setIdMP(0);
    resetStore();
    navigate("/");
  };

  const isempty = () => {
    setEmpty(!empty);
  };

  const renderCheckoutButton = (preferenceId) => {
    if (renderedCheckoutButton && preferenceId) {
      if ('caches' in window) {
        caches.keys().then(function(cacheNames) {
          cacheNames.forEach(function(cacheName) {
            caches.delete(cacheName);
          });
        });
      }
      //initMercadoPago("TEST-fc30be2e-cc40-46a2-9ca5-2ab08c73ada4");
      return (
        <Wallet
          initialization={{ preferenceId: preferenceId }}
          onSubmit={() => {
            resetStr();
          }}
        />
        

      );
    }

    return null;
  };

  const pay = () => {
    console.log(Wallet)
    setVisible(!visible);
    const total = data.reduce((accumulator, currentObject) => {
      const partialResult = currentObject.cantidad * currentObject.Precio;
      return accumulator + partialResult;
    }, 0);

    const totalcarrito = {
      total,
      descriptions: "Comidas.",
    };

    dispatch(payment(totalcarrito));

    setVisible(!visible);
  };

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "primary.main",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "40px 60px",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ width: "150px", height: "auto" }}
          onClick={() => navigate("/")}
        />
        <BadgeAvatars />
      </Box>
      <Box>
        <Typography variant="h4" sx={{ textAlign: "center", my: 8 }}>
          Detalles de pedidos
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center"}}>
          <AddressSelector/>
        </Box>
        <BasicTable isempty={isempty} total={total} state={visible}/>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            p: "24px",
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="center"
            spacing={4}
          >
            {visible&& <Button variant="contained" onClick={resetStr}>
              Eliminar pedido
            </Button>}
            {visible && (
              <Button variant="contained" onClick={pay}>
                Pagar
              </Button>
            )}
            {renderCheckoutButton(idMP)}
          </Stack>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexFlow: "wrap",
              gap: "16px",
              marginTop: "24px",
            }}
          ></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Details;
