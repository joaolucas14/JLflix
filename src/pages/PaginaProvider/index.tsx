import { useParams } from "react-router-dom";

export default function PaginaProvider() {
  const { id } = useParams<{ id: string }>();

  return <h1>Pagina do provider {id}</h1>;
}
