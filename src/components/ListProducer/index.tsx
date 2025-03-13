import { ICreditos } from "../../interfaces/ICreditos";
import styles from "./ListProducer.module.css";

export default function ListProducer({ crew }: ICreditos) {
  return (
    <div className={styles.crew}>
      <h2>Direção e Produção:</h2>
      {crew
        .filter(
          (member, index, self) =>
            (member.job === "Director" || member.job === "Producer") &&
            index === self.findIndex((m) => m.id === member.id)
        )
        .map((member) => (
          <div key={member.id} className={styles.crew_list}>
            <p>
              {member.job === "Director" ? "Diretor" : "Produtor"}:{" "}
              {member.name}
            </p>
            {member.profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                alt={member.name}
                className={styles.crew_image}
              />
            )}
          </div>
        ))}
    </div>
  );
}
