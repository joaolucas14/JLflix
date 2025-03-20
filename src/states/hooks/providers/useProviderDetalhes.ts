import { useRecoilState } from "recoil";
import { useEffect, useState, useRef } from "react";
import http from "../../../api";
import { providerDetalhesState } from "../../atom";

export default function useProviderDetalhes() {
  const [providerDetalhes, setProviderDetalhes] = useRecoilState(
    providerDetalhesState
  );
  const [pagina, setPagina] = useState(1);
  const [carregando, setCarregando] = useState(false);
  const carregandoRef = useRef(false);

  async function buscarDetalhesProvider(providerId: string, paginaAtual = 1) {
    if (carregando || carregandoRef.current) return;

    try {
      setCarregando(true);
      carregandoRef.current = true;

      const resposta = await http.get("/discover/movie", {
        params: {
          with_watch_providers: providerId,
          watch_region: "BR",
          page: paginaAtual, // Define a página atual
        },
      });

      console.log("PROVIDER DETALHES", resposta.data.results);

      // Atualiza a lista sem duplicar filmes já carregados
      setProviderDetalhes((prev) => [
        ...(prev || []),
        ...resposta.data.results,
      ]);
      setPagina(paginaAtual + 1);
    } catch (error) {
      console.error("Erro ao buscar filmes do provedor:", error);
    } finally {
      setCarregando(false);
      carregandoRef.current = false;
    }
  }

  // Scroll infinito para carregar mais filmes
  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      const alturaTotal = document.documentElement.scrollHeight;
      const alturaVisivel = window.innerHeight;

      if (scrollY + alturaVisivel >= alturaTotal - 200) {
        buscarDetalhesProvider(String(providerDetalhes[0]?.id), pagina);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [carregando, pagina]);

  return { buscarDetalhesProvider, providerDetalhes, setProviderDetalhes };
}
