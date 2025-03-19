import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { generosAtivosFiltroState } from "../../states/atom"; // Importando os gêneros ativos do Recoil
import useListaFilmes from "../../states/useListaFilmes";
import ContainerMovieList from "../ContainerMovieList";
import styles from "./MovieList.module.css";
import MovieCard from "../MovieCard";
import GenrerFilter from "../GenrerFilter";

export default function MovieList() {
  const { listaFilmes, buscarFilmesPorNome, buscarFilmesPorGenero } =
    useListaFilmes();
  const [termoBusca, setTermoBusca] = useState("");

  // Pegando os gêneros ativos do Recoil
  const generosAtivos = useRecoilValue(generosAtivosFiltroState);

  // Atualiza a busca por nome
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setTermoBusca(valor);
    buscarFilmesPorNome(valor);
  };
  useEffect(() => {
    buscarFilmesPorGenero();
  }, [generosAtivos]);
  return (
    <div>
      <input
        className={styles.input}
        type="text"
        placeholder="Buscar filme..."
        value={termoBusca}
        onChange={handleChange}
      />
      {/* Filtro de Gênero */}
      <GenrerFilter />
      <ContainerMovieList>
        {listaFilmes && listaFilmes.length > 0 ? (
          Array.from(new Set(listaFilmes.map((filme) => filme.id)))
            .map((id) => listaFilmes.find((filme) => filme.id === id))
            .map((filme) => <MovieCard key={filme!.id} {...filme!} />)
        ) : (
          <p className={styles.filme_NotFound}>Nenhum filme encontrado 📺.</p>
        )}
      </ContainerMovieList>
    </div>
  );
}
