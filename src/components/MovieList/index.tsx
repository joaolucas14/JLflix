import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { generosAtivosFiltroState } from "../../states/atom"; // Importando os gêneros ativos do Recoil
import useListaFilmes from "../../states/useListaFilmes";
import ContainerMovieList from "../ContainerMovieList";
import styles from "./MovieList.module.css";
import MovieCard from "../MovieCard";
import GenrerFilter from "../../GenrerFilter";

export default function MovieList() {
  const { listaFilmes, buscarFilmesPorNome, buscarFilmes } = useListaFilmes();
  const [termoBusca, setTermoBusca] = useState("");
  const [filmesFiltrados, setFilmesFiltrados] = useState(listaFilmes);

  // Pegando os gêneros ativos do Recoil
  const generosAtivos = useRecoilValue(generosAtivosFiltroState);

  // Atualiza a busca por nome
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setTermoBusca(valor);
    buscarFilmesPorNome(valor);
  };

  // Recalcula os filmes filtrados sempre que `listaFilmes` ou `generosAtivos` mudar
  useEffect(() => {
    if (!listaFilmes) return;

    let filmes = listaFilmes;

    // Filtra por gênero se houver algum ativo
    if (generosAtivos.length > 0) {
      filmes = filmes.filter((filme) =>
        filme.genre_ids.some((genero: number) =>
          generosAtivos.includes(String(genero))
        )
      );
    }
    buscarFilmes();
    setFilmesFiltrados(filmes);
  }, [listaFilmes, generosAtivos]); // Atualiza corretamente quando a lista de filmes ou os filtros mudam

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
      {generosAtivos.length > 0 && (
        <div className={styles.genreContainer}>
          {generosAtivos.map((genero) => (
            <span key={genero} className={styles.genre}>
              {genero}
            </span>
          ))}
        </div>
      )}

      {/* Lista de filmes filtrados */}
      <ContainerMovieList>
        {filmesFiltrados!.length > 0 ? (
          filmesFiltrados!.map((filme) => (
            <MovieCard key={filme.id} {...filme} />
          ))
        ) : (
          <p style={{ textAlign: "center", fontSize: "18px" }}>
            Nenhum filme encontrado.
          </p>
        )}
      </ContainerMovieList>
    </div>
  );
}
