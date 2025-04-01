import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  generosAtivosFiltroState,
  ordenacaoState,
  termoBuscaState,
} from "../../states/atom"; // Importando os gêneros ativos do Recoil
import ContainerMovieList from "../ContainerMovieList";
import styles from "./MovieList.module.css";
import MovieCard from "../MovieCard";
import GenrerFilter from "../GenrerFilter";
import useListaFilmes from "../../states/hooks/movies/useListaFilmes";
import IFilme from "../../interfaces/IFilme";

interface MovieListProps {
  listaFilmes: IFilme[];
}

export default function MovieList({ listaFilmes }: MovieListProps) {
  const { buscarFilmesPorGenero } = useListaFilmes();
  const [termoBusca] = useRecoilState(termoBuscaState);
  const [ordenacao, setOrdenacao] = useRecoilState(ordenacaoState);
  const generosAtivos = useRecoilValue(generosAtivosFiltroState);

  useEffect(() => {
    buscarFilmesPorGenero();
  }, [generosAtivos]);
  useEffect(() => {
    buscarFilmesPorGenero();
  }, [ordenacao]);
  return (
    <div>
      <select onChange={(e) => setOrdenacao(e.target.value)}>
        <option value="popularity.desc">Mais populares</option>
        <option value="popularity.asc">Menos populares</option>
        <option value="vote_average.desc">Melhor avaliados</option>
        <option value="vote_average.asc">Pior avaliados</option>
        <option value="release_date.desc">Mais recentes</option>
        <option value="release_date.asc">Mais antigos</option>
      </select>
      <GenrerFilter />
      <ContainerMovieList>
        {listaFilmes && listaFilmes.length > 0 ? (
          (() => {
            const filteredMovies = listaFilmes.filter((filme) => {
              const matchesTitle = filme.title
                .toLowerCase()
                .includes(termoBusca.toLowerCase());
              const matchesGenre =
                generosAtivos.length === 0 ||
                (filme.genre_ids &&
                  filme.genre_ids.some((genre) =>
                    generosAtivos.includes(String(genre))
                  ));
              return matchesTitle && matchesGenre;
            });

            const uniqueMovieIds = Array.from(
              new Set(filteredMovies.map((filme) => filme.id))
            );

            const uniqueMovies = uniqueMovieIds.map((id) =>
              listaFilmes.find((filme) => filme.id === id)
            );

            return uniqueMovies.map((filme) => (
              <MovieCard key={filme!.id} {...filme!} />
            ));
          })()
        ) : (
          <p className={styles.filme_NotFound}>Nenhum filme encontrado 📺.</p>
        )}
      </ContainerMovieList>
    </div>
  );
}
