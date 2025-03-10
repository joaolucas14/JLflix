import { useRecoilState } from "recoil";
import { filmeState } from "./atom";
import http from "../api";

export default function useFilme() {
  const [filme, setFilme] = useRecoilState(filmeState);
  async function buscarFilme(id: string) {
    try {
      const resposta = await http.get(`movie/${id}`);
      console.log(resposta.data);
      setFilme(resposta.data);
    } catch (erro) {
      console.log("Erro ao buscar filme", erro);
    }
  }

  return { filme, buscarFilme };
}
