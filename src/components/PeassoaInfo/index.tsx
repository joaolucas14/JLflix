import { IDiretor } from "../../interfaces/IDiretor";
import styles from "./PessoaInfo.module.css";

export default function PessoaInfo({
  name,
  biography,
  profile_path,
  known_for_department,
}: IDiretor) {
  return (
    <div className={styles.container}>
      <div className={styles.foto}>
        <img
          src={`https://image.tmdb.org/t/p/w200${profile_path}`}
          alt={name}
        />
      </div>
      <div className={styles.infos}>
        <h2>{name}</h2>
        {biography && <p>{biography}</p>}
        <p>{known_for_department}</p>
      </div>
    </div>
  );
}
