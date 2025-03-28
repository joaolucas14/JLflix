import { useRecoilState } from "recoil";
import { diretorFilmesState } from "../../atom";
import http from "../../../api";

export default function useFilmesDiretor() {
  const [diretorFilmes, setDiretorFilmes] = useRecoilState(diretorFilmesState);

  async function buscarFilmeDiretor(id: string) {
    try {
      const resposta = await http.get(
        `person/${id}?append_to_response=movie_credits,tv_credits`
      );
      setDiretorFilmes(resposta.data);
      console.log(resposta.data);
    } catch (erro) {
      console.log("Erro ao buscar filmes do diretor", erro);
    }
  }
  return { diretorFilmes, buscarFilmeDiretor };
}
