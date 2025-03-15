import useProvider from "../../states/useProvider";
import styles from "./ProviderList.module.css";

export default function ProviderList() {
  const { provider } = useProvider();

  return (
    <div>
      {provider?.flatrate ? (
        <h3>Disponível em:</h3>
      ) : (
        <h3>Filme não disponível nos Streams do Brasil</h3>
      )}

      {provider && provider.flatrate && (
        <div className={styles.container}>
          {provider.flatrate.map((p) => (
            <div key={p.provider_id} className={styles.item}>
              <div className={styles.tooltip}>
                <img
                  src={`https://image.tmdb.org/t/p/original/${p.logo_path}`}
                  alt={p.provider_name}
                />
                <span className={styles.tooltipText}>{p.provider_name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
