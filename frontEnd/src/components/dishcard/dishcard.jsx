import Checkbox from "@mui/material/Checkbox";
import { useState, useEffect } from "react";

// Se crean dos estados, isChecked almacena un valor booleano e indicara si un chekbox debe estar activo o no. En tanto, isChecked, es un arreglo que almacena los platos han sido marcados en cada categoria.
export default function Dishcard({
  dish,
  desc,
  price,
  status,
  setSelectProducts,
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [existDish, setExistDish] = useState([]);

  useEffect(() => {
    //Se evalua la posibilidad de que dish, "plato" que viene por props, este dentro del arreglo existDish, si es asi isChecked se pondra en true y el chekbox tendra el estado de activo. Caso contrario isChecked tomará el valor false y el checkbox del dish en particular no estará activo.
    if (existDish.includes(dish)) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [existDish, dish]);

  //Función que se ejecuta cada vez que el checkbox de dish en particular cambia de estado.
  const handleCheckboxChange = () => {
    setIsChecked((prevChecked) => !prevChecked);

    if (!isChecked) {
      //setSelectProducts, funcion que pertenece al estado del compoenten padre, pasada por props al componente hijo, que almacena los dish seleccionados en el arreglo del estado que controla. En tanto, setExistDish, almacena el dish en particular, en existDish para luego comparar su contenido con dish-props.
      setSelectProducts((prevProducts) => [
        ...prevProducts,
        { Nombre: dish, Precio: price },
      ]);
      setExistDish((prevProducts) => [...prevProducts, dish]);
    } else {
      //Caso sontrario, se filtra el contenido del estado del compoenete padre, para eliminar de el un dish en particular que ha sido desmarcado.
      setSelectProducts((prevProducts) =>
        prevProducts.filter((product) => product.Nombre !== dish)
      );
      //
      setExistDish((prevProducts) =>
        prevProducts.filter((item) => item !== dish)
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Checkbox
          disabled={status}
          checked={isChecked}
          onChange={handleCheckboxChange}
          style={{ 
            marginRight: "5px",
            opacity: sessionStorage.token === undefined ? 0.5 : 1,
            pointerEvents:
            sessionStorage.token === undefined ? "none" : "auto",
            }}
          />
        <label
          style={{ fontWeight: "bold", textAlign: "left", paddingLeft: 0 }}
        >
          {dish}
        </label>
      </div>
      <div style={{ textAlign: "left", paddingLeft: "3vw" }}>
        <p style={{ margin: 0 }}>{desc}</p>
        <label style={{ margin: 0, marginLeft: 0 }}>${price}</label>
      </div>
    </div>
  );
}
