import { useRecoilState } from "recoil";
import http from "../../../api";
import { filmeState } from "../../atom";

export default function useFilme() {
  const [filme, setFilme] = useRecoilState(filmeState);
  async function buscarFilme(id: string) {
    try {
      const resposta = await http.get(`movie/${id}`);
      console.log("detalhes", resposta.data);
      setFilme(resposta.data);
    } catch (erro) {
      console.log("Erro ao buscar filme", erro);
    }
  }

  return { filme, buscarFilme };
}
