import { useRecoilState } from "recoil";
import http from "../../../api";
import { useEffect, useState, useRef } from "react";
import {
  generosAtivosFiltroState,
  listaFilmesState,
  ordenacaoState,
} from "../../atom";
import IFilme from "../../../interfaces/IFilme";

export default function useListaFilmes() {
  const [listaFilmes, setListaFilmes] = useRecoilState(listaFilmesState);
  const [generosSelecionados, setGenerosSelecionados] = useRecoilState(
    generosAtivosFiltroState
  );
  const [pagina, setPagina] = useState(1);
  const [carregando, setCarregando] = useState(false);
  const [termoBusca, setTermoBusca] = useState("");
  const [ordenacao] = useRecoilState(ordenacaoState);
  const carregandoRef = useRef(false);

  async function buscarFilmes(paginaAtual = 1) {
    if (carregando || carregandoRef.current) return;

    try {
      setCarregando(true);
      carregandoRef.current = true;

      const params: Record<string, string | number> = {
        page: paginaAtual,
        sort_by: ordenacao,
      };

      // Se houver gêneros selecionados, busca por gênero
      if (generosSelecionados.length > 0) {
        params.with_genres = generosSelecionados.join(",");
      }

      // Se houver um termo de busca, filtra dentro do gênero
      if (termoBusca) {
        params.query = termoBusca;
      }

      const url = termoBusca ? "search/movie" : "discover/movie";
      const resposta = await http.get(url, { params });

      const novosFilmes = resposta.data.results.filter(
        (filme: IFilme) =>
          !(listaFilmes ?? []).some((f: IFilme) => f.id === filme.id)
      );

      setListaFilmes((prevFilmes) => [...(prevFilmes || []), ...novosFilmes]);
      setPagina(paginaAtual + 1);
    } catch (erro) {
      console.error("Erro ao conectar à API:", erro);
    } finally {
      setCarregando(false);
      carregandoRef.current = false;
    }
  }

  function buscarFilmesPorNome(termo: string) {
    setTermoBusca(termo);
    setListaFilmes([]); // Reseta a lista para evitar mistura
    setPagina(1);
    buscarFilmes(1);
  }

  function buscarFilmesPorGenero() {
    setGenerosSelecionados(generosSelecionados);
    setListaFilmes([]); // Reseta a lista para evitar mistura
    setPagina(1);
    buscarFilmes(1);
  }
  // function ordenacaoFilmes(ordem: string) {
  //   setOrdenacao(ordem);
  //   setListaFilmes([]); // Reseta a lista para evitar mistura
  //   setPagina(1);
  //   buscarFilmes(1);
  // }

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const alturaTotal = document.documentElement.scrollHeight;
      const alturaVisivel = window.innerHeight;

      if (scrollY + alturaVisivel >= alturaTotal - 200) {
        buscarFilmes(pagina);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [carregando]);

  return {
    listaFilmes,
    buscarFilmesPorNome,
    buscarFilmesPorGenero,
    buscarFilmes,
  };
}
