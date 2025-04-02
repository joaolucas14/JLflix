import { IFilmeDetalhes } from "../../interfaces/IFilmeDetalhes";
// import useProvider from "../../states/useProvider";
import MovieGenrer from "../MovieGenrer";
import ProviderList from "../ProviderList";
import StarRating from "../StarRating";
import styles from "./MovieDescription.module.css";
export default function MovieDescription(filme: IFilmeDetalhes) {
  return (
    <div
      style={{
        backgroundImage: `url(${
          filme.backdrop_path
            ? `https://image.tmdb.org/t/p/original${filme.backdrop_path}`
            : "../../assets/imageNotFound.png"
        })`,
      }}
      className={styles.container}
    >
      {" "}
      <MovieGenrer {...filme} />
      <div className={styles.infos}>
        <p className={styles.title}>{filme.title}</p>
        {filme.runtime > 0 && (
          <p>{`Duração: ${Math.floor(filme.runtime / 60)}h ${
            filme.runtime % 60
          }min`}</p>
        )}

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

        {filme.homepage && (
          <a className={styles.homepage} href={filme.homepage} target="_blank">
            Página do Filme
          </a>
        )}
        <ProviderList />
      </div>
    </div>
  );
}
