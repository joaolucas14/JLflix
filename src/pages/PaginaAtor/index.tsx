import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFilmesEDescricaoPessoa from "../../states/hooks/persons/useFilmesEDescricaoPessoa";
import MovieList from "../../components/MovieList";
import styles from "./PaginaAtor.module.css";
import PessoaInfo from "../../components/PeassoaInfo";
import { useRecoilState } from "recoil";
import { termoBuscaState } from "../../states/atom";

export default function PaginaAtor() {
  const { id } = useParams<{ id: string }>();
  const { buscarFilmeEDescricao, pessoaFilmes } = useFilmesEDescricaoPessoa();
  const [tipoLista, setTipoLista] = useState("Atuou");
  const [, setTermoBusca] = useRecoilState(termoBuscaState);

  useEffect(() => {
    buscarFilmeEDescricao(id!);
    setTermoBusca("");
  }, [id]);

  function jaDirigiu() {
    if (pessoaFilmes?.movie_credits.crew) {
      return pessoaFilmes?.movie_credits.crew.length > 0;
    }
  }

  return (
    <>
      {pessoaFilmes && <PessoaInfo {...pessoaFilmes} />}
      <div className={styles.container}>
        {pessoaFilmes?.movie_credits ? (
          <>
            {jaDirigiu() && (
              <div className={styles.container_select}>
                <select
                  onChange={(e) => setTipoLista(e.currentTarget.value)}
                  value={tipoLista}
                >
                  <option value="Atuou">Atuou</option>
                  <option value="Dirigiu">Dirigiu</option>
                </select>
              </div>
            )}
            {tipoLista == "Atuou" ? (
              <MovieList listaFilmes={pessoaFilmes?.movie_credits.cast} />
            ) : (
              <MovieList listaFilmes={pessoaFilmes?.movie_credits.crew} />
            )}
          </>
        ) : (
          <h1>Este Ator não tem filmes cadastrados.</h1>
        )}
      </div>
    </>
  );
}
