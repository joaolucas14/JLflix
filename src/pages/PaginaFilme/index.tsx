import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFilme from "../../states/useFilme";
import styles from "./PaginaFilme.module.css";
import StarRating from "../../components/StarRating";
import useColecaoFilme from "../../states/useColecaoFilme";
import MovieCard from "../../components/MovieCard";
import ContainerMovieList from "../../components/ContainerMovieList";

export default function PaginaFilme() {
  const { id } = useParams<{ id: string }>();
  const { buscarFilme, filme } = useFilme();
  const { buscarColecao, colecao, setColecao } = useColecaoFilme();
  const isCollection = filme?.belongs_to_collection?.id;

  useEffect(() => {
    if (id) {
      buscarFilme(id);
      setColecao(null);
    }
  }, [id]); // Busca o filme apenas quando o ID mudar

  useEffect(() => {
    if (isCollection) {
      const timer = setTimeout(() => {
        buscarColecao(isCollection);
      }, 2000); // Aguarda 2 segundos antes de fazer a requisição

      return () => clearTimeout(timer); // Limpa o timeout se o componente desmontar
    }
  }, [id, isCollection]);

  return (
    <div>
      {filme && filme.title && (
        <>
          <div>
            <div
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${filme.backdrop_path})`,
              }}
              className={styles.container}
            >
              <div className={styles.infos}>
                <p className={styles.title}>{filme.title}</p>
                <p>{filme.genres.map((gen) => gen.name).join(", ")}</p>
                <div className={styles.detalhes}>
                  {filme.release_date && filme.release_date.length > 1
                    ? `Data de lançamento: ${new Date(
                        filme.release_date
                      ).toLocaleDateString()}`
                    : "Data de lançamento não disponível"}
                  {Number(filme.vote_average) > 0 && (
                    <StarRating rating={filme.vote_average} />
                  )}
                </div>
                <p>{filme.overview}</p>
              </div>
            </div>
          </div>

          <div className={styles.container_collection}>
            {colecao && (
              <>
                <h1>Filmes da Franquia</h1>
                <ContainerMovieList>
                  {colecao.parts
                    .filter((filme) => filme.id !== Number(id))
                    .sort(
                      (a, b) =>
                        new Date(a.release_date).getTime() -
                        new Date(b.release_date).getTime()
                    )
                    .map((filme) => (
                      <MovieCard key={filme.id} {...filme} />
                    ))}
                </ContainerMovieList>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
