import { IFilmeDetalhes } from "../../interfaces/IFilmeDetalhes";
import StarRating from "../StarRating";
import styles from "./MovieDescription.module.css";
export default function MovieDescription(filme: IFilmeDetalhes) {
  return (
    <div
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${filme.backdrop_path})`,
      }}
      className={styles.container}
    >
      <div className={styles.infos}>
        <p className={styles.title}>{filme.title}</p>
        {filme.runtime && (
          <p>{`Duração: ${Math.floor(filme.runtime / 60)}h ${
            filme.runtime % 60
          }min`}</p>
        )}
        <p>{filme.genres.map((gen) => gen.name).join(", ")}</p>
        <div className={styles.detalhes_info}>
          {filme.release_date && filme.release_date.length > 1
            ? `Data de lançamento: ${new Date(
                filme.release_date
              ).toLocaleDateString()}`
            : "Data de lançamento não disponível"}

          {Number(filme.vote_average) > 0 && (
            <StarRating rating={filme.vote_average} />
          )}
        </div>
        <p>{filme.overview}</p>
      </div>
    </div>
  );
}
