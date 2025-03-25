import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import useListaProvider from "../../states/hooks/providers/useListaProvider";
import { providerAtivoState } from "../../states/atom";
import { IProviderList } from "../../interfaces/IProviderList";
import styles from "./ProvidersDropdown.module.css";

export default function ProvidersDropdown() {
  const { listaProvider } = useListaProvider();
  const [providerAtivo, setProviderAtivo] = useRecoilState(providerAtivoState);
  const [menuAberto, setMenuAberto] = useState(false); // Estado para abrir/fechar o menu
  const navigate = useNavigate();

  function SetarProviderAtivo(provider: IProviderList) {
    if (provider.provider_name === providerAtivo) {
      setMenuAberto(false); // Se clicar na opção ativa, fecha o dropdown
    } else {
      setProviderAtivo(provider.provider_name);
      navigate(`provider/${provider.provider_id}`);
    }
  }

  return (
    <div className={styles.paste_button}>
      <button
        className={styles.button}
        onClick={() => setMenuAberto(!menuAberto)} // Alterna o menu ao clicar
      >
        {typeof providerAtivo === "string"
          ? providerAtivo
          : providerAtivo?.provider_name}{" "}
        &nbsp; ▼
      </button>

      {menuAberto && ( // Renderiza o menu apenas se `menuAberto` for true
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
      )}
    </div>
  );
}
