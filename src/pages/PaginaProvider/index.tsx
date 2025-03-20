import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProviderDetalhes from "../../states/hooks/providers/useProviderDetalhes";
import ContainerMovieList from "../../components/ContainerMovieList";
import MovieCard from "../../components/MovieCard";

export default function PaginaProvider() {
  const { id } = useParams<{ id: string }>();
  const { buscarDetalhesProvider, providerDetalhes, setProviderDetalhes } =
    useProviderDetalhes();

  useEffect(() => {
    setProviderDetalhes([]);
    buscarDetalhesProvider(id!);
  }, [id]);

  return (
    <ContainerMovieList>
      {providerDetalhes && providerDetalhes.length > 0 ? (
        Array.from(new Set(providerDetalhes.map((filme) => filme.id)))
          .map((id) => providerDetalhes.find((filme) => filme.id === id))
          .map((filme) => <MovieCard key={filme!.id} {...filme!} />)
      ) : (
        <p>Nenhum filme encontrado 📺.</p>
      )}
    </ContainerMovieList>
  );
}
