import { useParams } from "react-router-dom";

export default function PaginaFilme() {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <h1>Pagina filme {id}</h1>
    </div>
  );
}
