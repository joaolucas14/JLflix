// import useFilme from "../../states/useFilme";
import useColecaoFilme from "../../states/hooks/movies/useColecaoFilme";
import ContainerMovieList from "../ContainerMovieList";
import MovieCard from "../MovieCard";
import styles from "./ListColection.module.css";
export default function ListColection({ id }: { id: number }) {
  //   const { filme } = useFilme();
  const { colecao } = useColecaoFilme();
  return (
    colecao && (
      <div className={styles.container_collection}>
        <h1>Filmes da Franquia</h1>
        <p>{colecao.overview}</p>
        <ContainerMovieList>
          {colecao.parts
            .filter((filme) => filme.id !== id && filme.release_date)
            .sort(
              (a, b) =>
                new Date(a.release_date).getTime() -
                new Date(b.release_date).getTime()
            )
            .map((filme) => {
              return <MovieCard key={filme.id} {...filme} />;
            })}
        </ContainerMovieList>
      </div>
    )
  );
}
