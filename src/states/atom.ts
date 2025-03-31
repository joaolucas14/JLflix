import { atom } from "recoil";
import IFilme from "../interfaces/IFilme";
import { IFilmeDetalhes } from "../interfaces/IFilmeDetalhes";
import { IColecao } from "../interfaces/IColecao";
import { ICreditos } from "../interfaces/ICreditos";
import { IProviders } from "../interfaces/IProviders";
import { ITrailer } from "../interfaces/ITrailer";
import { IGenero } from "../interfaces/IGenero";
import { IProviderList } from "../interfaces/IProviderList";
import { IPessoa } from "../interfaces/IPessoa";

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

export const providerFilmeState = atom<IProviders | null>({
  key: "providerFilmeState",
  default: null,
});

export const trailerFilmeState = atom<ITrailer[]>({
  key: "trailerFilmeState",
  default: [],
});

export const generosFilmeState = atom<IGenero[]>({
  key: "generosFilmeState",
  default: [],
});

export const generosAtivosFiltroState = atom<string[]>({
  key: "generosAtivosFiltroState",
  default: [],
});

export const listaProvidersState = atom<IProviderList[]>({
  key: "listaProvidersState",
  default: [],
});

export const providerDetalhesState = atom<IFilme[]>({
  key: "providerDetalhesState",
  default: [],
});

export const providerAtivoState = atom<IProviderList | string>({
  key: "providerAtivoState",
  default: "Streaming",
});

export const termoBuscaState = atom<string>({
  key: "termoBuscaState",
  default: "",
});

export const classificacaoEtariaState = atom<number | string>({
  key: "classificacaoEtariaState",
  default: "N/A",
});

export const legendasEDublagensState = atom<string[]>({
  key: "legendasEDublagensState",
  default: [],
});

export const diretorFilmesState = atom<IPessoa | null>({
  key: "diretorFilmesState",
  default: null,
});
