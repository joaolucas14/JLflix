import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import useListaProvider from "../../states/hooks/providers/useListaProvider";
import { useEffect } from "react";
import useListaFilmes from "../../states/hooks/movies/useListaFilmes";

export default function PaginaPadrao() {
  const { buscarProviders } = useListaProvider();
  const { buscarFilmes } = useListaFilmes();

  useEffect(() => {
    buscarProviders();
    buscarFilmes();
  }, []);
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
