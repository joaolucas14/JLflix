import { useRecoilState } from "recoil";
import http from "../../../api";
import { creditosFilmesState } from "../../atom";

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
