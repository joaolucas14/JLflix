interface IFilme {
  id: number;
  title: string;
  overview: string;
  vote_average: string;
  vote_count: number;
  poster_path: string;
  genre_ids?: number[];
}

export default IFilme;
