import { FaRegStar, FaStar } from "react-icons/fa";
import styles from "./StarRating.module.css";

interface IStarRating {
  rating: string;
}

export default function StarRating(props: IStarRating) {
  const numStarts = Math.round(Number(props.rating) / 2);
  const fullStars = [];
  const emptyStars = [];

  for (let i = 0; i < 5; i++) {
    if (i < numStarts) {
      fullStars.push(i);
    } else {
      emptyStars.push(i);
    }
  }
  return (
    <div className={styles.movie_rate}>
      {fullStars.map((index) => (
        <FaStar key={index} />
      ))}
      {emptyStars.map((index) => (
        <FaRegStar key={index} />
      ))}
    </div>
  );
}
