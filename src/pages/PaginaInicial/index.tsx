import { useEffect } from "react";
import InputTextFilter from "../../components/InputTextFilter";
import MovieList from "../../components/MovieList";
import useListaFilmes from "../../states/hooks/movies/useListaFilmes";
import styles from "./PaginaInicial.module.css";
import { ordenacaoState } from "../../states/atom";
import { useRecoilState } from "recoil";

export default function PaginaInicial() {
  const { listaFilmes, buscarFilmesPorGenero } = useListaFilmes();
  const [ordenacao, setOrdenacao] = useRecoilState(ordenacaoState);

  useEffect(() => {
    buscarFilmesPorGenero();
  }, [ordenacao]);

  return (
    <>
      <h1>Filmes em alta!</h1>

      <div className={styles.container}>
        <InputTextFilter />
        <select onChange={(e) => setOrdenacao(e.currentTarget.value)}>
          <option value="popularity.desc">Mais populares</option>
          <option value="popularity.asc">Menos populares</option>
          <option value="vote_average.desc">Melhor avaliados</option>
          <option value="vote_average.asc">Pior avaliados</option>
          <option value="release_date.desc">Mais recentes</option>
          <option value="release_date.asc">Mais antigos</option>
        </select>
        <MovieList listaFilmes={listaFilmes!} />
      </div>
    </>
  );
}
