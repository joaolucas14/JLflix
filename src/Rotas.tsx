import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PaginaPadrao from "./pages/PaginaPadrao";
import PaginaInicial from "./pages/PaginaInicial";

function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaPadrao />}>
          <Route index element={<PaginaInicial />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default Rotas;
