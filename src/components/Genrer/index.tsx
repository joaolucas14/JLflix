import styles from "./Genrer.module.css";

interface GenrerProps {
  title: string;
}

export default function Genrer({ title }: GenrerProps) {
  return (
    <div className={styles.genrer}>
      <p>{title}</p>
    </div>
  );
}
