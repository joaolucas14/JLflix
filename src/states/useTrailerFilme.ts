import { useRecoilState } from "recoil";
import { trailerFilmeState } from "./atom";
import http from "../api";

export default function useTrailerFilme() {
  const [trailer, setTrailer] = useRecoilState(trailerFilmeState);
  async function buscarTrailer(id: string) {
    try {
      const resposta = await http.get(`movie/${id}/videos`);
      setTrailer(resposta.data.results);
    } catch (erro) {
      console.log("Erro ao buscar Trailer", erro);
    }
  }
  return { trailer, buscarTrailer };
}
