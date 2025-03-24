import styles from "./InputTextFilter.module.css";
import useListaFilmes from "../../states/hooks/movies/useListaFilmes";
import { termoBuscaState } from "../../states/atom";
import { useRecoilState } from "recoil";

export default function InputTextFilter() {
  const [termoBusca, setTermoBusca] = useRecoilState(termoBuscaState);

  const { buscarFilmesPorNome, buscarFilmes } = useListaFilmes();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    if (valor) {
      buscarFilmes();
    }
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
