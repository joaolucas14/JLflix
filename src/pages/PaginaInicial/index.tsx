import MovieList from "../../components/MovieList";
import styles from "./PaginaInicial.module.css";

export default function PaginaInicial() {
  return (
    <>
      <h1>Filmes em alta</h1>
      <div className={styles.container}>
        <MovieList />
      </div>
    </>
  );
}
