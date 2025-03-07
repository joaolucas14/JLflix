import { atom } from "recoil";
import IFilme from "../interfaces/Ifilme";

export const listaFilmesState = atom<IFilme[] | null>({
  key: "listaFilmesState",
  default: [],
});
