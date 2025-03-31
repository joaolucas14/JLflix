import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFilmesDiretor from "../../states/hooks/persons/useFilmesDiretor";
import MovieList from "../../components/MovieList";
import styles from "./PaginaDiretor.module.css";
import PessoaInfo from "../../components/PeassoaInfo";
import { useRecoilState } from "recoil";
import { termoBuscaState } from "../../states/atom";

export default function PaginaDiretor() {
  const { id } = useParams<{ id: string }>();
  const { buscarFilmeDiretor, diretorFilmes } = useFilmesDiretor();
  const [tipoLista, setTipoLista] = useState("Dirigiu");
  const [, setTermoBusca] = useRecoilState(termoBuscaState);

  useEffect(() => {
    buscarFilmeDiretor(id!);
    setTermoBusca("");
  }, [id]);

  function jaAtuou() {
    if (diretorFilmes?.movie_credits.cast) {
      return diretorFilmes?.movie_credits.cast.length > 0;
    }
  }

  return (
    <>
      {diretorFilmes && <PessoaInfo {...diretorFilmes} />}
      <div className={styles.container}>
        {diretorFilmes?.movie_credits ? (
          <>
            {jaAtuou() && (
              <div className={styles.container_select}>
                <select
                  onChange={(e) => setTipoLista(e.currentTarget.value)}
                  value={tipoLista}
                >
                  <option value="Dirigiu">Dirigiu</option>
                  <option value="Atuou">Atuou</option>
                </select>
              </div>
            )}
            {tipoLista == "Dirigiu" ? (
              <MovieList listaFilmes={diretorFilmes?.movie_credits.crew} />
            ) : (
              <MovieList listaFilmes={diretorFilmes?.movie_credits.cast} />
            )}
          </>
        ) : (
          <h1>Este diretor não tem filmes cadastrados.</h1>
        )}
      </div>
    </>
  );
}
