import { atom } from "recoil";
import IFilme from "../interfaces/IFilme";
import { IFilmeDetalhes } from "../interfaces/IFilmeDetalhes";
import { IColecao } from "../interfaces/IColecao";
import { ICreditos } from "../interfaces/ICreditos";

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

export const creditosFilmesState = atom<ICreditos | null>({
  key: "creditosFilmesState",
  default: null,
});
