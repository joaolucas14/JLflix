import { useState } from "react";
import styles from "./InputTextFilter.module.css";
import useListaFilmes from "../../states/hooks/movies/useListaFilmes";

export default function InputTextFilter() {
  const [termoBusca, setTermoBusca] = useState("");
  const { buscarFilmesPorNome } = useListaFilmes();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setTermoBusca(valor);
    buscarFilmesPorNome(valor);
  };
  return (
    <div>
      <input
        className={styles.input}
        type="text"
        placeholder="Buscar filme..."
        value={termoBusca}
        onChange={handleChange}
      />
    </div>
  );
}
