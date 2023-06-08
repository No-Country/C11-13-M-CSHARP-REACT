import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { getDish } from "../../store/actions/imgcategories";
import BackgroundImg from "../../img/romero.png";
import Dishcard from "../dishcard/dishcard";
import { useNavigate } from "react-router-dom";
import { pushCart } from "../../store/actions/cartActions";

export default function Dishmenu({
  dish,
  status,
  click,
  list,
  categoriaId,
  handleCategoriaId,
}) {
  const [selectProducts, setSelectProducts] = useState([]);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.imgcategories.dish);
  const data2 = useSelector((state) => state.shopingCart.data);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDish(dish));
    if (data2.length !== 0) {
      setSelectProducts(data2);
    }
  }, [dispatch, categoriaId]);

  const loadCart = (e) => {
    e.preventDefault();

    const uniqueNames = {};
    const filteredProducts = selectProducts.filter((item) => {
      if (!item.hasOwnProperty("cantidad") && !uniqueNames[item.Nombre]) {
        uniqueNames[item.Nombre] = true;
        return true;
      }
      return false;
    });

    const updatedProducts = filteredProducts.map((item) => ({
      ...item,
      cantidad: 1,
    }));

    setSelectProducts(
      [...selectProducts, ...updatedProducts].filter((item) =>
        item.hasOwnProperty("cantidad")
      )
    );

    dispatch(
      pushCart(
        [...selectProducts, ...updatedProducts].filter((item) =>
          item.hasOwnProperty("cantidad")
        )
      )
    );

    navigate("/detalles-pedido");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${BackgroundImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <hr />
        <label style={{ fontWeight: "bold" }}>{dish}</label>
        <hr />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          position: "relative",
        }}
      >
        {sessionStorage.token !== undefined && (
          <div
            onClick={(e) => loadCart(e)}
            style={{
              position: "relative",
              fontSize: "2.5rem",
              opacity: selectProducts.length === 0 || status ? 0.5 : 1,
              pointerEvents:
                selectProducts.length === 0 || status ? "none" : "auto",
            }}
          >
            (
              <AddShoppingCartIcon sx={{ fontSize: "2.5rem" }} />
            )
            <div
              style={{
                position: "absolute",
                top: "-0.5rem",
                right: "-0.5rem",
                backgroundColor: "red",
                fontSize: "0.7rem",
                color: "white",
                width: "1.3rem",
                height: "1.3rem",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {selectProducts.length}
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {data.map((e, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingLeft: "30%",
            }}
          >
            <Dishcard
              dish={e.Nombre}
              desc={e.Descripcion}
              price={e.Precio}
              status={status}
              setSelectProducts={setSelectProducts}
            />
          </div>
        ))}
      </div>

      <hr />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <label style={{ color: "red" }} onClick={() => click("menu")}>
          <strong> Cancelar </strong>
        </label>
        {list.map((e, index) => (
          <label
            key={index}
            onClick={() => {
              handleCategoriaId(e.CategoriaId);
              click(e.dish);
            }}
            style={{
              marginLeft: "10px",
              fontWeight: e.dish === dish ? "bold" : "normal",
            }}
          >
            {e.dish}
          </label>
        ))}
      </div>

      <hr />
    </div>
  );
}
