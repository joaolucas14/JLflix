import { useState } from "react";
import useListaFilmes from "../../states/useListaFilmes";
import ContainerMovieList from "../ContainerMovieList";
import MovieCard from "../MovieCard";

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
        type="text"
        placeholder="Buscar filme..."
        value={termoBusca}
        onChange={handleChange}
        style={{
          padding: "10px",
          width: "100%",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginBottom: "20px",
        }}
      />

      {/* Lista de filmes */}
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
