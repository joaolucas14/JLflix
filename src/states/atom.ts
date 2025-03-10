import { atom } from "recoil";
import IFilme from "../interfaces/IFilme";
import { IFilmeDetalhes } from "../interfaces/IFilmeDetalhes";

export const listaFilmesState = atom<IFilme[] | null>({
  key: "listaFilmesState",
  default: [],
});

export const filmeState = atom<IFilmeDetalhes | null>({
  key: "IFilmeDetalhes",
  default: null,
});
