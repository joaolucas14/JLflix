import { useRecoilState } from "recoil";
import { useEffect, useState, useRef } from "react";
import http from "../../../api";
import { providerDetalhesState } from "../../atom";
import IFilme from "../../../interfaces/IFilme";

export default function useProviderFilmes() {
  const [providerFilmes, setProviderFilmes] = useRecoilState(
    providerDetalhesState
  );
  const [pagina, setPagina] = useState(1);
  const [carregando, setCarregando] = useState(false);
  const [currentProviderId, setCurrentProviderId] = useState<string | null>(
    null
  );
  const [totalPaginas, setTotalPaginas] = useState(1);
  const carregandoRef = useRef(false);

  async function buscarProviderFilmes(newProviderId: string, paginaAtual = 1) {
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

      const resposta = await http.get("/discover/movie", {
        params: {
          with_watch_providers: newProviderId,
          watch_region: "BR",
          page: paginaAtual,
        },
      });

      // Atualiza o número total de páginas
      setTotalPaginas(resposta.data.total_pages);

      // Remove duplicatas e atualiza estado
      setProviderFilmes((prev) => {
        const existingIds = new Set(prev.map((movie) => movie.id));
        const newMovies = resposta.data.results.filter(
          (movie: IFilme) => !existingIds.has(movie.id)
        );
        return [...prev, ...newMovies];
      });

      // Atualiza página somente se não for a última
      if (paginaAtual < resposta.data.total_pages) {
        setPagina(paginaAtual + 1);
      }
    } catch (error) {
      console.error("Erro ao buscar filmes do provedor:", error);
    } finally {
      setCarregando(false);
      carregandoRef.current = false;
    }
  }

  // Scroll infinito
  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      const alturaTotal = document.documentElement.scrollHeight;
      const alturaVisivel = window.innerHeight;

      if (scrollY + alturaVisivel >= alturaTotal - 200 && currentProviderId) {
        buscarProviderFilmes(currentProviderId, pagina);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [carregando, pagina, currentProviderId]);

  return {
    buscarDetalhesProvider: buscarProviderFilmes,
    providerFilmes,
    setProviderFilmes,
  };
}
