import { useRecoilState } from "recoil";
import http from "../../../api";
import { colecaoFilmesState } from "../../atom";

export default function useColecaoFilme() {
  const [colecao, setColecao] = useRecoilState(colecaoFilmesState);
  async function buscarColecao(id: number) {
    try {
      const resposta = await http.get(`collection/${id}`);
      console.log("COLECAO", resposta.data);
      setColecao(resposta.data);
    } catch (erro) {
      console.log("Erro ao buscar coleção", erro);
    }
  }

  return { colecao, buscarColecao, setColecao };
}
