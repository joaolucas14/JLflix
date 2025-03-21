import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProviderFilmes from "../../states/hooks/providers/useProviderDetalhes";
import styles from "./PaginaProvier.module.css";
import MovieList from "../../components/MovieList";

export default function PaginaProvider() {
  const { id } = useParams<{ id: string }>();
  const { buscarDetalhesProvider, providerFilmes, setProviderFilmes } =
    useProviderFilmes();

  useEffect(() => {
    setProviderFilmes([]);
    buscarDetalhesProvider(id!);
    console.log(providerFilmes);
  }, [id]);

  return (
    <>
      <h1>Filmes em alta</h1>
      <div className={styles.container}>
        <MovieList listaFilmes={providerFilmes!} />
      </div>
    </>
  );
}
