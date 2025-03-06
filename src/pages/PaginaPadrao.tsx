import { Outlet } from "react-router-dom";

export default function PaginaPadrao() {
  return (
    <div>
      <h1>Estatisticas futebol</h1>
      <Outlet />
    </div>
  );
}
