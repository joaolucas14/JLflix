import { useRecoilState } from "recoil";
import { legendasEDublagensState } from "../../atom";
import http from "../../../api";
import { ILegendas } from "../../../interfaces/ILegendas";

export default function useLegendaEDublagem() {
  const [legDub, setLegDub] = useRecoilState(legendasEDublagensState);

  async function buscarLegendaEDublagem(id: string) {
    try {
      const resposta = await http.get(
        `movie/${id}?append_to_response=translations`
      );
      const legendas = resposta.data.translations.translations.map(
        (traducao: ILegendas) => traducao.english_name
      );

      setLegDub(legendas);
      console.log("Dublagens e Legendas Disponíveis:", legendas);
    } catch (erro) {
      console.log("Erro ao buscar legenda e dublagem", erro);
    }
  }

  return { legDub, buscarLegendaEDublagem };
}
