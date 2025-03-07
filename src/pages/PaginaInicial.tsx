import { useEffect } from "react";
import IFilme from "../interfaces/Ifilme";
import useListaFilmes from "../states/useListaFilmes";

export default function PaginaInicial() {
  const { buscarFilmes, listaFilmes } = useListaFilmes();
  useEffect(() => {
    try {
      buscarFilmes();
    } catch (erro) {
      console.error("Erro ao conectar à API:", erro);
    }

    buscarFilmes(); // Chamando a função dentro do useEffect
  }, []);

  return (
    <div>
      <h1>Página Inicial</h1>
      {listaFilmes &&
        listaFilmes.map((filme: IFilme) => (
          <div key={filme.id} style={{ margin: "20px", textAlign: "center" }}>
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
