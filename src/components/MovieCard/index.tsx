import { useNavigate } from "react-router-dom";
import IFilme from "../../interfaces/IFilme";
import StarRating from "../StarRating";
import styles from "./MovieCard.module.css";
import imageNotFound from "../../assets/imageNotFound.png";

export default function MovieCard({
  id,
  title,
  overview,
  poster_path,
  vote_average,
}: IFilme) {
  const navigate = useNavigate();
  return (
    <li className={styles.movie_card}>
      <div className={styles.movie_poster}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/original${poster_path}`
              : imageNotFound
          }
          alt={title}
        />
      </div>
      <div className={styles.movie_infos}>
        <p className={styles.movie_title}>{title}</p>
        {Number(vote_average) > 0 && <StarRating rating={vote_average} />}
        <div className={styles.hidden_content}>
          {overview && (
            <p className={styles.description}>
              {overview.length > 100
                ? `${overview.substring(0, 100)}...`
                : overview}
            </p>
          )}

          <button
            className={styles.btn_default}
            onClick={() => navigate(`/filme/${id}`)}
          >
            Ver mais
          </button>
        </div>
      </div>
    </li>
  );
}
