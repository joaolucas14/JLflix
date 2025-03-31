import { useRecoilState } from "recoil";
import { diretorFilmesState } from "../../atom";
import http from "../../../api";

export default function useFilmesEDescricaoPessoa() {
  const [pessoaFilmes, setPessoaFilmes] = useRecoilState(diretorFilmesState);

  async function buscarFilmeEDescricao(id: string) {
    try {
      const resposta = await http.get(
        `person/${id}?append_to_response=movie_credits,tv_credits`
      );
      setPessoaFilmes(resposta.data);
      console.log(resposta.data);
    } catch (erro) {
      console.log("Erro ao buscar filmes do diretor", erro);
    }
  }
  return { pessoaFilmes, buscarFilmeEDescricao };
}
