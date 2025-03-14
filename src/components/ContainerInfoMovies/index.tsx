import classNames from "classnames";
import styles from "./ContainerInfoMovies.module.css";
import React from "react";

interface ContainerInfoMoviesProps {
  titulo: string;
  children?: React.ReactNode;
  direita: boolean;
}

export default function ContainerInfoMovies({
  titulo,
  children,
  direita,
}: ContainerInfoMoviesProps) {
  return (
    <div
      className={classNames(styles.container, { [styles.direita]: direita })}
    >
      <h2>{titulo}</h2>
      {children}
    </div>
  );
}
