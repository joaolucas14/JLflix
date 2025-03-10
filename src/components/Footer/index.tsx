import styles from "./Footer.module.css";
export default function Footer() {
  return (
    <div>
      <p className={styles.footer}>
        Página desenvolvida por <a href="#">João Lucas</a>
      </p>
    </div>
  );
}
