import styles from "./Header.module.css";
import ProvidersDropdown from "../ProvidersDropdown";
export default function Header() {
  return (
    <div className={styles.header}>
      <a href={"/"} className={styles.link}>
        <h1>JLflix</h1>
      </a>
      <ProvidersDropdown />
    </div>
  );
}
