import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFilme from "../../states/useFilme";
import styles from "./PaginaFilme.module.css";
import useColecaoFilme from "../../states/useColecaoFilme";
import useCreditosFilme from "../../states/useCreditosFilme";
import InfoMovie from "../../components/InfoMovie";
import ListProducer from "../../components/ListProducer";
import ListCast from "../../components/ListCast";
import ListColection from "../../components/ListColection";
import MovieDescription from "../../components/MovieDescription";

export default function PaginaFilme() {
  const { id } = useParams<{ id: string }>();
  const { buscarFilme, filme } = useFilme();
  const { buscarColecao, colecao, setColecao } = useColecaoFilme();
  const { buscarCreditos, creditos } = useCreditosFilme();
  const isCollection = filme?.belongs_to_collection?.id;

  useEffect(() => {
    if (id) {
      buscarFilme(id);
      buscarCreditos(id);
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
          <MovieDescription {...filme} />
          <div className={styles.detalhes}>
            <InfoMovie {...filme} />
            {creditos && (
              <>
                <ListCast {...creditos} />
                <ListProducer {...creditos} />
              </>
            )}

            {colecao && <ListColection id={filme.id} />}
          </div>
        </>
      )}
    </div>
  );
}
