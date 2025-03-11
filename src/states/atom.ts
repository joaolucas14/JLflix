import { atom } from "recoil";
import IFilme from "../interfaces/IFilme";
import { IFilmeDetalhes } from "../interfaces/IFilmeDetalhes";
import { IColecao } from "../interfaces/IColecao";

export const listaFilmesState = atom<IFilme[] | null>({
  key: "listaFilmesState",
  default: [],
});

export const filmeState = atom<IFilmeDetalhes | null>({
  key: "filmeState",
  default: null,
});

export const colecaoFilmesState = atom<IColecao | null>({
  key: "colecaoFilmesState",
  default: null,
});
