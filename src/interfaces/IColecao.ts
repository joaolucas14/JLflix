import { IFilmeDetalhes } from "./IFilmeDetalhes";

export interface IColecao {
  id: number;
  name: string;
  overview: string;
  parts: IFilmeDetalhes[];
}
