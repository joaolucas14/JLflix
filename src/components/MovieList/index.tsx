import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { generosAtivosFiltroState, termoBuscaState } from "../../states/atom"; // Importando os gêneros ativos do Recoil
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

  // Pegando os gêneros ativos do Recoil
  const generosAtivos = useRecoilValue(generosAtivosFiltroState);

  // Atualiza a busca por nome

  useEffect(() => {
    buscarFilmesPorGenero();
  }, [generosAtivos]);
  return (
    <div>
      <GenrerFilter />
      <ContainerMovieList>
        {listaFilmes && listaFilmes.length > 0 ? (
          Array.from(
            new Set(
              listaFilmes
                .filter((filme) => {
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
                })
                .map((filme) => filme.id)
            )
          )
            .map((id) => listaFilmes.find((filme) => filme.id === id))
            .map((filme) => <MovieCard key={filme!.id} {...filme!} />)
        ) : (
          <p className={styles.filme_NotFound}>Nenhum filme encontrado 📺.</p>
        )}
      </ContainerMovieList>
    </div>
  );
}
