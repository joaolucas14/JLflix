import { useEffect, useState } from "react";
import http from "../api";

export default function PaginaInicial() {
  const [filmes, setFilmes] = useState();
  useEffect(() => {
    async function buscarFilmes() {
      try {
        const resposta = await http.get("discover/movie");
        console.log(resposta.data);
        setFilmes(resposta.data);
      } catch (erro) {
        console.error("Erro ao conectar à API:", erro);
      }
    }

    buscarFilmes(); // Chamando a função dentro do useEffect
  }, []);

  return (
    <div>
      <h1>Página Inicial</h1>
      {filmes &&
        filmes.results.map((filme: any) => (
          <div
            key={filme.imdbID}
            style={{ margin: "20px", textAlign: "center" }}
          >
            <p>{filme.id}</p>
            <p>{filme.title}</p>
            <img
              src={`https://image.tmdb.org/t/p/original${filme.poster_path}`}
              alt={filme.title}
              style={{
                width: "200px",
                height: "300px",
                objectFit: "cover",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>
        ))}
    </div>
  );
}
