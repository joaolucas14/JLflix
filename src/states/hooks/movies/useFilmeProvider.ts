import { useRecoilState } from "recoil";
import { providerFilmeState } from "../../atom";
import http from "../../../api";

export default function useFilmeProvider() {
  const [provider, setProvider] = useRecoilState(providerFilmeState);
  async function buscarProvider(id: string) {
    try {
      const resposta = await http.get(`/movie/${id}/watch/providers`);
      console.log("PROVIDER", resposta.data.results["BR"] || {});
      setProvider(resposta.data.results["BR"] || {});
    } catch (erro) {
      console.log("Erro ao buscar providers", erro);
    }
  }
  return { provider, buscarProvider };
}
