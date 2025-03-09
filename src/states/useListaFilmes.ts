import { useRecoilState } from "recoil";
import { listaFilmesState } from "./atom";
import http from "../api";
import { useEffect, useState, useRef } from "react";
import IFilme from "../interfaces/Ifilme";

export default function useListaFilmes() {
  const [listaFilmes, setListaFilmes] = useRecoilState(listaFilmesState);
  const [pagina, setPagina] = useState(1);
  const [carregando, setCarregando] = useState(false);
  const carregandoRef = useRef(false); // UseRef para evitar múltiplas requisições simultâneas

  // const filmesPorPagina = 20;  Número de filmes por página

  async function buscarFilmes() {
    // Verifica se já está carregando, se sim, não faz outra requisição
    if (carregando || carregandoRef.current) return;

    try {
      setCarregando(true);
      carregandoRef.current = true; // Marca que está carregando

      // Faz a requisição para a API com o número da página
      const resposta = await http.get("discover/movie", {
        params: {
          page: pagina, // Número da página
        },
      });

      // Filtra os filmes duplicados (caso já existam na lista)
      const novosFilmes = resposta.data.results.filter(
        (filme: IFilme) =>
          !(listaFilmes ?? []).some((f: IFilme) => f.id === filme.id)
      );

      // Adiciona os filmes da resposta ao estado, sem sobrescrever os filmes existentes
      setListaFilmes((prevFilmes) => [...(prevFilmes || []), ...novosFilmes]);

      // Atualiza a página para a próxima
      setPagina((prevPagina) => prevPagina + 1);
    } catch (erro) {
      console.error("Erro ao conectar à API:", erro);
    } finally {
      setCarregando(false);
      carregandoRef.current = false; // Libera a flag de carregamento
    }
  }

  useEffect(() => {
    // Inicializa a busca ao carregar a página
    buscarFilmes();
  }, []); // Chama a função uma vez ao montar o componente

  useEffect(() => {
    // Detecta o scroll para carregar mais filmes
    const handleScroll = () => {
      const scrollY = window.scrollY; // Posição vertical do scroll
      const alturaTotal = document.documentElement.scrollHeight; // Altura total do documento
      const alturaVisivel = window.innerHeight; // Altura visível da janela

      // Verifica se o usuário está perto do final da página (por exemplo, 200px antes do fim)
      if (scrollY + alturaVisivel >= alturaTotal - 200) {
        buscarFilmes();
      }
    };

    // Adiciona o ouvinte de scroll
    window.addEventListener("scroll", handleScroll);

    // Remove o ouvinte de scroll ao desmontar o componente
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [carregando]); // O efeito é re-executado sempre que `carregando` mudar

  return { listaFilmes, buscarFilmes };
}
