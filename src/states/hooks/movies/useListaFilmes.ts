import { useRecoilState } from "recoil";
import http from "../../../api";
import { useEffect, useState, useRef } from "react";
import {
  generosAtivosFiltroState,
  listaFilmesState,
  ordenacaoState,
} from "../../atom";

export default function useListaFilmes() {
  const [listaFilmes, setListaFilmes] = useRecoilState(listaFilmesState);
  const [generosSelecionados] = useRecoilState(generosAtivosFiltroState);
  const [pagina, setPagina] = useState(1);
  const [carregando, setCarregando] = useState(false);
  const [termoBusca, setTermoBusca] = useState("");
  const [ordenacao] = useRecoilState(ordenacaoState);
  const carregandoRef = useRef(false);

  useEffect(() => {
    const filmesSalvos = sessionStorage.getItem("listaFilmes");
    if (filmesSalvos) {
      setListaFilmes(JSON.parse(filmesSalvos));
    } else {
      buscarFilmes(1);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("listaFilmes", JSON.stringify(listaFilmes));
  }, [listaFilmes]);

  useEffect(() => {
    if (ordenacao) {
      buscarFilmes(1, true);
    }
  }, [ordenacao]);

  async function buscarFilmes(paginaAtual = 1, resetarLista = false) {
    if (carregando || carregandoRef.current) return;

    try {
      setCarregando(true);
      carregandoRef.current = true;

      const params: Record<string, string | number> = {
        page: paginaAtual,
        sort_by: ordenacao,
      };

      if (generosSelecionados.length > 0) {
        params.with_genres = generosSelecionados.join(",");
      }

      if (termoBusca) {
        params.query = termoBusca;
      }

      const url = termoBusca ? "search/movie" : "discover/movie";
      const resposta = await http.get(url, { params });

      const novosFilmes = resposta.data.results;

      setListaFilmes((prevFilmes) =>
        resetarLista ? novosFilmes : [...(prevFilmes || []), ...novosFilmes]
      );
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
    buscarFilmes(1, true);
  }

  function buscarFilmesPorGenero() {
    buscarFilmes(1, true);
  }

  function ordenacaoFilmes() {
    buscarFilmes(1, true);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 200
      ) {
        buscarFilmes(pagina);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pagina, carregando]);

  return {
    listaFilmes,
    buscarFilmesPorNome,
    buscarFilmesPorGenero,
    buscarFilmes,
    ordenacaoFilmes,
  };
}
