import styles from "./ContainerMovieList.module.css";
export default function ContainerMovieList({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ul className={styles.container}>{children}</ul>;
}
