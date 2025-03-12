import { useRecoilState } from "recoil";
import { creditosFilmesState } from "./atom";
import http from "../api";

export default function useCreditosFilme() {
  const [creditos, setCreditos] = useRecoilState(creditosFilmesState);
  async function buscarCreditos(id: string) {
    try {
      const resposta = await http.get(`/movie/${id}/credits`);
      console.log("CREDITOS", resposta.data);
      setCreditos(resposta.data);
    } catch (erro) {
      console.log("Erro ao buscar coleção", erro);
    }
  }
  return { creditos, buscarCreditos };
}
