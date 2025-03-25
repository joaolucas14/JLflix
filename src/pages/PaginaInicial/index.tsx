import InputTextFilter from "../../components/InputTextFilter";
import MovieList from "../../components/MovieList";
import useListaFilmes from "../../states/hooks/movies/useListaFilmes";
import styles from "./PaginaInicial.module.css";

export default function PaginaInicial() {
  const { listaFilmes } = useListaFilmes();

  return (
    <>
      <h1>Filmes em alta!</h1>
      <div className={styles.container}>
        <InputTextFilter />
        <MovieList listaFilmes={listaFilmes!} />
      </div>
    </>
  );
}
