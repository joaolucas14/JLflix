import { atom } from "recoil";
import IFilme from "../interfaces/IFilme";

export const listaFilmesState = atom<IFilme[] | null>({
  key: "listaFilmesState",
  default: [],
});
