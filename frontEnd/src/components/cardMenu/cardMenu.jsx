import {  useState } from "react";
import { Grid, Button, Typography } from "@mui/material";
import Card from "../card/card";

import BackgroundImg from "../../img/romero.png";
import Dishmenu from "../dishmenu/dishmenu";
import image from "../../img/Promocion banner.png";
import cat1 from "../../img/categorias/menu1.jpg";
import cat2 from "../../img/categorias/menu2.jpg";
import cat3 from "../../img/categorias/menu3.jpg";
import cat4 from "../../img/categorias/menu4.jpg";
import cat5 from "../../img/categorias/menu5.jpg";
import cat6 from "../../img/categorias/menu6.jpg";
import'../cardMenu/cardMenu.css'
import { Link } from "react-router-dom";



const promocion = image;

const categories = [
  {
    CategoriaId: 2,
    image: cat1,
    dish: "Entradas",
  },
  {
    CategoriaId: 3,
    image: cat2,
    dish: "Ensalada",
  },
  {
    CategoriaId: 4,
    image: cat3,
    dish: "Sopas",
  },
  {
    CategoriaId: 5,
    image: cat4,
    dish: "Pescados y Mariscos",
  },
  {
    CategoriaId: 6,
    image: cat5,
    dish: "Carnes",
  },
  {
    CategoriaId: 7,
    image: cat6,
    dish: "Postres y Bebidas",
  }
];

const CardMenu = () => {
  const [selectedOption, setSelectedOption] = useState(true);
  const [categorytype, setCategorytype] = useState("menu");
  const [categoriaId, setCategoraId] = useState('')

  
  const handleCategoriaId = (id) =>{
    setCategoraId(id)
  }

  const handleClick = () => {
    setSelectedOption((prevOption) => !prevOption);
  };

  const handleClickMenu = (e) => {
    setCategorytype(e);
  };

  const handleCategory = (dish) => {
    setCategorytype(dish);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${BackgroundImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Grid
        display="flex"
        width="100%"
        marginTop="15%"
        container
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
        gap="15%"
        paddingBottom="10%"
      >
        <Grid item>
          <div
            variant="contained"
            onClick={handleClick}
            disabled={selectedOption}
            style={{
              textDecoration: selectedOption ? "underline" : "",
              fontWeight: selectedOption ? "900" : "",
              fontSize: "1.25rem",
              // paddingRight: "25%",
              fontFamily: "open sans",
            }}
          >
            MENÚ
          </div>
        </Grid>
        {sessionStorage.token !== undefined && <Grid item>
          <div
            onClick={handleClick}
            style={{
              textDecoration: !selectedOption ? "underline" : "",
              fontWeight: !selectedOption ? "900" : "",
              fontSize: "1.25rem",
              fontFamily: "open sans",
            }}
          >
            DELIVERY
          </div>
        </Grid>}
      </Grid>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {selectedOption && (
          <img src={promocion} alt="promocion" style={{ height: "20vw" }} />
        )}
      </Grid>
      <Grid container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ margin: "auto", maxWidth: "100vw", padding:'10px'  }}>
      {categorytype === "menu" && (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ margin: "auto", maxWidth: "100vw"  }}>
        
          {categories.map((e, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} onClick={()=>handleCategoriaId(e.CategoriaId)}>
              <Card
                image={e.image}
                dish={e.dish}
                category={handleCategory}
              />
            </Grid>
          ))}
          
        </Grid>
      )}
      <div style={{width:"165vh"}}>
        {categorytype !== "menu" && (
          <Dishmenu 
            dish={categorytype}
            status={selectedOption}
            click={handleClickMenu}
            list={categories}
            handleCategoriaId={handleCategoriaId}
            categoriaId={categoriaId}
          />
        )}
      </div>
      </Grid>
      <Grid container justifyContent="center" marginTop="8rem" marginBottom="8rem">
  <Grid item>
    <Link to="/reservas" style={{ textDecoration: 'none' }}>
      <Button
        variant="contained"
        color="primary"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: "2.67vw 9.47vw",
          gap: "0.267vw",
          width: "17.5vw",
          height: "5.25vw",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: "#835C44",
          borderRadius: "0.375vw",
          textTransform: "none",
          fontSize: "1.67vw",
          color: "#FFFFFF", // Color de texto normal
          "&:hover": {
            color: "#FBE19D", // Cambia el color de texto al pasar el mouse
            background: "#835C44", // Mantiene el color de fondo constante
          },
        }}
      >
        Reservar
      </Button>
    </Link>
  
  </Grid>

</Grid>
    </div>
  );
};

export default CardMenu;