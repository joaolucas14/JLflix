import { ITrailer } from "../../interfaces/ITrailer";
import ContainerInfoMovies from "../ContainerInfoMovies";
import styles from "./Trailer.module.css";

interface TrailerProps {
  trailers: ITrailer[];
  tagline: string;
}

export default function Trailer({ trailers, tagline }: TrailerProps) {
  if (!trailers || trailers.length === 0)
    return <p>Não há trailers disponíveis.</p>;

  const trailersPt = trailers.filter((trailer) => trailer.iso_639_1 === "pt");

  const sortedTrailers = [...trailers].sort(
    (a, b) =>
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );

  const latestTrailer =
    trailersPt.length > 0 ? trailersPt[0] : sortedTrailers[0];

  return (
    <ContainerInfoMovies titulo="Trailer" direita={false}>
      {tagline}
      <iframe
        width="100%"
        height="300"
        src={`https://www.youtube.com/embed/${latestTrailer.key}`}
        title={latestTrailer.name}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={styles.trailerFrame}
      ></iframe>
    </ContainerInfoMovies>
  );
}
