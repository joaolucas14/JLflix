import { Link } from "react-router-dom";
import useListaProvider from "../../states/hooks/providers/useListaProvider";
import styles from "./ProvidersDropdown.module.css";
export default function ProvidersDropdown() {
  const { listaProvider } = useListaProvider();
  return (
    <div className={styles.paste_button}>
      <button className={styles.button}>Streaming &nbsp; ▼</button>
      <div className={styles.dropdown_content}>
        {listaProvider &&
          listaProvider.map((provider) => (
            <Link
              key={provider.provider_id}
              id="middle"
              to={`/provider/${provider.provider_id}`}
            >
              {provider.provider_name}
            </Link>
          ))}
      </div>
    </div>
  );
}
