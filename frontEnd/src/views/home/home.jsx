import Hero from "../../components/hero/hero"
import Menu from "../../components/menu/menu";
import SeccionEventos from "../../components/seccionEventos/seccionEventos";
import Sucursales from "../../components/sucursales/sucursales";
import Resenias from "../../components/resenias/resenias";
import Navbar from "../../components/navbar/navbar"
import Footer from "../../components/footer/footer"

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Menu />
      <SeccionEventos />
      <Sucursales />
      <Resenias />
      <Footer />
    </>
  )
}

export default Home;
