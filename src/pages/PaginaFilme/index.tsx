import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./PaginaFilme.module.css";

import InfoMovie from "../../components/InfoMovie";
import ListCastCrew from "../../components/ListCast";
import ListColection from "../../components/ListColection";
import MovieDescription from "../../components/MovieDescription";

import Trailer from "../../components/Trailer";
import useTrailerFilme from "../../states/hooks/movies/useTrailerFilme";
import useFilmeProvider from "../../states/hooks/movies/useFilmeProvider";
import useFilme from "../../states/hooks/movies/useFilme";
import useColecaoFilme from "../../states/hooks/movies/useColecaoFilme";
import useCreditosFilme from "../../states/hooks/movies/useCreditosFilme";
import useClassificacaoEtaria from "../../states/hooks/movies/useClassificacaoEtaria";

export default function PaginaFilme() {
  const { id } = useParams<{ id: string }>();
  const { buscarFilme, filme } = useFilme();
  const { buscarColecao, colecao, setColecao } = useColecaoFilme();
  const { buscarCreditos, creditos } = useCreditosFilme();
  const { buscarProvider } = useFilmeProvider();
  const { buscarTrailer, trailer } = useTrailerFilme();
  const { buscarClassificacaoEtaria, classificacao } = useClassificacaoEtaria();
  const isCollection = filme?.belongs_to_collection?.id;

  useEffect(() => {
    if (id) {
      buscarFilme(id);
      buscarCreditos(id);
      buscarProvider(id);
      buscarTrailer(id);
      buscarClassificacaoEtaria(id);

      setColecao(null);
    }
    window.scrollTo(0, 0);
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
          <p>{classificacao}</p>
          <MovieDescription {...filme} />
          <div className={styles.detalhes}>
            {trailer && <Trailer trailers={trailer} tagline={filme.tagline} />}

            {creditos && (
              <>
                <ListCastCrew {...creditos} />
              </>
            )}
            <InfoMovie {...filme} />

            {colecao && <ListColection id={filme.id} />}
          </div>
        </>
      )}
    </div>
  );
}
