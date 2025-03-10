import { useEffect } from "react";
import useListaFilmes from "../../states/useListaFilmes";
import MovieList from "../../components/MovieList";

export default function PaginaInicial() {
  const { buscarFilmes } = useListaFilmes();

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
      <MovieList />
    </>
  );
}
