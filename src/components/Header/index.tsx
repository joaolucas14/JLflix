import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import ProvidersDropdown from "../ProvidersDropdown";
export default function Header() {
  return (
    <div className={styles.header}>
      <Link to={"/"} className={styles.link}>
        <h1>JLflix</h1>
      </Link>
      <ProvidersDropdown />
    </div>
  );
}
