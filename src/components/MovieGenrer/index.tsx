import { Link } from "react-router-dom";
import { IFilmeDetalhes } from "../../interfaces/IFilmeDetalhes";
import Genrer from "../Genrer";
import styles from "./MovieGenrer.module.css";
import {
  generosAtivosFiltroState,
  providerAtivoState,
} from "../../states/atom";
import { useRecoilState } from "recoil";

export default function MovieGenrer(filme: IFilmeDetalhes) {
  const [, setGenerosAtivos] = useRecoilState(generosAtivosFiltroState);
  const [, setProviderAtivo] = useRecoilState(providerAtivoState);
  function aoClicar(gen: number) {
    setGenerosAtivos([String(gen)]);
    setProviderAtivo("Streaming");
  }
  return (
    <div className={styles.container}>
      {filme.genres.map((gen) => (
        <Link key={gen.id} to={"/"} onClick={() => aoClicar(gen.id)}>
          <Genrer title={gen.name} />
        </Link>
      ))}
    </div>
  );
}
