import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFilmesDiretor from "../../states/hooks/persons/useFilmesDiretor";
import MovieList from "../../components/MovieList";
import styles from "./PaginaDiretor.module.css";

export default function PaginaDiretor() {
  const { id } = useParams<{ id: string }>();
  const { buscarFilmeDiretor, diretorFilmes } = useFilmesDiretor();
  const [valor, setValor] = useState(
    diretorFilmes?.movie_credits.crew ? "Atuou" : "Dirigiu"
  );

  useEffect(() => {
    buscarFilmeDiretor(id!);
  }, [id]);

  return (
    <div className={styles.container}>
      {diretorFilmes?.movie_credits.crew && (
        <select value={valor} onChange={(e) => setValor(e.target.value)}>
          {diretorFilmes?.movie_credits.crew && (
            <option value="Dirigiu">Dirigiu</option>
          )}
          <option value="Atuou">Atuou</option>
        </select>
      )}
      <h1>Página diretor {diretorFilmes?.id}</h1>
      {diretorFilmes?.movie_credits.crew && (
        <div>
          <h2>{valor}</h2>
          <MovieList listaFilmes={diretorFilmes?.movie_credits.crew} />
        </div>
      )}
    </div>
  );
}
