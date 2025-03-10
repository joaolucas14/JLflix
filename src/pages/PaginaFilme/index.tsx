import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFilme from "../../states/useFilme";
import styles from "./PaginaFilme.module.css";
import StarRating from "../../components/StarRating";

export default function PaginaFilme() {
  const { id } = useParams<{ id: string }>();
  const { buscarFilme, filme } = useFilme();
  useEffect(() => {
    if (id) {
      buscarFilme(id);
    }
  }, [id]);
  return (
    <div>
      {filme && filme.title && (
        <div>
          <div
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${filme.backdrop_path})`,
            }}
            className={styles.container}
          >
            <div className={styles.infos}>
              <p className={styles.title}>{filme.title}</p>
              <p>{filme.genres.map((gen) => gen.name).join(", ")}</p>
              <div className={styles.detalhes}>
                Data de lançamento:
                {new Date(filme.release_date).toLocaleDateString()}
                <StarRating rating={filme.vote_average} />
              </div>
              <p>{filme.overview}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
