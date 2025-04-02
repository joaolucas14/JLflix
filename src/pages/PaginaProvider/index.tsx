import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProviderFilmes from "../../states/hooks/providers/useProviderFilmes";
import styles from "./PaginaProvier.module.css";
import MovieList from "../../components/MovieList";
import { useRecoilState } from "recoil";
import { providerAtivoState } from "../../states/atom";

export default function PaginaProvider() {
  const { id } = useParams<{ id: string }>();
  const { buscarProviderFilmes, providerFilmes, setProviderFilmes } =
    useProviderFilmes();
  const [providerAtivo] = useRecoilState(providerAtivoState);

  useEffect(() => {
    setProviderFilmes([]);
    buscarProviderFilmes(id!);
    console.log(providerFilmes);
  }, [id]);

  return (
    <>
      <h1>
        Filmes
        {` ${providerAtivo}`}
      </h1>
      <div className={styles.container}>
        <MovieList listaFilmes={providerFilmes!} />
      </div>
    </>
  );
}
