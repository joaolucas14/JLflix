import { ICreditos } from "../../interfaces/ICreditos";
import styles from "./ListCast.module.css";

export default function ListCast({ cast }: ICreditos) {
  return (
    <>
      {" "}
      <h2>Elenco</h2>
      <div className={styles.container}>
        {cast
          .filter((ator) => ator.profile_path)
          .slice(0, 15)
          .map((ator) => (
            <div key={ator.id} className={styles.cast_list}>
              <img
                src={`https://image.tmdb.org/t/p/w200${ator.profile_path}`}
                alt={ator.name}
                className={styles.cast_image}
              />
              <p className={styles.actor}>{`${ator.name} `}</p>
              <p className={styles.character}>{ator.character}</p>
            </div>
          ))}
      </div>
    </>
  );
}
