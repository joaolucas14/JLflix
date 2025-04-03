import styles from "./Header.module.css";
import ProvidersDropdown from "../ProvidersDropdown";
import interrogacao from "../../assets/sinal-de-interrogacao.png";
import Modal from "../Modal";
import { useEffect, useState } from "react";

export default function Header() {
  const [modalAberto, setModalAberto] = useState(false);
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setModalAberto(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);
  return (
    <>
      <div className={styles.header}>
        <a href={"/"} className={styles.link}>
          <h1>JLflix</h1>
        </a>
        <ProvidersDropdown />
      </div>
      <button className={styles.btn} onClick={() => setModalAberto(true)}>
        <img src={interrogacao} alt="" />
      </button>
      <Modal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        title="🎬 Bem-vindo ao meu site!"
      >
        <div className={styles.modal_content}>
          <p>
            Olá! Me chamo <strong>João Lucas</strong> e desenvolvi este site com
            o objetivo de aprender e aprimorar minhas habilidades em
            desenvolvimento web, unindo tecnologia e cinema para proporcionar
            uma experiência interativa e intuitiva.
          </p>

          <h3>🍿 O que você pode fazer por aqui?</h3>
          <ul>
            <li>
              <strong>✅ Buscar por filmes</strong> – Encontre rapidamente seus
              títulos favoritos.
            </li>
            <li>
              <strong>✅ Ver detalhes completos</strong> – Acesse informações
              sobre elenco, sinopse, avaliações e muito mais.
            </li>
            <li>
              <strong>
                ✅ Filtrar por gênero, nome e plataforma de streaming
              </strong>{" "}
              – Descubra filmes que combinam com o seu gosto de forma prática.
            </li>
            <li>
              <strong>✅ Explorar filmografias</strong> – Ao clicar no nome de
              um ator ou diretor, você poderá ver todos os filmes em que ele já
              atuou ou produziu.
            </li>
            <li>
              <strong>✅ Descobrir novas produções</strong> – Encontre sugestões
              incríveis e expanda sua lista de filmes para assistir.
            </li>
          </ul>

          <p>
            Este projeto foi feito com dedicação e aprendizado contínuo. Espero
            que você aproveite a experiência e encontre os melhores filmes para
            maratonar! 🎥🍿🚀
          </p>
        </div>
      </Modal>
    </>
  );
}
