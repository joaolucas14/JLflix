import { useEffect } from "react";
import useGenerosFilme from "../states/useGenerosFilme";
import Genrer from "../components/Genrer";
import styles from "./GenrerFilter.module.css";

export default function GenrerFilter() {
  const { buscarGeneros, generos } = useGenerosFilme();
  useEffect(() => {
    buscarGeneros();
  }, []);
  return (
    <div className={styles.container}>
      {generos.map((gen) => (
        <Genrer key={gen.id} title={gen.name} />
      ))}
    </div>
  );
}
