import styles from "./Footer.module.css";
export default function Footer() {
  return (
    <div>
      <p className={styles.footer}>
        Página desenvolvida por{" "}
        <a href="https://joaolucas14.github.io/portfolio/" target="_blank">
          João Lucas
        </a>
      </p>
    </div>
  );
}
