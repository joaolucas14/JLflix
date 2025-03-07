import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PaginaPadrao from "./pages/PaginaPadrao";
import PaginaInicial from "./pages/PaginaInicial";
import { RecoilRoot } from "recoil";

function Rotas() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<PaginaPadrao />}>
            <Route index element={<PaginaInicial />} />
          </Route>
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default Rotas;
