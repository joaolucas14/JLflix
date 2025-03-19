import { useRecoilState } from "recoil";
import { listaProvidersState } from "../../atom";
import http from "../../../api";
import { IProviderList } from "../../../interfaces/IProviderList";

export default function useListaProvider() {
  const [listaProvider, setListaProvider] = useRecoilState(listaProvidersState);

  async function buscarProviders() {
    try {
      const resposta = await http.get(
        "https://api.themoviedb.org/3/watch/providers/movie",
        {
          params: {
            language: "pt-BR",
            watch_region: "BR",
          },
        }
      );
      const provedoresPopulares = [8, 337, 350, 531, 307, 119, 1899, 283, 10];

      const principaisProviders = resposta.data.results.filter(
        (provider: IProviderList) =>
          provedoresPopulares.includes(provider.provider_id)
      );
      console.log(principaisProviders);
      setListaProvider(principaisProviders);
    } catch (erro) {
      console.log("Erro ao buscar providers", erro);
    }
  }
  return { listaProvider, buscarProviders };
}
