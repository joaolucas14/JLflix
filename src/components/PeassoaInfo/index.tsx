import { IPessoa } from "../../interfaces/IPessoa";
import styles from "./PessoaInfo.module.css";

export default function PessoaInfo({
  name,
  biography,
  profile_path,
  known_for_department,
  birthday,
  deathday,
  place_of_birth,
}: IPessoa) {
  function calcularIdade(birthday: string, deathday?: string): number {
    const nascimento = new Date(birthday).getTime();
    const falecimento = deathday
      ? new Date(deathday).getTime()
      : new Date().getTime();
    return Math.floor(
      (falecimento - nascimento) / (1000 * 60 * 60 * 24 * 365.25)
    );
  }

  function traduzirFuncao(known_for_department: string): string {
    return known_for_department === "Production"
      ? "Produtor"
      : known_for_department === "Acting"
      ? "Ator"
      : known_for_department === "Directing"
      ? "Diretor"
      : known_for_department;
  }

  return (
    <div className={styles.container}>
      <div className={styles.foto}>
        <img
          src={`https://image.tmdb.org/t/p/w200${profile_path}`}
          alt={name}
        />
      </div>
      <div className={styles.infos}>
        <h2>
          {name}
          <span className={styles.cargo}>
            {" ("}
            {traduzirFuncao(known_for_department)}
            {") "}
          </span>
        </h2>
        {deathday ? (
          <>
            <p>
              Nascimento: {new Date(birthday).toLocaleDateString()}
              {place_of_birth && `, ${place_of_birth}`}
            </p>
            <p>
              Data Falecimento: {new Date(deathday).toLocaleDateString()} (
              Idade {calcularIdade(birthday, deathday)} anos)
            </p>
          </>
        ) : (
          <p>
            Nascimento: {new Date(birthday).toLocaleDateString()} ( Idade{" "}
            {calcularIdade(birthday, deathday)} anos)
            {place_of_birth && `, ${place_of_birth}`}
          </p>
        )}
        {biography && <p>{biography}</p>}
      </div>
    </div>
  );
}
