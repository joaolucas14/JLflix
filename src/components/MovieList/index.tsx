import { useState } from "react";
import useListaFilmes from "../../states/useListaFilmes";
import ContainerMovieList from "../ContainerMovieList";
import styles from "./MovieList.module.css";
import MovieCard from "../MovieCard";
import GenrerFilter from "../../GenrerFilter";

export default function MovieList() {
  const { listaFilmes, buscarFilmesPorNome } = useListaFilmes();
  const [termoBusca, setTermoBusca] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setTermoBusca(valor);
    buscarFilmesPorNome(valor);
  };

  return (
    <div>
      <input
        className={styles.input}
        type="text"
        placeholder="Buscar filme..."
        value={termoBusca}
        onChange={handleChange}
      />
      {/* Lista de filmes */}
      <GenrerFilter />
      <ContainerMovieList>
        {listaFilmes && listaFilmes.length > 0 ? (
          listaFilmes.map((filme) => <MovieCard key={filme.id} {...filme} />)
        ) : (
          <p style={{ textAlign: "center", fontSize: "18px" }}>
            Nenhum filme encontrado.
          </p>
        )}
      </ContainerMovieList>
    </div>
  );
}
