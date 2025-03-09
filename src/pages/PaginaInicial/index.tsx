import { useEffect } from "react";
import useListaFilmes from "../../states/useListaFilmes";
import IFilme from "../../interfaces/Ifilme";
import styles from "./PaginaInicial.module.css";
import MovieCard from "../../components/MovieCard";

export default function PaginaInicial() {
  const { buscarFilmes, listaFilmes } = useListaFilmes();
  useEffect(() => {
    try {
      buscarFilmes();
    } catch (erro) {
      console.error("Erro ao conectar à API:", erro);
    }
  }, []);

  return (
    <>
      <h1>Filmes em alta</h1>
      <ul className={styles.container}>
        {listaFilmes &&
          listaFilmes.map((filme: IFilme) => (
            <MovieCard key={filme.id} {...filme} />
          ))}
      </ul>
    </>
  );
}
