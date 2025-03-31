import { useState } from "react";
import useClassificacaoEtaria from "../../states/hooks/movies/useClassificacaoEtaria";
import useFilme from "../../states/hooks/movies/useFilme";
import useLegendaEDublagem from "../../states/hooks/movies/useLegendaEDublagem";
import Modal from "../Modal";
import styles from "./Infomovie.module.css";
export default function InfoMovie() {
  const { filme } = useFilme();
  const { classificacao } = useClassificacaoEtaria();
  const { legDub } = useLegendaEDublagem();
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.informacoes}>
        <h3>Informações</h3>
        <div className={styles.info}>
          <h4>Lançamento</h4>
          <p>
            {filme!.release_date && filme!.release_date.length > 1
              ? `${new Date(filme!.release_date).toLocaleDateString()}`
              : "Não disponível"}
          </p>
        </div>
        <div className={styles.info}>
          <h4>Duração</h4>
          {filme!.runtime > 0 ? (
            <p>{`${Math.floor(filme!.runtime / 60)}h ${
              filme!.runtime % 60
            }min`}</p>
          ) : (
            <p>Não disponível</p>
          )}
        </div>
        <div className={styles.info}>
          <h4>Classificação</h4>
          <p>{`A${classificacao}`}</p>
        </div>
        <div className={styles.info}>
          <h4>País de origem</h4>
          {filme!.origin_country.map((pais) => (
            <p key={pais}>{` ${pais}`}</p>
          ))}
        </div>
      </div>
      <div className={styles.idiomas}>
        <h3>Idiomas</h3>
        <div className={styles.info}>
          <h4>Audio Original</h4>
          <p>{`${filme?.original_language}`}</p>
        </div>
        <div className={styles.info}>
          <h4>Legendas</h4>
          <p>
            {legDub.slice(0, 3).map((legenda, index) => (
              <span key={index} className={styles.legenda}>
                {legenda}
                {index < Math.min(legDub.length, 3) - 1 && ", "}
              </span>
            ))}
            {legDub.length > 3 && <span>...</span>}
            {legDub.length > 3 && (
              <button
                className={styles.verTudo}
                onClick={() => setModalAberto(true)}
              >
                Ver tudo
              </button>
            )}
          </p>
          <Modal
            isOpen={modalAberto}
            onClose={() => setModalAberto(false)}
            title="Legendas"
          >
            <div className={styles.modal_content}>
              {legDub.map((legenda, index) => (
                <p key={index} className={styles.legenda}>
                  {legenda}
                  {index < Math.min(legDub.length, 3) - 1 && ", "}
                </p>
              ))}
            </div>
          </Modal>
        </div>
        <div className={styles.info}>
          <h4>Idiomas falados</h4>
          <p>
            {filme!.spoken_languages.map((idioma, index) => (
              <span key={index} className={styles.legenda}>
                {idioma.english_name}
                {index < filme!.spoken_languages.length - 1 && ", "}
              </span>
            ))}
          </p>
        </div>
      </div>
      <div className={styles.informacoes}>
        <h3>Financeiro</h3>
        <div className={styles.info}>
          <h4>Custo da Produção</h4>
          {filme!.budget > 0 ? (
            <>
              <p>
                {filme!.budget.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </p>
            </>
          ) : (
            "Valor não divulgado"
          )}
        </div>
        <div className={styles.info}>
          <h4>Valor da receita</h4>
          {filme!.revenue > 0 ? (
            <>
              <p>
                {filme!.revenue.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </p>
            </>
          ) : (
            "Valor não divulgado"
          )}
        </div>
      </div>
    </div>
  );
}
