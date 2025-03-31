import { Link } from "react-router-dom";
import { ICreditos } from "../../interfaces/ICreditos";
import styles from "./ListCast.module.css";

export default function ListCastCrew({ cast, crew }: ICreditos) {
  return (
    <>
      <h2>Elenco e Produção</h2>
      <div className={styles.container}>
        {cast
          .filter((ator) => ator.profile_path)
          .slice(0, 15)
          .map((ator) => (
            <div key={ator.id} className={styles.list}>
              <Link to={`/ator/${ator.id}`} className={styles.link}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${ator.profile_path}`}
                  alt={ator.name}
                  className={styles.image}
                />
                <p className={styles.name}>{`${ator.name} `}</p>
                <p className={styles.function}>{ator.character}</p>
              </Link>
            </div>
          ))}
        {crew
          .filter(
            (member, index, self) =>
              member.profile_path &&
              (member.job === "Director" || member.job === "Producer") &&
              index === self.findIndex((m) => m.id === member.id)
          )
          .map((member) => (
            <div key={member.id} className={styles.list}>
              <Link to={`/diretor/${member.id}`} className={styles.link}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                  alt={member.name}
                  className={styles.image}
                />
                <p className={styles.name}>{member.name}</p>
                <p className={styles.function}></p>
                <p className={styles.function}>
                  {member.job === "Director" ? "Diretor" : "Produtor"}
                </p>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
}
