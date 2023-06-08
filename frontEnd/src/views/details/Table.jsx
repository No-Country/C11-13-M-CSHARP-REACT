import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Box, TableFooter } from "@mui/material";
import { pushCart } from "../../store/actions/cartActions";
import { useNavigate } from "react-router-dom";

const Cantidad = ({ cantidad = 1, onIncrement, onDecrement }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
      }}
    >
      <RemoveCircleOutlineIcon onClick={onDecrement} />
      <Box
        sx={{
          padding: "2px",
          borderRadius: "4px",
          border: "1px solid black",
          width: "32px",
          height: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        {cantidad}
      </Box>

      <AddCircleOutlineIcon onClick={onIncrement} />
    </Box>
  );
};

const BasicTable = ({ isempty, sendData, state }) => {
  const select = useSelector((state) => state.shopingCart.data);
  const [items, setItems] = useState(select);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (items.length === 0) {
      navigate("/");
    }
    const calculateTotalPrice = () => {
      let total = 0;
      items.forEach((item) => {
        const price = parseFloat(item.Precio);
        const cantidad = parseFloat(item.cantidad) || 1; // Valor predeterminado de 1 para cantidad
        if (price && cantidad) {
          total += price * cantidad;
        }
      });
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [items]);

  const handleDelete = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleIncrement = (index) => {
    const updatedItems = [...items];
    const updatedItem = { ...updatedItems[index] };
    updatedItem.cantidad += 1;
    updatedItems[index] = updatedItem;
    setItems(updatedItems);
  };

  const handleDecrement = (index) => {
    const updatedItems = [...items];
    if (updatedItems[index].cantidad > 1) {
      const updatedItem = { ...updatedItems[index] };
      updatedItem.cantidad -= 1;
      updatedItems[index] = updatedItem;
      setItems(updatedItems);
    }
  };

  useEffect(() => {
    dispatch(pushCart(items));
  }, [dispatch, items]);

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: "1200px",
        margin: "auto",
        background: "#fcd4bc",
        boxShadow: "none",
        p: 0,
      }}
    >
      <Table sx={{ minWidth: "800px" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Cantidad
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Precio
            </TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.Nombre}
              </TableCell>
              <TableCell align="right">
                <div
                  style={{
                    position: "relative",
                    fontSize: "2.5rem",
                    opacity: !state ? 0.5 : 1,
                    pointerEvents: !state ? "none" : "auto",
                  }}
                >
                  <Cantidad
                    cantidad={item.cantidad}
                    onIncrement={() => handleIncrement(index)}
                    onDecrement={() => handleDecrement(index)}
                  />
                </div>
              </TableCell>
              <TableCell align="right">$ {item.Precio}</TableCell>
              <TableCell align="right">
              <div
                  style={{
                    position: "relative",
                    fontSize: "2.5rem",
                    opacity: !state ? 0.5 : 1,
                    pointerEvents: !state ? "none" : "auto",
                  }}
                >
                <DeleteForeverOutlinedIcon
                  onClick={() => handleDelete(index)}
                />
                </div>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}></TableCell>
            <TableCell
              align="right"
              sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
              Total: $ {totalPrice.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
