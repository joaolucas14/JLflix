import useLegendaEDublagem from "../../states/hooks/movies/useLegendaEDublagem";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export default function Modal({ isOpen, onClose, title }: ModalProps) {
  const { legDub } = useLegendaEDublagem();
  if (!isOpen) return null;

  return (
    <div className={styles.modal_overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close_button} onClick={onClose}>
          &times;
        </button>
        {title && <h2>{title}</h2>}
        <div className={styles.modal_content}>
          {legDub.map((legenda, index) => (
            <p key={index} className={styles.legenda}>
              {legenda}
              {index < Math.min(legDub.length, 3) - 1 && ", "}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
