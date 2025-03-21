import { useRecoilState } from "recoil";
import http from "../../../api";
import { generosFilmeState } from "../../atom";

export default function useGenerosFilme() {
  const [generos, setGeneros] = useRecoilState(generosFilmeState);
  async function buscarGeneros() {
    try {
      const resposta = await http.get("genre/movie/list");
      setGeneros(resposta.data.genres);
    } catch (erro) {
      console.error("Erro ao buscar gêneros:", erro);
    }
  }

  return { generos, buscarGeneros };
}
