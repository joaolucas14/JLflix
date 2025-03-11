import { Link } from "react-router-dom";
import styles from "./Header.module.css";
export default function Header() {
  return (
    <div className={styles.header}>
      <Link to={"/"} className={styles.link}>
        <h1>JLflix</h1>
      </Link>
    </div>
  );
}
