import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import useListaProvider from "../../states/hooks/providers/useListaProvider";
import { useEffect } from "react";

export default function PaginaPadrao() {
  const { buscarProviders } = useListaProvider();
  useEffect(() => {
    buscarProviders();
  }, []);
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
