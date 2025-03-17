import { useRecoilState } from "recoil";
import { listaFilmesState } from "./atom";
import http from "../api";
import { useEffect, useState, useRef } from "react";
import IFilme from "../interfaces/IFilme";

export default function useListaFilmes() {
  const [listaFilmes, setListaFilmes] = useRecoilState(listaFilmesState);
  const [pagina, setPagina] = useState(1);
  const [carregando, setCarregando] = useState(false);
  const carregandoRef = useRef(false);

  async function buscarFilmes() {
    if (carregando || carregandoRef.current) return;

    try {
      setCarregando(true);
      carregandoRef.current = true;

      const resposta = await http.get("discover/movie", {
        params: { page: pagina },
      });

      const novosFilmes = resposta.data.results.filter(
        (filme: IFilme) =>
          !(listaFilmes ?? []).some((f: IFilme) => f.id === filme.id)
      );

      setListaFilmes((prevFilmes) => [...(prevFilmes || []), ...novosFilmes]);
      setPagina((prevPagina) => prevPagina + 1);
    } catch (erro) {
      console.error("Erro ao conectar à API:", erro);
    } finally {
      setCarregando(false);
      carregandoRef.current = false;
    }
  }

  async function buscarFilmesPorNome(termo: string) {
    if (!termo) {
      // Se o termo estiver vazio, volta à lista original
      setListaFilmes([]);
      setPagina(1);
      buscarFilmes();
      return;
    }

    try {
      setCarregando(true);
      const resposta = await http.get("search/movie", {
        params: { query: termo },
      });

      setListaFilmes(resposta.data.results);
    } catch (erro) {
      console.error("Erro ao buscar filmes por nome:", erro);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarFilmes();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const alturaTotal = document.documentElement.scrollHeight;
      const alturaVisivel = window.innerHeight;

      if (scrollY + alturaVisivel >= alturaTotal - 200) {
        buscarFilmes();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [carregando]);

  return { listaFilmes, buscarFilmesPorNome };
}
