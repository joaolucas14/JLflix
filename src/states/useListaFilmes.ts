import { useRecoilState } from "recoil";
import { listaFilmesState } from "./atom";
import http from "../api";

export default function useListaFilmes() {
  const [listaFilmes, setListaFilmes] = useRecoilState(listaFilmesState);

  async function buscarFilmes() {
    try {
      const resposta = await http.get("discover/movie");
      setListaFilmes(resposta.data.results);
    } catch (erro) {
      console.error("Erro ao conectar à API:", erro);
    }
  }

  return { listaFilmes, buscarFilmes };
}
