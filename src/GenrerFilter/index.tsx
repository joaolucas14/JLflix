import { useEffect } from "react";
import useGenerosFilme from "../states/useGenerosFilme";
import styles from "./GenrerFilter.module.css";
import { useRecoilState } from "recoil";
import { generosAtivosFiltroState } from "../states/atom";

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
    console.log(generosAtivos);
  }

  return (
    <div className={styles.container}>
      {generos.map((gen) => (
        <button
          value={gen.id}
          key={gen.id}
          onClick={(e) => handleClick(e.currentTarget.value)}
        >
          {gen.name}
        </button>
      ))}
    </div>
  );
}
