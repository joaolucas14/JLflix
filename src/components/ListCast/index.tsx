import { ICreditos } from "../../interfaces/ICreditos";
import styles from "./ListCast.module.css";

export default function ListCast({ cast }: ICreditos) {
  return (
    <div className={styles.cast}>
      <h2>Elenco</h2>
      <div className={styles.cast_list}></div>
      {cast.slice(0, 5).map((ator) => (
        <div key={ator.id} className={styles.cast_list}>
          <p className={styles.cast_name}>
            {`${ator.name}: ${ator.character}`}
          </p>
          <img
            src={`https://image.tmdb.org/t/p/w200${ator.profile_path}`}
            alt={ator.name}
            className={styles.cast_image}
          />
        </div>
      ))}
    </div>
  );
}
