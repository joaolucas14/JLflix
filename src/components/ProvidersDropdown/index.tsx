// import { Link } from "react-router-dom";
import useListaProvider from "../../states/hooks/providers/useListaProvider";
import styles from "./ProvidersDropdown.module.css";
import { useRecoilState } from "recoil";
import { providerAtivoState } from "../../states/atom";
import { useNavigate } from "react-router-dom";
import { IProviderList } from "../../interfaces/IProviderList";
export default function ProvidersDropdown() {
  const { listaProvider } = useListaProvider();
  const [providerAtivo, setProviderAtivo] = useRecoilState(providerAtivoState);
  const navigate = useNavigate();

  function SetarProviderAtivo(e: IProviderList) {
    setProviderAtivo(e.provider_name);
    navigate(`provider/${e.provider_id}`);
  }

  return (
    <div className={styles.paste_button}>
      <button className={styles.button}>
        {typeof providerAtivo === "string"
          ? providerAtivo
          : providerAtivo?.provider_name}
        &nbsp; ▼
      </button>
      <div className={styles.dropdown_content}>
        {listaProvider &&
          listaProvider.map((provider) => (
            <button
              key={provider.provider_id}
              onClick={() => SetarProviderAtivo(provider)}
              className={styles.button}
              id="middle"
            >
              {provider.provider_name}
            </button>
          ))}
      </div>
    </div>
  );
}
