import IFilme from "./IFilme";

interface Creditos {
  cast: IFilme[];
  crew: IFilme[];
}

export interface IDiretor {
  id: number;
  name: string;
  biography: string;
  profile_path?: string;
  movie_credits: Creditos;
  tv_credits: Creditos;
}
