import { IFilmeDetalhes } from "../../interfaces/IFilmeDetalhes";
import Genrer from "../Genrer";
import styles from "./MovieGenrer.module.css";

export default function MovieGenrer(filme: IFilmeDetalhes) {
  return (
    <div className={styles.container}>
      {filme.genres.map((gen) => (
        <Genrer key={gen.id} title={gen.name} />
      ))}
    </div>
  );
}
