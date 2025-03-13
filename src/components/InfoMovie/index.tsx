import { IFilmeDetalhes } from "../../interfaces/IFilmeDetalhes";
import styles from "./Infomovie.module.css";
export default function InfoMovie({
  origin_country,
  budget,
  revenue,
}: IFilmeDetalhes) {
  return (
    <div className={styles.pais_receita}>
      <h2>Valores</h2>
      <div className={styles.item}>
        <p>País das gravações: </p>

        {origin_country.map((pais) => (
          <p key={pais}>{` ${pais}`}</p>
        ))}
      </div>
      <div className={styles.item}>
        <p>Custo da Produção: </p>
        {budget > 0 ? (
          <>
            <p>
              {budget.toLocaleString("pt-BR", {
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
      <div className={styles.item}>
        <p>Valor da receita: </p>
        {revenue > 0 ? (
          <>
            <p>
              {revenue.toLocaleString("pt-BR", {
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
  );
}
