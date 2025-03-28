import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PaginaPadrao from "./pages/PaginaPadrao";
import PaginaInicial from "./pages/PaginaInicial";
import { RecoilRoot } from "recoil";
import PaginaFilme from "./pages/PaginaFilme";
import PaginaProvider from "./pages/PaginaProvider";
import PaginaDiretor from "./pages/PaginaDiretor";

function Rotas() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<PaginaPadrao />}>
            <Route index element={<PaginaInicial />} />
            <Route path="filme/:id" element={<PaginaFilme />} />
            <Route path="provider/:id" element={<PaginaProvider />} />
            <Route path="diretor/:id" element={<PaginaDiretor />} />
          </Route>
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default Rotas;
