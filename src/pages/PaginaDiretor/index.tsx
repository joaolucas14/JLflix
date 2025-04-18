import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFilmesEDescricaoPessoa from "../../states/hooks/persons/useFilmesEDescricaoPessoa";
import MovieList from "../../components/MovieList";
import styles from "./PaginaDiretor.module.css";
import PessoaInfo from "../../components/PeassoaInfo";
import { useRecoilState } from "recoil";
import { termoBuscaState } from "../../states/atom";

export default function PaginaDiretor() {
  const { id } = useParams<{ id: string }>();
  const { buscarFilmeEDescricao, pessoaFilmes } = useFilmesEDescricaoPessoa();
  const [tipoLista, setTipoLista] = useState("Dirigiu");
  const [, setTermoBusca] = useRecoilState(termoBuscaState);

  useEffect(() => {
    buscarFilmeEDescricao(id!);
    setTermoBusca("");
  }, [id]);

  function jaAtuou() {
    if (pessoaFilmes?.movie_credits.cast) {
      return pessoaFilmes?.movie_credits.cast.length > 0;
    }
  }

  return (
    <>
      {pessoaFilmes && <PessoaInfo {...pessoaFilmes} />}
      <div className={styles.container}>
        {pessoaFilmes?.movie_credits ? (
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
              <MovieList listaFilmes={pessoaFilmes?.movie_credits.crew} />
            ) : (
              <MovieList listaFilmes={pessoaFilmes?.movie_credits.cast} />
            )}
          </>
        ) : (
          <h1>Este diretor não tem filmes cadastrados.</h1>
        )}
      </div>
    </>
  );
}
