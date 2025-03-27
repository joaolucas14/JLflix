import { useRecoilState } from "recoil";
import { classificacaoEtariaState } from "../../atom";
import http from "../../../api";

export default function useClassificacaoEtaria() {
  const [classificacao, setClassificacao] = useRecoilState(
    classificacaoEtariaState
  );

  async function buscarClassificacaoEtaria(id: string) {
    try {
      const resposta = await http.get(`movie/${id}/release_dates`);
      const classificacaoBrasil = resposta.data.results.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (entry: any) => entry.iso_3166_1 === "BR"
      );

      const classificacaoFinal =
        classificacaoBrasil?.release_dates[0]?.certification || "N/A";

      setClassificacao(classificacaoFinal);
    } catch (erro) {
      console.log("Erro ao buscar classificação Etaria", erro);
    }
  }

  return { classificacao, buscarClassificacaoEtaria };
}
