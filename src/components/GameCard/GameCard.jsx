import { Link } from "react-router-dom";
import styles from "./GameCard.module.css";

const GameCard = () => {
  return (
    <div className={styles.gameCardContainer}>
      <div className={styles.cardImage}></div>
      <div className={styles.cardDetails}>
        <Link to={"games/1"}>Description</Link>
      </div>
    </div>
  );
};

export default GameCard;
