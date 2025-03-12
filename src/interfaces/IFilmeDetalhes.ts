export interface IFilmeDetalhes {
  id: number;
  adult: string;
  backdrop_path: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  title: string;
  poster_path: string;
  tagline: string;
  vote_average: string;
  release_date: string;
  genres: [{ id: number; name: string }];
  belongs_to_collection: {
    backdrop_path: string;
    id: number;
    name: string;
    poster_path: string;
  };
  runtime: number;
  homepage: string;
  budget: number;
  revenue: number;
}
