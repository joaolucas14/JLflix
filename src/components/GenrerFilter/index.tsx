import { useEffect } from "react";
import styles from "./GenrerFilter.module.css";
import { useRecoilState } from "recoil";
import { generosAtivosFiltroState } from "../../states/atom";
import useGenerosFilme from "../../states/hooks/movies/useGenerosFilme";

export default function GenrerFilter() {
  const { buscarGeneros, generos } = useGenerosFilme();
  const [generosAtivos, setGenerosAtivos] = useRecoilState(
    generosAtivosFiltroState
  );
  useEffect(() => {
    buscarGeneros();
  }, []);
  function handleClick(genero: string) {
    setGenerosAtivos(
      (atual) =>
        atual.includes(genero)
          ? atual.filter((g) => g !== genero) // Remove se já estiver ativo
          : [...atual, genero] // Adiciona se não estiver ativo
    );
  }

  return (
    <div className={styles.container}>
      {generos.map((gen) => (
        <button
          value={gen.id}
          key={gen.id}
          onClick={(e) => handleClick(e.currentTarget.value)}
          className={`${styles.btn} ${
            generosAtivos.includes(String(gen.id)) ? styles.ativo : ""
          }`}
        >
          {gen.name}
        </button>
      ))}
    </div>
  );
}
