import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProviderDetalhes from "../../states/hooks/providers/useProviderDetalhes";
import styles from "./PaginaProvier.module.css";
import MovieList from "../../components/MovieList";

export default function PaginaProvider() {
  const { id } = useParams<{ id: string }>();
  const { buscarDetalhesProvider, providerDetalhes, setProviderDetalhes } =
    useProviderDetalhes();

  useEffect(() => {
    setProviderDetalhes([]);
    buscarDetalhesProvider(id!);
  }, [id]);

  return (
    <>
      <h1>Filmes em alta</h1>
      <div className={styles.container}>
        <MovieList listaFilmes={providerDetalhes!} />
      </div>
    </>
  );
}
