import { useRecoilState } from "recoil";
import { useEffect, useState, useRef, useCallback } from "react";
import http from "../../../api";
import { generosAtivosFiltroState, providerDetalhesState } from "../../atom";
import IFilme from "../../../interfaces/IFilme";

export default function useProviderFilmes() {
  const [providerFilmes, setProviderFilmes] = useRecoilState(
    providerDetalhesState
  );
  const [generosSelecionados] = useRecoilState(generosAtivosFiltroState);
  const [pagina, setPagina] = useState(1);
  const [carregando, setCarregando] = useState(false);
  const [currentProviderId, setCurrentProviderId] = useState<string | null>(
    null
  );
  const [totalPaginas, setTotalPaginas] = useState(1);
  const carregandoRef = useRef(false);

  const buscarFilmes = useCallback(
    async (newProviderId: string, paginaAtual = 1) => {
      if (carregandoRef.current) return;

      // Reseta estado se o provider mudar
      if (currentProviderId !== newProviderId) {
        setCurrentProviderId(newProviderId);
        setPagina(1);
        setProviderFilmes([]);
        setTotalPaginas(1);
        paginaAtual = 1;
      }

      // Verifica se já carregou todas as páginas
      if (paginaAtual > totalPaginas) return;

      try {
        setCarregando(true);
        carregandoRef.current = true;

        const params: {
          with_watch_providers: string;
          watch_region: string;
          page: number;
          with_genres?: string;
          sort_by: string;
        } = {
          with_watch_providers: newProviderId,
          watch_region: "BR",
          page: paginaAtual,
          sort_by: "primary_release_date.desc",
        };

        // Adiciona filtro de gêneros se houver seleção
        if (generosSelecionados.length > 0) {
          params.with_genres = generosSelecionados.join(",");
        }

        const resposta = await http.get("/discover/movie", { params });
        console.log("respota", resposta.config.params);

        setTotalPaginas(resposta.data.total_pages);

        setProviderFilmes((prev) => {
          const existingIds = new Set(prev.map((movie) => movie.id));
          const newMovies = resposta.data.results.filter(
            (movie: IFilme) => !existingIds.has(movie.id)
          );
          return [...prev, ...newMovies];
        });

        if (paginaAtual < resposta.data.total_pages) {
          setPagina(paginaAtual + 1);
        }
      } catch (error) {
        console.error("Erro ao buscar filmes do provedor:", error);
      } finally {
        setCarregando(false);
        carregandoRef.current = false;
      }
    },
    [currentProviderId, generosSelecionados, totalPaginas, setProviderFilmes]
  );

  // Atualiza a busca quando os gêneros mudam
  useEffect(() => {
    if (currentProviderId) {
      setProviderFilmes([]);
      setPagina(1);
      buscarFilmes(currentProviderId, 1);
    }
  }, [generosSelecionados, currentProviderId, buscarFilmes, setProviderFilmes]);

  // Scroll infinito
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const alturaTotal = document.documentElement.scrollHeight;
      const alturaVisivel = window.innerHeight;

      if (
        scrollY + alturaVisivel >= alturaTotal - 200 &&
        currentProviderId &&
        !carregando
      ) {
        buscarFilmes(currentProviderId, pagina);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [carregando, pagina, currentProviderId, buscarFilmes]);

  return {
    buscarProviderFilmes: buscarFilmes,
    providerFilmes,
    setProviderFilmes,
  };
}
