import IFilme from "../../interfaces/IFilme";
import useListaFilmes from "../../states/useListaFilmes";
import ContainerMovieList from "../ContainerMovieList";
import MovieCard from "../MovieCard";
export default function MovieList() {
  const { listaFilmes } = useListaFilmes();
  return (
    <ContainerMovieList>
      {listaFilmes &&
        listaFilmes
          .filter(
            (filme, index, self) =>
              self.findIndex((f) => f.id === filme.id) === index
          )
          .map((filme: IFilme) => <MovieCard key={filme.id} {...filme} />)}
    </ContainerMovieList>
  );
}
