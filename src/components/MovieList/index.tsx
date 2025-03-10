import IFilme from "../../interfaces/IFilme";
import useListaFilmes from "../../states/useListaFilmes";
import ContainerMovieList from "../ContainerMovieList";
import MovieCard from "../MovieCard";
export default function MovieList() {
  const { listaFilmes } = useListaFilmes();
  return (
    <ContainerMovieList>
      {listaFilmes &&
        listaFilmes.map((filme: IFilme) => (
          <MovieCard key={filme.id} {...filme} />
        ))}
    </ContainerMovieList>
  );
}
