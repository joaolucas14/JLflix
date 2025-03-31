import IFilme from "./IFilme";

interface Creditos {
  cast: IFilme[];
  crew: IFilme[];
}

export interface IPessoa {
  id: number;
  name: string;
  biography: string;
  birthday: string;
  deathday: string;
  place_of_birth: string;
  known_for_department: string;
  profile_path?: string;
  movie_credits: Creditos;
  tv_credits: Creditos;
}
