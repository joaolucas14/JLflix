// import { useEffect } from "react";
import { useEffect } from "react";
import MovieList from "../../components/MovieList";
// import useGenerosFilme from "../../states/useGenerosFilme";
import styles from "./PaginaInicial.module.css";
import useListaProvider from "../../states/hooks/providers/useListaProvider";

export default function PaginaInicial() {
  const { buscarProviders } = useListaProvider();
  useEffect(() => {
    buscarProviders();
  }, []);
  return (
    <>
      <h1>Filmes em alta</h1>

      <div className={styles.container}>
        <MovieList />
      </div>
    </>
  );
}
